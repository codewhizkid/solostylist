import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialAvailability = [
  { day: 'Sunday', enabled: false, startTime: '09:00', endTime: '17:00' },
  { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' },
  { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' },
  { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '17:00' },
  { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' },
  { day: 'Friday', enabled: true, startTime: '09:00', endTime: '17:00' },
  { day: 'Saturday', enabled: false, startTime: '09:00', endTime: '17:00' },
];

const AvailabilityPage = () => {
  const [availability, setAvailability] = useState(initialAvailability);
  const navigate = useNavigate();

  const handleDayChange = (index, field, value) => {
    const newAvailability = [...availability];
    newAvailability[index] = { ...newAvailability[index], [field]: value };
    setAvailability(newAvailability);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Set Your Availability</h2>
        <p className="text-gray-400 mb-8 text-center">Define your weekly schedule for client bookings.</p>
        
        <div className="space-y-4">
          {availability.map((day, index) => (
            <div
              key={day.day}
              className={`p-4 rounded-lg flex items-center justify-between transition-all ${
                day.enabled ? 'bg-gray-800' : 'bg-gray-800 opacity-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={day.enabled}
                  onChange={(e) => handleDayChange(index, 'enabled', e.target.checked)}
                  className="h-6 w-6 rounded text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                />
                <span className="text-lg font-medium w-28">{day.day}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="time"
                  value={day.startTime}
                  onChange={(e) => handleDayChange(index, 'startTime', e.target.value)}
                  disabled={!day.enabled}
                  className="bg-gray-700 border-gray-600 rounded-md text-white px-3 py-2 w-32"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="time"
                  value={day.endTime}
                  onChange={(e) => handleDayChange(index, 'endTime', e.target.value)}
                  disabled={!day.enabled}
                  className="bg-gray-700 border-gray-600 rounded-md text-white px-3 py-2 w-32"
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/onboarding/socials')}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default AvailabilityPage; 