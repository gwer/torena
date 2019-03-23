const Random = require('./utils/random');
const deepClone = require('./utils/clone').deepClone;

/**
 * @typedef {Object} Reps
 * @property {number} min
 * @property {number} max
 */

/**
 * @typedef {Object} Exercise
 * @property {string} name
 * @property {Reps} reps
 * @property {number} step
 * @property {number} priority
 */

/**
 * @typedef {Object} Section
 * @property {string} name
 * @property {Exercise[]} exercises
 * @property {number} count
 */

class Torena {
  /**
   * @param {Object} config
   * @param {Section[]} config.sections
   * @param {Date} date
   * @return {Object}
   */
  constructor(config, date) {
    const seed = date.setHours(0, 0, 0, 0);
    this.random = new Random(seed);

    return {
      sections: config.sections.map(
        s => this.chooseExercises(deepClone(s))
      )
    };
  }

  /**
   * @param {Section} section
   * @return {Object}
   */
  chooseExercises(section) {
    return {
      name: section.name,
      exercises: Array(section.count).fill().map(
        () => this.pullRandomExercise(section)
      )
    };
  }

  /**
   * @param {Section} section
   * @return {Object} 
   */
  pullRandomExercise({ exercises }) {
    let prevSegmentEnd = 0;
    const prioritySum = exercises.reduce(
      (acc, ex) => acc + ex.priority,
      0
    );
    const point = this.random();
    const exInx = exercises.findIndex(ex => {
      prevSegmentEnd += ex.priority / prioritySum;

      return prevSegmentEnd > point;
    });
    const exercise = exercises.splice(exInx, 1)[0];

    return this.randomizeExercise(exercise);
  }

  /**
   * @param {Exercise} exercise
   * @return {Object}
   */
  randomizeExercise({ name, reps, step }) {
    return {
      name,
      reps: this.getRandomReps(reps, step)
    };
  }

  /**
   * If this.random() return 1, method will return more then maximum reps.
   * Fuck this.
   * It makes you stronger.
   * @param {Reps} reps
   * @param {number} step
   * @return {Object}
   */
  getRandomReps(reps, step) {
    const segmentLength = step / (reps.max - reps.min);
    const stepsCount = Math.floor(this.random() / segmentLength);
    const min = reps.min + stepsCount * step;
    const max = min + step;

    return { min, max };
  }
}

module.exports = Torena;
