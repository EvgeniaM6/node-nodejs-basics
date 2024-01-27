import { join, dirname } from 'node:path';
import { readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const filesFolderPath = join(__dirname, 'files');
    const newFileName = 'fresh.txt';

    const filesInDirArr = await readdir(filesFolderPath);
    const isCreatedFile = filesInDirArr.includes(newFileName);

    if (isCreatedFile) {
        throw Error('FS operation failed');
    }

    const newFilePath = join(filesFolderPath, newFileName);
    const text = 'I am fresh and young';
    await writeFile(newFilePath, text);
};

await create();