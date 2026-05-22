/**
 * Strict enumeration of all possible errors within the XPM ecosystem.
 * Using a constant object with 'as const' ensures type-level safety
 * while maintaining runtime validation capabilities.
 */
export const ErrorCodes = {
  // Core/Initialization Errors
  E_INIT_FAILED: 'E_INIT_FAILED',
  E_CONFIG_INVALID: 'E_CONFIG_INVALID',

  // Network Errors
  E_NETWORK_TIMEOUT: 'E_NETWORK_TIMEOUT',
  E_REGISTRY_UNREACHABLE: 'E_REGISTRY_UNREACHABLE',
  E_PEER_DEP_CONFLICT: 'E_PEER_DEP_CONFLICT',

  // File System Errors
  E_ACCESS_DENIED: 'E_ACCESS_DENIED',
  E_FILE_NOT_FOUND: 'E_FILE_NOT_FOUND',

  // Generic/Unknown
  E_INTERNAL_FATAL: 'E_INTERNAL_FATAL',
} as const;

/**
 * Type utility to extract the exact string values from the ErrorCodes object.
 */
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
