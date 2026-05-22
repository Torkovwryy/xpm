import { XpmError } from './XpmError.js';
import { logger } from '../logger/Logger.js';
import pc from 'picocolors';

/**
 * Utility class to parse and render errors systematically.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ErrorParser {
  /**
   * Takes an unknown error thrown in the system, parses it, and logs in to the user.
   */
  public static handle(err: unknown, isDebugMode: boolean = false): void {
    const error = XpmError.fromUnknown(err);

    logger.fatal(`Code: ${pc.bold(error.code)}`);
    console.error(`  ${pc.red(error.message)}\n`);

    if (error.context && Object.keys(error.context).length > 0) {
      console.error(pc.gray('  Context:'));
      for (const [key, value] of Object.entries(error.context)) {
        if (key === 'stack' && !isDebugMode) continue; // Hide stack trace from standard output
        console.error(`    ${pc.dim(key + ':')} ${String(value)}`);
      }
    }

    if (isDebugMode && error.stack) {
      console.error(`\n${pc.gray(error.stack)}`);
    } else if (!isDebugMode) {
      console.error(`\n  ${pc.cyan('Run with --debug for more detailed output.')}`);
    }
  }
}
