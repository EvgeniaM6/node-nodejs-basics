import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { stdout } from 'node:process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const hash = createHash('sha256');
    const fileReadStream = createReadStream(filePath);

    fileReadStream.pipe(hash).setEncoding('hex').pipe(stdout);
};

await calculateHash();