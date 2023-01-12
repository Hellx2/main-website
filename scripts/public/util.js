export let isClass = x => x.toString().trim().startsWith("class");

export let toAsync = callback => {
    if (typeof callback !== "function")
        throw new TypeError("Parameter 'callback' must be a function!");
    return (() => await callback());
}

export let runAsync = callback => {
    if (typeof callback !== "function")
        throw new TypeError("Parameter 'callback' must be a function!");
    return await callback();
}

export let toJSON = obj => JSON.stringify(obj);
export let readJSON = json => JSON.parse(json);

class ArgObject {
    name;
    type;
    value;
    constructor(name, type, value) {
        if (!(type instanceof { new(...args) }))
            throw new TypeError("Parameter 'type' must be of type 'Function'!");
        if (typeof name !== "string")
            throw new TypeError("Parameter 'name' must be of type 'string'!");
        this.type = type || Object;
        this.value = value;
        this.name = name;
    }
}

export let check = (...args) => {
    for (let arg of args) {
        if (!(arg instanceof ArgObject))
            throw new TypeError('All given parameters must be of the type \'ArgObject\'!');
        if (!(arg.value instanceof arg.type))
            throw new TypeError(`Parameter '${arg.name}' must be of type '${arg.type}'!`);
    }
}

export let final = (cls, name) => {
    if (!isClass(cls)) throw new TypeError("Parameter 'cls' must be a class!");
    if (typeof name !== "string") throw new TypeError("Parameter 'name' must be a string!");
    
    return class name extends cls {
        constructor(...args) {
            if (new.target !== finalcls) throw new TypeError(`Cannot extend final class!`);
        }
    }
}