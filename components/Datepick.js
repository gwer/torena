const React = require('react')

class Datepick extends React.Component {
    render() {
        const date = this.props.date
        const day = twoDigits(date.getDate())
        const month = twoDigits(date.getMonth() + 1)
        const year = date.getFullYear()

        return (
            <div className="date-form">
                <div className="date-form__label">Выбери дату:</div>
                <div className="date-form__field">
                    <input
                        type="date"
                        value={`${year}-${month}-${day}`}
                        onChange={this.props.onChange}
                    />
                </div>
            </div>
        )

        function twoDigits(s) {
            return String(s).padStart(2, '0')
        }
    }
}

module.exports = Datepick
