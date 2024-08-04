import  { useState, useEffect } from 'react';
import Header from './Header';
import Day from './Day';
import EventForm from './EventForm';
import '../styles/Calender.css';
import { DragDropContext } from 'react-beautiful-dnd';

const Calendar = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now(), color: getRandomColor() }]);
  };

  const deleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    // const sourceDay = parseInt(source.droppableId.split('-')[1]);
    const destDay = parseInt(destination.droppableId.split('-')[1]);

    const movedEvent = events.find((event, index) => index === source.index);
    const updatedEvents = events.filter((event, index) => index !== source.index);

    movedEvent.date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), destDay + 1).toISOString();
    updatedEvents.splice(destination.index, 0, movedEvent);

    setEvents(updatedEvents);
  };

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
