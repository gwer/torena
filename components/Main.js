const React = require('react')
const ReactDOM = require('react-dom')
const trainConfig = require('../config')

const Train = require('./Train.js')
const Datepick = require('./Datepick.js')

class Main extends React.Component {
    constructor(props) {
        const date = new Date()

        super(props)
        this.state = {
            date,
            trainConfig
        }
    }

    render() {
        return (
            <div className="main">
                <Datepick date={this.state.date} onChange={this.onDateChange.bind(this)} />
                <Train date={this.state.date} config={this.state.trainConfig} />
            </div>
        )
    }

    onDateChange(e) {
        const date = new Date(e.target.value)

        this.setState(Object.assign(
            {},
            this.state,
            { date }
        ))
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))
