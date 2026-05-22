import { Cli, Builtins } from 'clipanion';
import { ErrorParser } from '@xpm/utils';
import { InstallCommand } from './commands/InstallCommand.js';

// Retrieve package metadata (normally from package.json, hardcoded for base setup)
const BINARY_NAME = 'xpm';
const BINARY_VERSION = '0.0.0-dev';

const cli = new Cli({
  binaryLabel: 'XPM Package Manager',
  binaryName: BINARY_NAME,
  binaryVersion: BINARY_VERSION,
});

// Register Built-in commands (Help and Version)
cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);

// Register XPM Commands
cli.register(InstallCommand);

// Execute the CLI and capture unhandled rejections
async function run(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    await cli.runExit(args);
  } catch (error) {
    // Determine if debug mode was passed raw in the process arguments
    const isDebugMode = process.argv.includes('--debug');

    // Pass the raw error to our specialized utility parser
    ErrorParser.handle(error, isDebugMode);

    // Force exit 1 for CI/CD pipelines to fail correctly
    process.exit(1);
  }
}

run();
