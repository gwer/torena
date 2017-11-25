const torena = require('./torena')
const config = require('./config')
const date = new Date(process.argv[2] || Date.now())
const train = new torena(config, date)

const formattedTrain = train.sections
    .reduce((acc, section) => acc.concat(section.exercises), [])
    .map(({ name, reps: { min, max } }) => `${name} (${min} — ${max} повторений)`)

console.log(formattedTrain)
