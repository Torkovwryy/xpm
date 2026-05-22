import pc from 'picocolors';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

export interface LoggerOptions {
  level?: LogLevel;
}

/**
 * Centralized logging system.
 * Designed to be instantiated per module/command for granular control,
 * or used globally.
 */
export class Logger {
  private level: LogLevel;

  constructor(options?: LoggerOptions) {
    // Defaults to INFO, but could be overridden by process.env.XPM_LOG_LEVEL
    this.level = options?.level ?? LogLevel.INFO;
  }

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  public debug(message: string, ...args: unknown[]): void {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(pc.gray(`[DEBUG] ${message}`), ...args);
    }
  }

  public info(message: string): void {
    if (this.level <= LogLevel.INFO) {
      console.info(pc.blue('ℹ') + ` ${message}`);
    }
  }

  public success(message: string): void {
    if (this.level <= LogLevel.INFO) {
      console.info(pc.green('✔') + ` ${message}`);
    }
  }

  public warn(message: string): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(pc.yellow('⚠') + ` ${message}`);
    }
  }

  public error(message: string): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(pc.red('✖') + `${message}`);
    }
  }

  /**
   * Prints a highly visible fatal error message and halts execution context (visually).
   * Note: It does not call process.exit() directly to avoid Side Effects in tests.
   */
  public fatal(message: string): void {
    console.error(`\n${pc.bgRed(pc.white(' FATAL '))} ${pc.red(message)}\n`);
  }
}

// Export a default global instance for convenience
export const logger = new Logger();
