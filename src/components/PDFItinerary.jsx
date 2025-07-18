import React, { forwardRef } from "react";
import TravelItem from "./TravelItem";

const PDFItinerary = forwardRef(function PDFItinerary(
  { Vigovia, generalInfo, daysData, flights, hotels, payments },
  ref
) {
  return (
    <div
      ref={ref}
      className="w-full pdf-export"
      style={{ background: '#fff', color: '#222', fontFamily: 'Roboto, Arial, sans-serif' }}
    >
      {/* Logo Section */}
      <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <img
          src={Vigovia}
          alt="Vigovia Logo"
          style={{ width: '220px', maxWidth: '100%', marginLeft: '60px' }}
        />
      </div>
      {/* Info Card */}
      <div style={{
        margin: '24px auto',
        background: 'linear-gradient(90deg, #4ba1eb 0%, #936fe0 100%)',
        borderRadius: '24px',
        padding: '32px 24px',
        color: '#fff',
        textAlign: 'center',
        width: '95%',
        fontFamily: 'Poppins, sans-serif',
      }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, margin: 0, letterSpacing: 0.5 }}>Hi{generalInfo.name ? `, ${generalInfo.name}!` : "!"}</h2>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: '12px 0 0 0', letterSpacing: 0.5 }}>
          {generalInfo.destination ? `${generalInfo.destination} Itinerary` : "Itinerary"}
        </h1>
        <p style={{ margin: '12px 0 0 0', fontSize: 24, fontWeight: 500 }}>
          {daysData.length > 0 ? `${daysData.length} Days ${daysData.length - 1} Nights` : ""}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18, gap: 28, fontSize: 32 }}>
          <span>✈️</span>
          <span>🏨</span>
          <span>🔄</span>
          <span>🚗</span>
          <span>🚌</span>
        </div>
      </div>
      {/* Travel Info Summary Section */}
      <div style={{
        width: '90%',
        margin: '0 auto',
        border: '2px solid #541C9C',
        borderRadius: 16,
        padding: 16,
        marginTop: 24
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          fontSize: 16,
          color: '#222'
        }}>
          <TravelItem label="Departure From" value={generalInfo.departureFrom} />
          <TravelItem label="Departure" value={generalInfo.departureDate} />
          <TravelItem label="Destination" value={generalInfo.destination} />
          <TravelItem label="Arrival" value={generalInfo.arrivalDate} />
          <TravelItem label="No. Of Travellers" value={generalInfo.travellers} />
          <TravelItem label="Members" value={generalInfo.members} />
          <TravelItem label="Rooms" value={generalInfo.rooms} />
          <TravelItem label="Age" value={generalInfo.age} />
        </div>
      </div>
      {/* Day-wise Activities */}
      <div style={{ width: '100%', margin: '40px 0' }}>
        {daysData.map((day, idx) => {
          const morningActs = day.activities.filter(a => a.timeOfDay === 'Morning');
          const afternoonActs = day.activities.filter(a => a.timeOfDay === 'Afternoon');
          const eveningActs = day.activities.filter(a => a.timeOfDay === 'Evening');
          return (
            <div key={idx} style={{ width: '90%', margin: '40px auto', borderRadius: 16, background: '#f5f5f5', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ background: '#321E5D', color: '#fff', fontWeight: 'bold', fontSize: 20, borderRadius: 32, width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ transform: 'rotate(-90deg)', display: 'inline-block' }}>Day {idx + 1}</span>
                </div>
                <div style={{ flex: 1 }}>
                  {['Morning', 'Afternoon', 'Evening'].map((timeOfDay) => {
                    const acts =
                      timeOfDay === 'Morning' ? morningActs :
                      timeOfDay === 'Afternoon' ? afternoonActs :
                      eveningActs;
                    if (!acts.length) return null;
                    return (
                      <div key={timeOfDay} style={{ marginBottom: 16 }}>
                        <div style={{ fontWeight: 'bold', fontSize: 18, color: '#541C9C', marginBottom: 8 }}>{timeOfDay}</div>
                        {acts.map((activity, aIdx) => (
                          <div key={aIdx} style={{ background: '#F9EEFF', borderRadius: 12, padding: 16, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
                            {activity.image && (
                              <img 
                                src={activity.image} 
                                alt="Activity" 
                                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} 
                                onError={e => { e.currentTarget.style.display = 'none'; }}
                              />
                            )}
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 'bold', fontSize: 18, color: '#541C9C' }}>{activity.name || "Activity"}</div>
                              <div style={{ fontSize: 14, color: '#444' }}>{activity.description}</div>
                              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                <span style={{ fontSize: 12, background: '#321E5D', color: '#fff', borderRadius: 4, padding: '2px 8px' }}>Type: {activity.type}</span>
                                <span style={{ fontSize: 12, background: '#321E5D', color: '#fff', borderRadius: 4, padding: '2px 8px' }}>Time: {activity.time}</span>
                                <span style={{ fontSize: 12, background: '#321E5D', color: '#fff', borderRadius: 4, padding: '2px 8px' }}>Price: {activity.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Flight Summary Section */}
      <div style={{
        width: '90%',
        margin: '40px auto',
        border: '2px solid #541C9C',
        borderRadius: 16,
        padding: 24,
        background: '#fff'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: 24, color: '#541C9C', marginBottom: 16 }}>
          Flight Summary
        </div>
        {flights && flights.length > 0 ? flights.map((flight, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            borderBottom: '1px solid #eee',
            padding: '8px 0'
          }}>
            <div style={{ fontWeight: 'bold', minWidth: 120 }}>{flight.date}</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 'bold' }}>{flight.airline}</span>
              <span style={{ marginLeft: 8 }}>From {flight.from} To {flight.to}</span>
            </div>
          </div>
        )) : <div style={{ color: '#888' }}>No flights added.</div>}
      </div>
      {/* Hotel Bookings Section */}
      <div style={{
        width: '90%',
        margin: '40px auto',
        border: '2px solid #541C9C',
        borderRadius: 16,
        padding: 24,
        background: '#fff'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: 24, color: '#541C9C', marginBottom: 16 }}>
          Hotel Bookings
        </div>
        <div style={{ display: 'flex', gap: 16, fontWeight: 'bold', color: '#321E5D', marginBottom: 8 }}>
          <div style={{ minWidth: 100 }}>City</div>
          <div style={{ minWidth: 110 }}>Check In</div>
          <div style={{ minWidth: 110 }}>Check Out</div>
          <div style={{ minWidth: 60 }}>Nights</div>
          <div style={{ minWidth: 200 }}>Hotel Name</div>
        </div>
        {hotels && hotels.length > 0 ? hotels.map((hotel, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 16, borderBottom: '1px solid #eee', padding: '8px 0', color: '#222' }}>
            <div style={{ minWidth: 100 }}>{hotel.city}</div>
            <div style={{ minWidth: 110 }}>{hotel.checkIn}</div>
            <div style={{ minWidth: 110 }}>{hotel.checkOut}</div>
            <div style={{ minWidth: 60 }}>{hotel.nights}</div>
            <div style={{ minWidth: 200 }}>{hotel.hotelName}</div>
          </div>
        )) : <div style={{ color: '#888' }}>No hotels added.</div>}
      </div>
      {/* Payment Plans Section */}
      <div style={{ width: '90%', margin: '40px auto' }}>
        <div style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 16 }}>
          <span style={{ color: '#222' }}>Payment </span>
          <span style={{ color: '#8B2FC9' }}>Plan</span>
        </div>
        <div style={{ padding: 0, background: 'transparent', boxShadow: 'none' }}>
          {payments && payments.length > 0 ? payments.map((payment, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #8B2FC9',
              borderRadius: 12,
              marginBottom: 16,
              background: '#F9F6FF',
              overflow: 'hidden',
              minHeight: 56
            }}>
              {/* Left chevron/installment */}
              <div style={{
                background: '#F3E8FF',
                minWidth: 170,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 20,
                color: '#8B2FC9',
                height: '100%',
                position: 'relative',
                clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)'
              }}>
                {payment.installment}
              </div>
              {/* Amount and due date */}
              <div style={{ padding: '0 24px', fontSize: 18, display: 'flex', alignItems: 'center', flex: 1 }}>
                <span style={{ fontWeight: 700, color: '#222', marginRight: 8 }}>Amount: {payment.amount}</span>
                <span style={{ color: '#222', marginLeft: 16 }}>Due: {payment.dueDate}</span>
              </div>
            </div>
          )) : <div style={{ color: '#888' }}>No payment plans added.</div>}
        </div>
      </div>
      {/* Scope of Service Section */}
      <div style={{ width: '90%', margin: '40px auto', border: '2px solid #541C9C', borderRadius: 16, padding: 24, background: '#fff' }}>
        <div style={{ fontWeight: 'bold', fontSize: 24, color: '#541C9C', marginBottom: 16 }}>Scope of Service</div>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 18, padding: '12px 8px', borderBottom: '2px solid #541C9C' }}>Service</th>
              <th style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 18, padding: '12px 8px', borderBottom: '2px solid #541C9C' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Flight Tickets And Hotel Vouchers</td>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Delivered 3 Days Post Full Payment</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Web Check-In</td>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Boarding Pass Delivery Via Email/WhatsApp</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Support</td>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Chat Support – Response Time: 4 Hours</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Cancellation Support</td>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Provided</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Trip Support</td>
              <td style={{ padding: '10px 8px', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>Response Time: 5 Minutes</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div style={{ width: '100%', marginTop: 40, padding: 24, background: '#f5f5f5', borderTop: '2px solid #541C9C', textAlign: 'center', color: '#222' }}>
        <div style={{ fontWeight: 'bold', fontSize: 20 }}>Vigovia Tech Pvt. Ltd</div>
        <div>Registered Office: Hd-109 Cinnabar Hills, Links Business Park, Karnataka, India.</div>
        <div>Phone: +91-99X9999999 | Email: Contact@Vigovia.Com</div>
        <img src={Vigovia} alt="Vigovia Logo" style={{ width: 180, margin: '16px auto 0 auto', display: 'block' }} />
      </div>
    </div>
  );
});

export default PDFItinerary; 