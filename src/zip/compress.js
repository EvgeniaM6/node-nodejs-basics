import { createReadStream, createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToReadFile = join(__dirname, 'files', 'fileToCompress.txt');
const pathToNewFile = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const gzipObj = createGzip();
    const readStr = createReadStream(pathToReadFile);
    const writeStr = createWriteStream(pathToNewFile);
    pipeline(readStr, gzipObj, writeStr, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

await compress();