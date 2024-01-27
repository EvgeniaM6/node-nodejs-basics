import { env } from 'node:process';

const parseEnv = () => {
    const resultArr = Object.entries(env).filter(([envKey, _]) => {
        return envKey.slice(0, 4) === 'RSS_';
    }).map(([envKey, envVal]) => {
        return `${envKey}=${envVal}`;
    });
    console.log(resultArr.join('; '));
};

parseEnv();