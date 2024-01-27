import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const fileWriteStr = createWriteStream(filePath);
    stdin.pipe(fileWriteStr);
};

await write();