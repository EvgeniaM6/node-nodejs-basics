import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToWorker = join(__dirname, 'worker.js');

const performCalculations = async () => {
    const coresArr = cpus();
    const promisesArr = [];

    for (let i = 0; i < coresArr.length; i++) {
        const promise = new Promise((resolve) => {
            const worker = new Worker(pathToWorker, { workerData: i + 10 });
            worker.on('message', (data) => {
                resolve({ status: 'resolved', data });
            })
        });

        promisesArr.push(promise);
    }

    const resultArr = await Promise.all(promisesArr);
    console.log('resultArr=', resultArr);
};

await performCalculations();