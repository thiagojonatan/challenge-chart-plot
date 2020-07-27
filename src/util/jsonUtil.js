import JSON5 from 'json5';

export const parse = (value) => {
    if(!value) {
        throw new Error("Events are required!");
    }
    value = correctIntegrity(value);
    if(!isArray(value)) {
        value = '[' + value + ']';
    }

    try {
        return JSON5.parse(value);
    } catch (e) {
        console.log(e)
        throw new Error("Invalid Json!");
    }
}

export const stringify = (value) => {
    return JSON5.stringify(value);
}

const isArray = (value) => {
    let pattern = /^\[.*\]$/gs;

    return pattern.test(value);
}

const correctIntegrity = (value) => {
    let pattern = /}[\s\n]*{/g;

    return value.replace(pattern, '},{');
}