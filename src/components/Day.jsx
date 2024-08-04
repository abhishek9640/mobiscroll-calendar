import PropTypes from 'prop-types';
import Event from './Event';
import '../styles/Day.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Day = ({ day, events, currentMonth, deleteEvent }) => {
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day && eventDate.getMonth() === currentMonth.getMonth();
  });

  const isToday = () => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <Droppable droppableId={`day-${day}`}>
      {(provided) => (
        <div
          className={`day ${isToday() ? 'today' : ''}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="day-number">{day}</div>
          {dayEvents.map((event, index) => (
            <Draggable key={event.id} draggableId={event.id.toString()} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Event event={event} deleteEvent={deleteEvent} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
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
  deleteEvent: PropTypes.func.isRequired,
};

export default Day;
