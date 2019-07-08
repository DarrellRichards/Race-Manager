exports.fetchEnv = fetchEnv = (variable) => {
    if (process.env[variable] === undefined) {
        throw new Error(`You must provide a value for environmental variable ${variable}`);
    }
    return process.env[variable];
};