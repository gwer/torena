const React = require('react');

const Datepick = ({ date, onChange }) => {
  const twoDigits = s => String(s).padStart(2, '0');

  const day = twoDigits(date.getDate());
  const month = twoDigits(date.getMonth() + 1);
  const year = date.getFullYear();

  return (
    <div className="date-form">
      <div className="date-form__label">Выбери дату:</div>
      <div className="date-form__field">
        <input
          type="date"
          value={`${year}-${month}-${day}`}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

module.exports = Datepick;
