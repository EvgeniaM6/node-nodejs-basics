import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const fileReadStream = createReadStream(filePath);
    fileReadStream.pipe(stdout);
};

await read();