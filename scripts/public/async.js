let check = callback => {
    if (typeof callback !== "function")
        throw new TypeError("Parameter 'callback' must be a function!");
}

export let toAsync = callback => {
    check(callback);
    return (() => await callback());
}

export let runAsync = callback => {
    check(callback);
    return await callback();
}