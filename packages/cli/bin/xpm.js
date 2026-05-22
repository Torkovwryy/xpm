#!/usr/bin/env node

// Forward execution to the compiled CLI entrypoint.
// We disable experimental warnings to keep the output clean for users.
process.removeAllListeners('warning');

import('../dist/index.js').catch((err) => {
  console.error('Failed to start XPM CLI:', err);
  process.exit(1);
})