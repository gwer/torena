const React = require('react')
const ReactDOM = require('react-dom')
const config = require('../config')
const torena = require('../torena')

const Train = require('./Train.js')
const Datepick = require('./Datepick.js')

class Main extends React.Component {
    constructor(props) {
        const date = new Date()

        super(props)
        this.state = {
            date,
            train: new torena(config, date)
        }
    }

    render() {
        return (
            <div className="main">
                <Datepick date={this.state.date} onChange={this.onDateChange.bind(this)} />
                <Train date={this.state.date} train={this.state.train} />
            </div>
        )
    }

    onDateChange(e) {
        const date = new Date(e.target.value)

        this.setState({
            date,
            train: new torena(config, date)
        })
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))
