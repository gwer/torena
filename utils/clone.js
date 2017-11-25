module.exports = {
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}
