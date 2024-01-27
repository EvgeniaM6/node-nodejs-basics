import { readdir, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
    const folderPath = join(__dirname, 'files');
    const filesArr = await readdir(folderPath, { withFileTypes: true });
    const fileName = 'fileToRemove.txt';

    const doesFileExist = filesArr.some((file) => {
        return file.name === fileName;
    });

    const errMessage = 'FS operation failed';
    if (!doesFileExist) {
        throw Error(errMessage);
    };

    rm(join(folderPath, fileName));
};

await remove();
