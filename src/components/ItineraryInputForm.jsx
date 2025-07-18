import React, { useState } from "react";

const defaultActivity = { name: "", description: "", type: "", time: "", price: "", timeOfDay: "Morning", image: "" };
const defaultFlight = { date: "", airline: "", from: "", to: "" };
const defaultHotel = { city: "", checkIn: "", checkOut: "", nights: "", hotelName: "" };
const defaultPayment = { installment: "", amount: "", dueDate: "" };

function toInputDate(dateStr) {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return dateStr;
}

export default function ItineraryInputForm({ onSubmit, initialGeneral, initialItinerary, initialFlights, initialHotels, initialPayments }) {
  const [general, setGeneral] = useState(initialGeneral || {
    name: "",
    destination: "",
    age: "",
    members: 1,
    rooms: 1,
    departureFrom: "",
    departureDate: "",
    arrivalDate: "",
    travellers: 1,
  });
  const [days, setDays] = useState(initialItinerary ? initialItinerary.length : 1);
  const [itinerary, setItinerary] = useState(initialItinerary && initialItinerary.length > 0 ? initialItinerary : [ { activities: [ { ...defaultActivity } ] } ]);
  const [flights, setFlights] = useState(initialFlights && initialFlights.length > 0 ? initialFlights : [ { ...defaultFlight } ]);
  const [hotels, setHotels] = useState(initialHotels && initialHotels.length > 0 ? initialHotels : [ { ...defaultHotel } ]);
  const [payments, setPayments] = useState(initialPayments && initialPayments.length > 0 ? initialPayments : [ { ...defaultPayment } ]);

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneral((prev) => ({ ...prev, [name]: value }));
  };

  const handleDaysChange = (e) => {
    const value = parseInt(e.target.value, 10) || 1;
    setDays(value);
    setItinerary((prev) => {
      const newArr = [...prev];
      if (value > prev.length) {
        for (let i = prev.length; i < value; i++) {
          newArr.push({ activities: [ { ...defaultActivity } ] });
        }
      } else {
        newArr.length = value;
      }
      return newArr;
    });
  };

  const handleActivityChange = (dayIdx, actIdx, e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setItinerary((prev) => {
          const newArr = prev.map((day, dIdx) => {
            if (dIdx !== dayIdx) return day;
            const newActs = day.activities.map((act, aIdx) =>
              aIdx === actIdx ? { ...act, image: ev.target.result } : act
            );
            return { ...day, activities: newActs };
          });
          return newArr;
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setItinerary((prev) => {
        const newArr = prev.map((day, dIdx) => {
          if (dIdx !== dayIdx) return day;
          const newActs = day.activities.map((act, aIdx) =>
            aIdx === actIdx ? { ...act, [name]: value } : act
          );
          return { ...day, activities: newActs };
        });
        return newArr;
      });
    }
  };
  const addActivity = (dayIdx, timeOfDay = "Morning") => {
    setItinerary((prev) => {
      const newArr = prev.map((day, dIdx) =>
        dIdx === dayIdx
          ? { ...day, activities: [...day.activities, { ...defaultActivity, timeOfDay }] }
          : day
      );
      return newArr;
    });
  };
  const removeActivity = (dayIdx, actIdx) => {
    setItinerary((prev) => {
      const newArr = prev.map((day, dIdx) => {
        if (dIdx !== dayIdx) return day;
        const newActs = day.activities.filter((_, aIdx) => aIdx !== actIdx);
        return { ...day, activities: newActs.length ? newActs : [ { ...defaultActivity } ] };
      });
      return newArr;
    });
  };

  const handleFlightChange = (idx, e) => {
    const { name, value } = e.target;
    setFlights((prev) => prev.map((f, i) => i === idx ? { ...f, [name]: value } : f));
  };
  const addFlight = () => setFlights((prev) => [...prev, { ...defaultFlight }]);
  const removeFlight = (idx) => setFlights((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));

  const handleHotelChange = (idx, e) => {
    const { name, value } = e.target;
    setHotels((prev) => prev.map((h, i) => i === idx ? { ...h, [name]: value } : h));
  };
  const addHotel = () => setHotels((prev) => [...prev, { ...defaultHotel }]);
  const removeHotel = (idx) => setHotels((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));

  const handlePaymentChange = (idx, e) => {
    const { name, value } = e.target;
    setPayments((prev) => prev.map((p, i) => i === idx ? { ...p, [name]: value } : p));
  };
  const addPayment = () => setPayments((prev) => [...prev, { ...defaultPayment }]);
  const removePayment = (idx) => setPayments((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ general, itinerary, flights, hotels, payments });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow mb-8" style={{ background: '#FBF4FF', boxShadow: '0 2px 12px 0 rgba(84,28,156,0.08)', borderRadius: '20px' }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#541C9C', fontFamily: 'Poppins, sans-serif' }}>Basic Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>Name</label>
          <input name="name" value={general.name} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>Destination</label>
          <input name="destination" value={general.destination} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>Age</label>
          <input name="age" type="number" min="0" value={general.age} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>Members</label>
          <input name="members" type="number" min="1" value={general.members} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>Rooms</label>
          <input name="rooms" type="number" min="1" value={general.rooms} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>Departure From</label>
          <input name="departureFrom" value={general.departureFrom} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>Departure Date</label>
          <input name="departureDate" type="date" value={toInputDate(general.departureDate)} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>Arrival Date</label>
          <input name="arrivalDate" type="date" value={toInputDate(general.arrivalDate)} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>No. of Travellers</label>
          <input name="travellers" type="number" min="1" value={general.travellers} onChange={handleGeneralChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
        <div>
          <label className="block font-semibold" style={{ color: '#541C9C' }}>No. of Days</label>
          <input name="days" type="number" min="1" value={days} onChange={handleDaysChange} 
            className="w-full border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
        </div>
      </div>
      <hr className="my-4" />
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#321E5D', fontFamily: 'Poppins, sans-serif' }}>Flights</h3>
      {flights.map((flight, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2 items-end">
          <input name="date" type="date" placeholder="Date" value={flight.date} onChange={e => handleFlightChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="airline" placeholder="Airline" value={flight.airline} onChange={e => handleFlightChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="from" placeholder="From" value={flight.from} onChange={e => handleFlightChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="to" placeholder="To" value={flight.to} onChange={e => handleFlightChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <button type="button" onClick={() => removeFlight(idx)} className="text-red-500 ml-2">Remove</button>
        </div>
      ))}
      <button type="button" onClick={addFlight} className="mt-2 mb-4 px-4 py-1 bg-purple-600 text-white rounded">Add Flight</button>
      <hr className="my-4" />
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#321E5D', fontFamily: 'Poppins, sans-serif' }}>Hotels</h3>
      {hotels.map((hotel, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-2 items-end">
          <input name="city" placeholder="City" value={hotel.city} onChange={e => handleHotelChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="checkIn" type="date" placeholder="Check In" value={hotel.checkIn} onChange={e => handleHotelChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="checkOut" type="date" placeholder="Check Out" value={hotel.checkOut} onChange={e => handleHotelChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="nights" type="number" min="1" placeholder="Nights" value={hotel.nights} onChange={e => handleHotelChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="hotelName" placeholder="Hotel Name" value={hotel.hotelName} onChange={e => handleHotelChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <button type="button" onClick={() => removeHotel(idx)} className="text-red-500 ml-2">Remove</button>
        </div>
      ))}
      <button type="button" onClick={addHotel} className="mt-2 mb-4 px-4 py-1 bg-purple-600 text-white rounded">Add Hotel</button>
      <hr className="my-4" />
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#321E5D', fontFamily: 'Poppins, sans-serif' }}>Payments</h3>
      {payments.map((payment, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 items-end">
          <input name="installment" placeholder="Installment Name" value={payment.installment} onChange={e => handlePaymentChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="amount" type="number" min="0" placeholder="Amount" value={payment.amount} onChange={e => handlePaymentChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <input name="dueDate" type="date" placeholder="Due Date" value={payment.dueDate} onChange={e => handlePaymentChange(idx, e)} 
            className="border rounded-xl p-3 mb-2 focus:outline-none transition-all duration-150"
            style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', minHeight: 44 }}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #936FE0'}
            onBlur={e => e.currentTarget.style.boxShadow = 'none'}
            required />
          <button type="button" onClick={() => removePayment(idx)} className="text-red-500 ml-2">Remove</button>
        </div>
      ))}
      <button type="button" onClick={addPayment} className="mt-2 mb-4 px-4 py-1 bg-purple-600 text-white rounded">Add Payment</button>
      <hr className="my-4" />
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#321E5D', fontFamily: 'Poppins, sans-serif' }}>Day-wise Activities</h3>
      {Array.from({ length: days }).map((_, dayIdx) => {
        const dayData = itinerary[dayIdx] || { activities: [] };
        const morningActs = dayData.activities.filter(a => a.timeOfDay === 'Morning');
        const afternoonActs = dayData.activities.filter(a => a.timeOfDay === 'Afternoon');
        const eveningActs = dayData.activities.filter(a => a.timeOfDay === 'Evening');
        return (
          <div key={dayIdx} className="mb-8 bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1" style={{ color: '#541C9C' }}>Day {dayIdx + 1} Date</label>
                <input
                  name="date"
                  placeholder="e.g. 27th November"
                  value={dayData.date || ''}
                  onChange={e => {
                    const value = e.target.value;
                    setItinerary(prev => prev.map((d, i) => i === dayIdx ? { ...d, date: value } : d));
                  }}
                  className="w-full border rounded-xl p-3 focus:outline-none transition-all duration-150 mb-2"
                  style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1" style={{ color: '#541C9C' }}>Day Title</label>
                <input
                  name="title"
                  placeholder="e.g. Arrival In Singapore & City Exploration"
                  value={dayData.title || ''}
                  onChange={e => {
                    const value = e.target.value;
                    setItinerary(prev => prev.map((d, i) => i === dayIdx ? { ...d, title: value } : d));
                  }}
                  className="w-full border rounded-xl p-3 focus:outline-none transition-all duration-150 mb-2"
                  style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full border-2 border-dashed border-[#936FE0] flex items-center justify-center mb-2 bg-[#FBF4FF]">
                  {dayData.image ? (
                    <img src={dayData.image} alt="Day" className="w-28 h-28 object-cover rounded-full" />
                  ) : (
                    <span className="text-3xl text-[#936FE0]">&#8682;</span>
                  )}
                </div>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new window.FileReader();
                        reader.onload = ev => {
                          setItinerary(prev => prev.map((d, i) => i === dayIdx ? { ...d, image: ev.target.result } : d));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <span className="inline-block px-6 py-2 bg-[#936FE0] text-white rounded-lg font-semibold cursor-pointer hover:bg-[#541C9C] transition">Upload Image</span>
                </label>
                <span className="text-xs text-[#936FE0] mt-1">Upload an image that represents this day's activities</span>
              </div>
            </div>
            {/* Morning Activities */}
            <div className="mb-4">
              <div className="font-semibold text-[#541C9C] mb-2">Morning Activities</div>
              {morningActs.map((activity, actIdx) => (
                <div key={actIdx} className="flex items-center gap-2 mb-2">
                  <input
                    name="name"
                    placeholder="Activity"
                    value={activity.name}
                    onChange={e => handleActivityChange(dayIdx, dayData.activities.findIndex(a => a === activity), e)}
                    className="flex-1 border rounded-xl p-3 focus:outline-none transition-all duration-150"
                    style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}
                  />
                  <button type="button" onClick={() => removeActivity(dayIdx, dayData.activities.findIndex(a => a === activity))} className="text-red-500 text-xl">&#128465;</button>
                </div>
              ))}
              <button type="button" onClick={() => addActivity(dayIdx, 'Morning')} className="mt-2 px-4 py-1 bg-purple-600 text-white rounded">+ Add Activity</button>
            </div>
            {/* Afternoon Activities */}
            <div className="mb-4">
              <div className="font-semibold text-[#541C9C] mb-2">Afternoon Activities</div>
              {afternoonActs.map((activity, actIdx) => (
                <div key={actIdx} className="flex items-center gap-2 mb-2">
                  <input
                    name="name"
                    placeholder="Activity"
                    value={activity.name}
                    onChange={e => handleActivityChange(dayIdx, dayData.activities.findIndex(a => a === activity), e)}
                    className="flex-1 border rounded-xl p-3 focus:outline-none transition-all duration-150"
                    style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}
                  />
                  <button type="button" onClick={() => removeActivity(dayIdx, dayData.activities.findIndex(a => a === activity))} className="text-red-500 text-xl">&#128465;</button>
                </div>
              ))}
              <button type="button" onClick={() => addActivity(dayIdx, 'Afternoon')} className="mt-2 px-4 py-1 bg-purple-600 text-white rounded">+ Add Activity</button>
            </div>
            {/* Evening Activities */}
            <div className="mb-4">
              <div className="font-semibold text-[#541C9C] mb-2">Evening Activities</div>
              {eveningActs.map((activity, actIdx) => (
                <div key={actIdx} className="flex items-center gap-2 mb-2">
                  <input
                    name="name"
                    placeholder="Activity"
                    value={activity.name}
                    onChange={e => handleActivityChange(dayIdx, dayData.activities.findIndex(a => a === activity), e)}
                    className="flex-1 border rounded-xl p-3 focus:outline-none transition-all duration-150"
                    style={{ borderColor: '#541C9C', background: '#FBF4FF', fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}
                  />
                  <button type="button" onClick={() => removeActivity(dayIdx, dayData.activities.findIndex(a => a === activity))} className="text-red-500 text-xl">&#128465;</button>
                </div>
              ))}
              <button type="button" onClick={() => addActivity(dayIdx, 'Evening')} className="mt-2 px-4 py-1 bg-purple-600 text-white rounded">+ Add Activity</button>
            </div>
          </div>
        );
      })}
      <button type="submit" className="w-full mt-4 py-2 bg-[#541C9C] text-white font-bold rounded">Generate Itinerary</button>
    </form>
  );
} 