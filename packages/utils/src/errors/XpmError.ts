import { ErrorCode, ErrorCodes } from './ErrorCodes.js';

/**
 * Base custom error class for all XPM operations.
 * Extends the native Error to maintain compatibility with standard Node.js error handling
 * while adding rigorous semantic domains.
 */
export class XpmError extends Error {
  public readonly code: ErrorCode;
  /**
   * Additional diagnostic data (e.g., path, dependency name, network status code).
   */
  public readonly context?: Record<string, unknown> | undefined;

  constructor(code: ErrorCode, message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = 'XpmError';
    this.code = code;
    this.context = context;

    // Maintains proper stack trace for where our error was thrown (only v8 / Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Factory method to create an internal fatal error when an unknown exception is caught.
   */
  static fromUnknown(error: unknown): XpmError {
    if (error instanceof XpmError) return error;
    if (error instanceof Error) {
      return new XpmError(ErrorCodes.E_INTERNAL_FATAL, error.message, { stack: error.stack });
    }
    return new XpmError(ErrorCodes.E_INTERNAL_FATAL, String(error));
  }
}
