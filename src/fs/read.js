import { join, dirname } from 'node:path';
import { readdir } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const folderPath = join(__dirname, 'files');
    const fileToReadName = 'fileToRead.txt';
    const filesInCurrFolderArr = await readdir(folderPath);

    const doesFileExist = filesInCurrFolderArr.some((file) => file === fileToReadName);
    const errMessage = 'FS operation failed';
    if (!doesFileExist) {
        throw Error(errMessage);
    }

    const readStream = createReadStream(join(folderPath, fileToReadName), 'utf-8');
    let resultStr = '';

    readStream.on('data', (data) => {
        resultStr += data.toString();
    });

    readStream.on('end', () => {
        console.log(resultStr);
    })
};

await read();
