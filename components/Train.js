const React = require('react')
const torena = require('../torena')

class Train extends React.Component {
    render() {
        const train = new torena(this.props.config, this.props.date)
        const flatTrain = train.sections
            .reduce((acc, section) => acc.concat(section.exercises), [])

        return (
            <div className="train">
                <div className="train__date">
                    {this.props.date.toLocaleDateString()}
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
        )
    }
}

module.exports = Train
