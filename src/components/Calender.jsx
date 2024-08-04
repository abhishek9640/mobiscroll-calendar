import { useState, useEffect } from 'react';
import Header from './Header';
import Day from './Day';
import EventForm from './EventForm';
import '../styles/Calender.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="calendar-container">
      <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <div className="calendar-grid">
        {Array.from({ length: 31 }, (_, index) => (
          <Day key={index} day={index + 1} events={events} currentMonth={currentMonth} />
        ))}
      </div>
      <EventForm addEvent={addEvent} />
    </div>
  );
};

export default Calendar;
