import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const headerDateFormat = 'MMMM yyyy';
  const weekdayDateFormat = 'eeeeee'; 
  const dateFormat = 'd';

  const monthStart = startOfWeek(startOfMonth(currentDate));
  const monthEnd = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let day = monthStart;

  while (day <= monthEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-600 hover:text-gray-800" onClick={handlePrevMonth}>
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">{format(currentDate, headerDateFormat)}</h2>
        <button className="text-gray-600 hover:text-gray-800" onClick={handleNextMonth}>
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 md:hidden lg:hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
          <div key={weekday} className="text-xs text-gray-600 font-bold text-center">
            {weekday}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer ${
              isSameMonth(day, currentDate) ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            } ${isSameDay(day, currentDate) ? 'bg-indigo-500 text-white' : ''}`}
          >
            <span className="text-sm">{format(day, dateFormat)}</span>
          </div>
        ))}
      </div>
      <div className=" grid-cols-7 gap-2 hidden md:grid lg:grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
          <div key={weekday} className="text-xs text-gray-600 font-bold text-center">
            {weekday}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer ${
              isSameMonth(day, currentDate) ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            } ${isSameDay(day, currentDate) ? 'bg-indigo-500 text-white' : ''}`}
          >
            <span className="text-sm">{format(day, dateFormat)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
