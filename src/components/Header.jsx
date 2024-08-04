import '../styles/Header.css';
import PropTypes from 'prop-types';

const Header = ({ currentMonth, setCurrentMonth }) => {
  // Navigate to the next month
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  return (
    <div className="calendar-header">
      <button onClick={goToPreviousMonth}>Previous</button>
      <h2>
        {currentMonth instanceof Date && !isNaN(currentMonth) 
          ? currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }) 
          : 'Invalid Date'}
      </h2>
      <button onClick={goToNextMonth}>Next</button>
    </div>
  );
};

Header.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
};

export default Header;