// Dummy type definition for minimatch to resolve TypeScript error
// minimatch provides its own types, so this is just to satisfy the compiler
declare module 'minimatch' {
  const minimatch: (path: string, pattern: string, options?: unknown) => boolean;
  export = minimatch;
}