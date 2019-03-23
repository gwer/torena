const React = require('react')
const torena = require('../torena')

const Train = ({config, date}) => {
  const train = new torena(config, date);
  const flatTrain = train.sections
    .reduce((acc, section) => acc.concat(section.exercises), []);

  return (
    <div className="train">
      <div className="train__date">
        {date.toLocaleDateString()}
      </div>
      {
        flatTrain.map((ex, inx) => 
          <div className="train__exercise" key={inx}>
            <div className="train__exercise-name">
              {ex.name}
            </div>
            <div className="train__exercise-reps">
              {ex.reps.min} — {ex.reps.max} повторений
            </div>
          </div>
        )
      }
    </div>
  );
};

module.exports = Train;
