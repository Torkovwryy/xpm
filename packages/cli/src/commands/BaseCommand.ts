import { Command, Option } from 'clipanion';
import { logger, LogLevel } from '@xpm/utils';

/**
 * Abstract Base Command that provides shared flags and utilities
 * across all XPM CLI commands.
 */
export abstract class BaseCommand extends Command {
  /**
   * Global flag to enable debug logging.
   * Can be passed to any command (e.g., `xpm install --debug`).
   */
  public debug = Option.Boolean('--debug', false, {
    description: 'Enable verbose debug logging',
  });

  /**
   * Executes before the main command logic.
   * Useful for setting up global state base on flags.
   */
  public async catch(error: unknown): Promise<void> {
    // Clipanion handles basic routing errors, but we might want to intercept custom throws here.
    throw error; // Re-throw to be caught by the main ErrorParser
  }

  /**
   * Helper to initialize shared states like the Logger verbosity.
   */
  protected setupGlobals(): void {
    if (this.debug) {
      logger.setLevel(LogLevel.DEBUG);
      logger.debug('Debug mode enabled.');
    }
  }
}
