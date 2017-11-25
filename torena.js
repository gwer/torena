const Random = require('./utils/random')
const deepClone = require('./utils/clone').deepClone

class Torena {
    /**
     * @param {Object} config
     * @param {Object[]} sections
     * @param {Object} sections[].section
     * @param {String} sections[].section.name
     * @param {Object[]} sections[].section.exercises
     * @param {String} sections[].section.exercises[].name
     * @param {Object} sections[].section.exercises[].reps
     * @param {Number} sections[].section.exercises[].reps.min
     * @param {Number} sections[].section.exercises[].reps.max
     * @param {Number} sections[].section.exercises[].step
     * @param {Number} sections[].section.exercises[].priority
     * @param {Number} sections[].section.count
     * @param {Date} date
     * @returns {Object}
     */
    constructor(config, date) {
        const seed = date.setHours(0, 0, 0, 0)
        this.random = new Random(seed)

        return {
            sections: config.sections.map(
                s => this.chooseExercises(deepClone(s))
            )
        }
    }

    /**
     * @param {Object} section
     * @param {String} section.name
     * @param {Object[]} section.exercises
     * @param {String} section.exercises[].name
     * @param {Object} section.exercises[].reps
     * @param {Number} section.exercises[].reps.min
     * @param {Number} section.exercises[].reps.max
     * @param {Number} section.exercises[].step
     * @param {Number} section.exercises[].priority
     * @param {Number} section.count
     * @returns {Object}
     */
    chooseExercises(section) {
        return {
            name: section.name,
            exercises: Array(section.count).fill().map(
                () => this.pullRandomExercise(section)
            )
        }
    }

    /**
     * @param {Object} section
     * @param {Object[]} section.exercises
     * @param {String} section.exercises[].name
     * @param {Object} section.exercises[].reps
     * @param {Number} section.exercises[].reps.min
     * @param {Number} section.exercises[].reps.max
     * @param {Number} section.exercises[].step
     * @param {Number} section.exercises[].priority
     * @return {Object} 
     */
    pullRandomExercise({ exercises }) {
        let prevSegmentEnd = 0
        const prioritySum = exercises.reduce(
            (acc, ex) => acc + ex.priority,
            0
        )
        const point = this.random()
        const exInx = exercises.findIndex(ex => {
            prevSegmentEnd += ex.priority / prioritySum

            return prevSegmentEnd > point
        })
        const exercise = exercises.splice(exInx, 1)[0]

        return this.randomizeExercise(exercise)
    }

    /**
     * @param {Object} exercise
     * @param {String} exercise.name
     * @param {Object} exercise.reps
     * @param {Number} exercise.reps.min
     * @param {Number} exercise.reps.max
     * @param {Number} exercise.step
     * @returns {Object}
     */
    randomizeExercise({ name, reps, step }) {
        return {
            name,
            reps: this.getRandomReps(reps, step)
        }
    }

    /**
     * If this.random() returns 1, method will return more then maximum reps.
     * Fuck this.
     * It makes you stronger.
     * @param {Object} reps
     * @param {Number} reps.min
     * @param {Number} reps.max
     * @param {Number} step
     * @returns {Object}
     */
    getRandomReps(reps, step) {
        const segmentLength = step / (reps.max - reps.min)
        const stepsCount = Math.floor(this.random() / segmentLength)
        const min = reps.min + stepsCount * step
        const max = min + step

        return { min, max }
    }
}

module.exports = Torena
