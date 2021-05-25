function objectToArray(object){
    const array = Object.keys(object).map(key => {
        return object[key];
    });
    return array;
}

export {
    objectToArray
};