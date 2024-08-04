import '../styles/Header.css';
import PropTypes from 'prop-types';

const Header = ({ currentMonth, setCurrentMonth }) => {
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
    setCurrentMonth(nextMonth);
  };

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));
    setCurrentMonth(prevMonth);
  };

  return (
    <div className="calendar-header">
      <button onClick={goToPreviousMonth}>Previous</button>
      <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <button onClick={goToNextMonth}>Next</button>
    </div>
  );
};

Header.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
};

export default Header;
