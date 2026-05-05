// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  export type Claims = Readonly<{
    uid: string;
  }>;

  namespace App {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Locals {
      claims: Claims | undefined;
    }
  }
}
