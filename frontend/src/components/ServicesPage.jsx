import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylistContext } from '../context/StylistContext';

export default function ServicesPage() {
  const { stylist, setStylist } = useContext(StylistContext);

  // initialize from context so users can go back/forward without losing data
  const [services, setServices] = useState(
    stylist.services?.length
      ? stylist.services
      : [{ id: 1, name: '', price: '', duration: '' }]
  );

  const navigate = useNavigate();

  /* ---- handlers ---- */
  const handleServiceChange = (index, event) => {
    const updated = services.map((s, i) =>
      i === index ? { ...s, [event.target.name]: event.target.value } : s
    );
    setServices(updated);
  };

  const addService = () => {
    setServices([
      ...services,
      { id: services.length + 1, name: '', price: '', duration: '' },
    ]);
  };

  const removeService = (index) => {
    if (services.length <= 1) return; // keep at least one row
    setServices(services.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // persist services array to global context
    setStylist({ ...stylist, services });
    navigate('/onboarding/availability');
  };

  /* ---- ui ---- */
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Add Your Services</h2>
        <p className="text-gray-400 mb-8 text-center">
          List the services you offer, their price, and duration.
        </p>

        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="p-4 bg-gray-800 rounded-lg flex items-end space-x-4"
            >
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300">
                  Service Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={service.name}
                  onChange={(e) => handleServiceChange(index, e)}
                  placeholder="e.g., Haircut"
                  className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div className="w-1/4">
                <label className="block text-sm font-medium text-gray-300">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={service.price}
                  onChange={(e) => handleServiceChange(index, e)}
                  placeholder="50"
                  className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div className="w-1/4">
                <label className="block text-sm font-medium text-gray-300">
                  Duration (min)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={service.duration}
                  onChange={(e) => handleServiceChange(index, e)}
                  placeholder="30"
                  className="mt-1 w-full bg-gray-700 border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <button
                onClick={() => removeService(index)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm transition-colors"
                disabled={services.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addService}
          className="mt-6 w-full text-center py-2 border-2 border-dashed border-gray-600 hover:border-indigo-500 rounded-lg transition-colors"
        >
          + Add Another Service
        </button>

        <button
          onClick={handleNext}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}