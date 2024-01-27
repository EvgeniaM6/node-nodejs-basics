import { argv } from 'node:process';

const parseArgs = () => {
    const argsArr = argv.slice(2);
    const resultStr = argsArr.reduce((agr, val, i) => {
        if (val.startsWith('--')) {
            if (i) {
                agr += ', '
            }

            return agr += val.slice(2);
        }

        agr += ` is ${val}`;
        return agr;
    }, '');
    console.log(resultStr);
};

parseArgs();