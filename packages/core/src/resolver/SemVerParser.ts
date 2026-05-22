import semver from 'semver';
import { XpmError, ErrorCodes } from '@xpm/utils';

/**
 * Domain-specific wrapper for Semantic Versioning operations.
 * Isolates the external library 'semver' from the core logic,
 * allowing safe and strictly-typed version parsing.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SemVerParser {
  /**
   * Validates if a specific version perfectly satisfies a target range.
   * @param version The exact package version (e.g., '1.2.3').
   * @param range The requested range (e.g., '^1.2.0').
   * @throws {XpmError} If the inputs are structurally malformed.
   * @returns True if is satisfies, false otherwise.
   */
  public static satisfies(version: string, range: string): boolean {
    const validVersion = semver.valid(version);
    const validRange = semver.validRange(range);

    if (!validVersion) {
      throw new XpmError(
        ErrorCodes.E_CONFIG_INVALID,
        `Invalid semantic version string provided: ${version}`,
      );
    }

    if (!validRange) {
      throw new XpmError(
        ErrorCodes.E_CONFIG_INVALID,
        `Invalid semantic version range provided: ${range}`,
      );
    }

    return semver.satisfies(validVersion, validRange);
  }

  /**
   * Cleans and coerces a version string to a strict standard format.
   * @param raw The raw version input.
   * @returns The cleaned version string.
   */
  public static clean(raw: string): string {
    const cleaned = semver.clean(raw);
    if (!cleaned) {
      throw new XpmError(ErrorCodes.E_CONFIG_INVALID, `Unable to clean version string: ${raw}`);
    }
    return cleaned;
  }
}
