class Random {
    constructor(seed) {
        return function() {
            const s = Math.sin(seed++) * 10000;

            return s - Math.floor(s);
        }
    }
}

module.exports = Random
