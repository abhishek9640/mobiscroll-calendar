import PropTypes from 'prop-types';
import '../styles/Event.css';

const Event = ({ event }) => {
  return (
    <div className="event" style={{ backgroundColor: event.color }}>
      <span>{event.name}</span>
      <span>{event.time}</span>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,     // Unique identifier for the event
    name: PropTypes.string.isRequired,   // Name of the event
    time: PropTypes.string.isRequired,   // Time of the event
    date: PropTypes.string.isRequired,   // Date of the event
    color: PropTypes.string,             // Color of the event (optional)
  }).isRequired,
};

export default Event;
