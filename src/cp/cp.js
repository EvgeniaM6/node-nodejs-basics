import { fork } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToScript = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    fork(pathToScript, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
