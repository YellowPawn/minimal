// import { populateErrorMessage } from '@google-cloud/error-reporting/build/src/populate-error-message.js';
import PackageConfig from '#pkg' with { type: 'json' };
import {
  CustomError,
  EnvMode,
  extractCallSiteFromError,
  extractStackFromError,
} from '@yp/common/core.ts';
import { ContentType, Header } from '@yp/common/http.ts';
import {
  isAbsent,
  isBoolean,
  isNumber,
  isPresent,
  isString,
  pare,
  pick,
  recordEntries,
  recordFromEntries,
} from '@yp/common/identity.ts';
import { asNumber } from '@yp/common/math.ts';
import { DateTime } from '@yp/common/time.ts';
import type { ErrorReport } from '@yp/util.app/errors.ts';
import { Session } from '@yp/web.firebase/context.ts';

function contextualizeLines(
  lines: Array<readonly [string, unknown]>,
): Array<readonly [string, string]> {
  return lines
    .filter(([k, v]) => {
      if (k === 'stack') {
        return false;
      }
      return isString(v) || isNumber(v) || isBoolean(v) || isAbsent(v);
    })
    .map(([k, v]) => [k, String(v)] as const);
}

function contextualize(record?: Record<string, unknown>): Array<readonly [string, string]> {
  return contextualizeLines(recordEntries(record ?? {}));
}

export async function reportError(
  err: Error,
  params?: {
    via?: string;
    extra?: Record<string, unknown>;
  },
) {
  try {
    const ctxEntries: Array<readonly [string, string]> = [];
    if (isPresent(params?.via)) {
      ctxEntries.push(['via', params.via]);
    }
    ctxEntries.push(...contextualize(params?.extra));
    if (err instanceof CustomError) {
      ctxEntries.push(...contextualize(err.args));
    } else {
      ctxEntries.push(
        ...contextualizeLines(
          Object.getOwnPropertyNames(err).map((p) => [p, err[p as keyof Error]] as const),
        ),
      );
    }

    const when = DateTime.now();
    const message = err.message;
    const type = err.constructor.name;
    const ctx = recordFromEntries(ctxEntries, 'complete');
    const url = window.location.href;
    const site = extractCallSiteFromError(err);
    const stack = extractStackFromError(err);
    const uid = (await Session.load())?.user?.uid;

    const report: ErrorReport = {
      when,
      what: pare({ message, type, ctx }),
      where: pare({
        url,
        func: site?.func,
        file: isPresent(site) ? `${site.path}${site.file}` : undefined,
        line: asNumber(site?.line),
        stack,
      }),
      env: pare({
        uid,
        app: PackageConfig.config.project,
        ver: PackageConfig.version,
        mode: EnvMode,
        agent: navigator.userAgent,
      }),
    };

    const result = await fetch('/api/errors', {
      method: 'POST',
      headers: {
        [Header.contentType]: ContentType.text.json.type,
      },
      body: JSON.stringify(report),
    });
    if (!result.ok) {
      console.error('reportError', { ...pick(result, 'status', 'statusText'), report });
    }
  } catch (apiErr) {
    console.error('reportError', apiErr);
  }
}
