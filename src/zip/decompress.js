import { createReadStream, createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { pipeline } from 'node:stream';
import { createGunzip } from 'node:zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToReadFile = join(__dirname, 'files', 'archive.gz');
const pathToNewFile = join(__dirname, 'files', 'fileToCompressCopy.txt');

const decompress = async () => {
    const decompressStr = createGunzip();
    const readStr = createReadStream(pathToReadFile);
    const writeStr = createWriteStream(pathToNewFile);
    pipeline(readStr, decompressStr, writeStr, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

await decompress();