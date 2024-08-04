import  { useState, useEffect } from 'react';
import Header from './Header';
import Day from './Day';
import EventForm from './EventForm';
import '../styles/Calender.css';
import { DragDropContext } from 'react-beautiful-dnd';

const Calendar = () => {
    // Initialize events from localStorage or default to an empty array
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  // Initialize currentMonth to today's date
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Add a new event with a unique ID and random color  
  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now(), color: getRandomColor() }]);
  };

  // Delete an event after user confirmation
  const deleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  // Handle drag-and-drop to move events between dates
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const destDay = parseInt(destination.droppableId.split('-')[1]);

    const movedEvent = events.find((event, index) => index === source.index);
    const updatedEvents = events.filter((event, index) => index !== source.index);

    movedEvent.date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), destDay + 1).toISOString();
    updatedEvents.splice(destination.index, 0, movedEvent);

    setEvents(updatedEvents);
  };

  // Generate a random color for events
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="calendar-container">
      <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="calendar-grid">
          {Array.from({ length: 31 }, (_, index) => (
            <Day
              key={index}
              day={index + 1}
              events={events}
              currentMonth={currentMonth}
              deleteEvent={deleteEvent}
            />
          ))}
        </div>
      </DragDropContext>
      <EventForm addEvent={addEvent} />
    </div>
  );
};

export default Calendar;