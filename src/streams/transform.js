import { stdin, stdout } from 'node:process';
import { Transform, pipeline } from 'node:stream';

const transformStream = new Transform({
    transform(chunk, _, cb) {
        const reversedData = chunk.toString().split('').reverse().join('') + '\n';
        cb(null, reversedData);
    }
})

const transform = async () => {
    pipeline(stdin, transformStream, stdout, (err) => console.error(err));
};

await transform();