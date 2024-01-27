import { readdir, rename as renamePath } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const folderPath = join(__dirname, 'files');
    const filesArr = await readdir(folderPath, { withFileTypes: true });
    const wrongFilename = 'wrongFilename.txt';
    const properFilename = 'properFilename.md';

    const doesWrongExist = filesArr.some((file) => {
        return file.name === wrongFilename;
    });

    const doesProperExist = filesArr.some((file) => {
        return file.name === properFilename;
    });

    const errMessage = 'FS operation failed';
    if (!doesWrongExist || doesProperExist) {
        throw Error(errMessage)
    };

    renamePath(join(folderPath, wrongFilename), join(folderPath, properFilename));
};

await rename();
