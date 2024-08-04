import PropTypes from 'prop-types';
import '../styles/Event.css';

const Event = ({ event, deleteEvent }) => {
  return (
    <div className="event" style={{ backgroundColor: event.color }}>
      <span>{event.name}</span>
      <span>{event.time}</span>
      <button onClick={() => deleteEvent(event.id)}>Delete</button>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default Event;
