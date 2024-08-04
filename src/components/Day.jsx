import PropTypes from 'prop-types';
import Event from './Event';
import '../styles/Day.css';

const Day = ({ day, events, currentMonth }) => {
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day && eventDate.getMonth() === currentMonth.getMonth();
  });

  return (
    <div className="day">
      <div className="day-number">{day}</div>
      {dayEvents.map(event => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.number.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      color: PropTypes.string
    })
  ).isRequired,
  currentMonth: PropTypes.instanceOf(Date).isRequired,
};

export default Day;
