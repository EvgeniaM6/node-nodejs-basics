import { join, dirname } from 'node:path';
import { readdir, copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const sourceFolderName = 'files';
    const sourceFolderPath = join(__dirname, sourceFolderName);

    const copyFolderName = 'files_copy';
    const copyFolderPath = join(__dirname, copyFolderName);

    const filesInDirArr = await readdir(__dirname);
    const doesExistSource = filesInDirArr.includes(sourceFolderName);
    const doesExistCopy = filesInDirArr.includes(copyFolderName);

    const errMessage = 'FS operation failed';
    if (!doesExistSource || doesExistCopy) {
        throw Error(errMessage);
    }

    await copyFolder(sourceFolderPath, copyFolderPath);
};

await copy();

async function copyFolder(dirSource, dirCopy) {
    await mkdir(dirCopy);
    const filesInDirArr = await readdir(dirSource, { withFileTypes: true });

    for (const file of filesInDirArr) {
        const fileSourcePath = join(dirSource, file.name);
        const fileCopyPath = join(dirCopy, file.name);

        if (file.isFile()) {
            await copyFile(fileSourcePath, fileCopyPath);
        } else {
            await copyFolder(fileSourcePath, fileCopyPath);
        }
    }
}
