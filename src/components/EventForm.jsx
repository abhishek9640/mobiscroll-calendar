import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/EventForm.css';

const EventForm = ({ addEvent }) => {
  const [eventData, setEventData] = useState({ name: '', date: '', color: '#000000' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ ...eventData, id: Date.now() });
    setEventData({ name: '', date: '', color: '#000000' });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={eventData.name}
        onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
        required
      />
      <input
        type="date"
        value={eventData.date}
        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
        required
      />
      <input
        type="color"
        value={eventData.color}
        onChange={(e) => setEventData({ ...eventData, color: e.target.value })}
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,  // Function to add a new event
};

export default EventForm;
