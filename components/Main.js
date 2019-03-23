const React = require('react');
const { useState } = React;
const ReactDOM = require('react-dom');
const trainConfig = require('../config');

const Train = require('./Train.js');
const Datepick = require('./Datepick.js');

const Main = () => {
  const [date, setDate] = useState(new Date());
  const onDateChange = e => setDate(new Date(e.target.value));

  return (
    <div className="main">
      <Datepick date={date} onChange={onDateChange} />
      <Train date={date} config={trainConfig} />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('app'));
