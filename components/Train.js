const React = require('react')

class Train extends React.Component {
    render() {
        const flatTrain = this.props.train.sections
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
