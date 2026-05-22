/**
 * Strict representation of a package.json manifest file.
 * We only define fields that dictate resolution or workspace topology,
 * ignoring extraneous metadata to save memory during graph traversal.
 */
export interface ProjectManifest {
  /** The unique name of the package. */
  name?: string;
  /** The specific version of the package. */
  version?: string;
  /** Direct runtime dependencies. */
  dependencies?: Record<string, string>;
  /** Development time dependencies. */
  devDependencies?: Record<string, string>;
  /**
   * Strict peer dependencies.
   * XPM will enforce these to avoid phantom dependency issues.
   */
  peerDependencies?: Record<string, string>;
  /** Optional peer dependencies metadata */
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  /** Workspace or external engine restrictions. */
  engine?: Record<string, string>;
  /** Monorepo workspace declarations. */
  workspaces?: string[];
  /** Lifecycle hooks, carefully audited before execution.  */
  scripts?: Record<string, string>;
  /** System binary links.  */
  bin?: Record<string, string>;
}
