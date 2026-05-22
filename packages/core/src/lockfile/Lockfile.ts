/**
 * Represents the structure of the xpm-lock.yaml file.
 * The lockfile ensures cryptographic integrity and exact version reproducibility.
 */
export interface Lockfile {
  /** The semantic version of the lockfile schema (e.g., '1.0'). */
  lockfileVersion: string;

  /**
   * The root workspace projects explicity defining their resolved dependencies.
   * Keyed by the relative path of the workspace (e.g., '.' for root)
   */
  importers: Record<string, LockfileImporter>;

  /**
   * The flattened dependency graph.
   * Keyed by a strict identifier string, usually `name@version`.
   * e.g., `react@18.2.0`
   */
  packages: Record<string, LockfileResolution>;
}

export interface LockfileImporter {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface LockfileResolution {
  /** The exact version resolved. */
  version: string;
  /** Sub-dependencies of this specific package. */
  dependencies?: Record<string, string>;
  /** Cryptographic hash (e.g., sha512-...) */
  integrity?: string;
  /** The network tarball URI or local reference. */
  resolution: {
    tarball?: string;
  };
  /** External engines requirement specific to this resolution. */
  engines?: Record<string, string>;
}
