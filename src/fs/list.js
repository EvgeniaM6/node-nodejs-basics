import { readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const filesInCurrFolderArr = await readdir(__dirname);
    const doesFolderExist = filesInCurrFolderArr.some((file) => file === 'files');

    const errMessage = 'FS operation failed';
    if (!doesFolderExist) {
        throw Error(errMessage);
    }
    
    const folderPath = join(__dirname, 'files');
    const filesArr = await readdir(folderPath);
    stdout.write(filesArr.toString());
};

await list();
