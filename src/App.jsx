import React, { useState, useRef } from "react";

import Vigovia from "../src/assets/Vigvia logo.png"; 
import Ellipse from "./assets/Ellipse1.png";
import Ellipse1 from "./assets/Ellipse2.png";
import Ellipse2 from "./assets/Ellipse3.png";
import Ellipse3 from "./assets/Ellipse4.png";
import TravelItem from "./components/TravelItem";
import TravelDays from "./components/TravelDays";
import VigoviaFooter from "./components/VigoviaFooter";
import FlightSummary from "./components/FlightSummary";
import HotelBookings2 from "./components/HotelBookings2";
import PaymentPlans from "./components/PaymentsPlans";
import ItineraryInputForm from "./components/ItineraryInputForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PDFItinerary from "./components/PDFItinerary";
import { FaPlane, FaHotel, FaShuttleVan, FaCar, FaBus } from "react-icons/fa";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFItineraryReactPDF from './PDFItineraryReactPDF';


function App() {
  const [generalInfo, setGeneralInfo] = useState({
    departureFrom: "Kolkata",
    departureDate: "09/06/2025",
    destination: "Singapore",
    arrivalDate: "15/06/2025",
    travellers: 4,
  });
  const [daysData, setDaysData] = useState([
  ]);
  const [step, setStep] = useState("start"); // 'start', 'form', 'itinerary'
  const itineraryRef = useRef(null);
  const pdfItineraryRef = useRef(null);

  const [hotelData, setHotelData] = useState([
    {
      title: "City",
      values: ["Singapore", "Singapore", "Singapore", "Singapore"],
      widthClass: "w-1/5 min-w-[100px]",
    },
    {
      title: "Check In",
      values: ["24/02/2024", "24/02/2024", "24/02/2024", "24/02/2024"],
      widthClass: "w-1/5 min-w-[110px]",
    },
    {
      title: "Check Out",
      values: ["24/02/2024", "24/02/2024", "24/02/2024", "24/02/2024"],
      widthClass: "w-1/5 min-w-[110px]",
    },
    {
      title: "Nights",
      values: ["2", "2", "2", "2"],
      widthClass: "w-1/12 min-w-[60px]",
    },
    {
      title: "Hotel Name",
      values: [
        "Super Townhouse Oak\nVashi Formerly Blue",
        "Super Townhouse Oak\nVashi Formerly Blue",
        "Super Townhouse Oak\nVashi Formerly Blue",
        "Super Townhouse Oak\nVashi Formerly Blue",
      ],
      widthClass: "flex-1 min-w-[200px]",
    },
  ]);

  const [policyData, setPolicyData] = useState([
    {
      title: "Point",
      values: [
        "Airlines Standard Policy",
        "Flight/Hotel Cancellation",
        "Trip Insurance",
        "Hotel Check-In & Check Out",
        "Visa Rejection",
      ],
      widthClass: "w-1/3 min-w-[180px]",
    },
    {
      title: "Details",
      values: Array(5).fill(
        "In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost."
      ),
      widthClass: "flex-1 min-w-[400px]",
    },
  ]);

  const [scopeOfServiceData, setScopeOfServiceData] = useState([
    {
      title: "Service",
      values: [
        "Flight Tickets And Hotel Vouchers",
        "Web Check-In",
        "Support",
        "Cancellation Support",
        "Trip Support"
      ],
      widthClass: "w-1/2 min-w-[240px]"
    },
    {
      title: "Details",
      values: [
        "Delivered 3 Days Post Full Payment",
        "Boarding Pass Delivery Via Email/WhatsApp",
        "Chat Support – Response Time: 4 Hours",
        "Provided",
        "Response Time: 5 Minutes"
      ],
      widthClass: "w-1/2 min-w-[300px]"
    }
  ]);

  const [inclusionSummary, setInclusionSummary] = useState([
    {
      title: "Category",
      values: ["Flight", "Tourist Tax", "Hotel"],
      widthClass: "w-[120px] min-w-[100px]"
    },
    {
      title: "Count",
      values: ["2", "2", "2"],
      widthClass: "w-[80px]"
    },
    {
      title: "Details",
      values: [
        "All Flights Mentioned",
        "Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)",
        "Airport To Hotel • Hotel To Attractions • Day Trips If Any"
      ],
      widthClass: "flex-1 min-w-[300px]"
    },
    {
      title: "Status / Comments",
      values: ["Awaiting Confirmation", "Awaiting Confirmation", "Included"],
      widthClass: "w-[160px] min-w-[140px]"
    }
  ]);

  const [ActivitiesData, setActivitiesData] = useState([
    {
      title: "City",
      values: Array(16).fill("Rio De Janeiro"),
      widthClass: "w-[140px] min-w-[120px]"
    },
    {
      title: "Activity",
      values: Array(16).fill("Sydney Harbour Cruise & Taronga  Zoo"),
      widthClass: "flex-1 min-w-[200px]"
    },
    {
      title: "Type",
      values: [
        "Sightseeing",
        "Adventure",
        "Leisure",
        "Cultural",
        "Sightseeing",
        "Adventure",
        "Leisure",
        "Cultural",
        "Sightseeing",
        "Adventure",
        "Leisure",
        "Cultural",
        "Sightseeing",
        "Adventure",
        "Leisure",
        "Cultural"
      ],
      widthClass: "w-[160px] min-w-[120px]"
    },
    {
      title: "Time Required",
      values: [
        "2-3 Hours",
        "3 Hours",
        "Full Day",
        "Evening",
        "2-3 Hours",
        "3 Hours",
        "Full Day",
        "Evening",
        "2-3 Hours",
        "3 Hours",
        "Full Day",
        "Evening",
        "2-3 Hours",
        "3 Hours",
        "Full Day",
        "Evening"
      ],
      widthClass: "w-[140px] min-w-[100px]"
    }
  ]);

  const [installmentScheduleData, setInstallmentScheduleData] = useState([
    {
      title: "Installment",
      values: [
        "Installment 1",
        "Installment 2",
        "Installment 3"
      ],
      widthClass: "flex-1 min-w-[160px]",
    },
    {
      title: "Amount",
      values: [
        "₹3,50,000",
        "₹4,00,000",
        "Remaining"
      ],
      widthClass: "flex-1 min-w-[200px]"
    },
    {
      title: "Due Date",
      values: [
        "Initial Payment",
        "Post Visa Approval",
        "20 Days Before Departure"
      ],
      widthClass: "flex-1 min-w-[220px]"
    },
  ]);

  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [payments, setPayments] = useState([]);

  // Handler for form submission
  const handleItinerarySubmit = ({ general, itinerary, flights: formFlights, hotels: formHotels, payments: formPayments }) => {
    setGeneralInfo(general);
    setDaysData(itinerary);
    setFlights(formFlights || []);
    setHotels(formHotels || []);
    setPayments(formPayments || []);
    setStep("itinerary");
  };

  // Helper to wait for all images to load in a container
  function waitForImagesToLoad(container) {
    const images = container.querySelectorAll('img');
    const promises = [];
    images.forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        promises.push(
          new Promise(resolve => {
            img.onload = img.onerror = resolve;
          })
        );
      }
    });
    return Promise.all(promises);
  }

  // PDF download handler
  const handleDownloadPDF = async () => {
    if (!pdfItineraryRef.current) {
      alert("Itinerary content not found!");
      return;
    }
    try {
      const element = pdfItineraryRef.current;
      // Debug: Log all image sources in the PDF container
      const images = element.querySelectorAll('img');
      const imageSrcs = Array.from(images).map(img => img.src);
      console.log('PDF Images:', imageSrcs);
      await waitForImagesToLoad(element);
      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      // Validate imgData
      if (!imgData.startsWith('data:image/png')) {
        alert('PDF generation failed: Canvas did not produce a valid PNG.');
        console.error('Invalid imgData:', imgData.slice(0, 100));
        return;
      }
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      let pageNum = 0;
      const footerHeight = 70; // Height reserved for footer
      const footerY = pdfHeight - footerHeight + 20;
      const logoWidth = 80;
      const logoHeight = 30;
      const logoX = pdfWidth / 2 - logoWidth / 2;
      // Company info
      const companyName = "Vigovia Tech Pvt. Ltd";
      const companyAddr = "Registered Office: Hd-109 Cinnabar Hills, Links Business Park, Karnataka, India.";
      const companyContact = "Phone: +91-99X9999999 | Email: Contact@Vigovia.Com";
      // Get logo as data URL
      const logoImg = imageSrcs.find(src => src.includes('Vigvia logo.png')) || imageSrcs[0];
      // Draw each page
      while (heightLeft > 0) {
        if (pageNum > 0) pdf.addPage();
        position = pageNum * pdfHeight * -1;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        // Draw footer background (optional)
        // pdf.setFillColor(245, 245, 245);
        // pdf.rect(0, pdfHeight - footerHeight, pdfWidth, footerHeight, 'F');
        // Draw logo if available
        if (logoImg) {
          pdf.addImage(logoImg, 'PNG', logoX, footerY, logoWidth, logoHeight);
        }
        // Draw company info
        pdf.setFontSize(12);
        pdf.setTextColor(50, 30, 93);
        pdf.text(companyName, pdfWidth / 2, footerY + 10, { align: 'center' });
        pdf.setFontSize(10);
        pdf.setTextColor(34, 34, 34);
        pdf.text(companyAddr, pdfWidth / 2, footerY + 28, { align: 'center' });
        pdf.text(companyContact, pdfWidth / 2, footerY + 42, { align: 'center' });
        heightLeft -= pdfHeight;
        pageNum++;
      }
      pdf.save("itinerary.pdf");
    } catch (err) {
      alert("PDF generation failed: " + err.message);
      console.error(err);
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "800px",
          zIndex: -1,
          pointerEvents: "none"
        }}
      >
        <PDFItinerary
          ref={pdfItineraryRef}
          Vigovia={Vigovia}
          generalInfo={generalInfo}
          daysData={daysData}
          flights={flights}
          hotels={hotels}
          payments={payments}
        />
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white pt-10">
        {step === "start" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-white">
            {/* Centered Vigovia logo */}
            <div className="w-full flex flex-col items-center mt-8">
              <img
                src={Vigovia}
                alt="Vigovia Logo"
                className="w-48 sm:w-56 md:w-64 lg:w-72 mx-auto"
              />
              <hr className="w-1/2 border-t-2" style={{ borderColor: '#541C9C', margin: '24px auto' }} />
            </div>
            {/* Styled info message above the button */}
            <div className="flex justify-center w-full mb-4">
              <div
                className="text-center font-semibold max-w-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(90deg, #936FE0 0%, #541C9C 100%)',
                  color: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 2px 12px 0 rgba(84,28,156,0.08)',
                  padding: '24px 36px',
                  fontSize: '1.35rem',
                  margin: '0 auto',
                  letterSpacing: '0.01em',
                  lineHeight: 1.6,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600
                }}
              >
                Plan your next adventure! Fill in your trip details and generate a beautiful, downloadable itinerary PDF in seconds.
              </div>
            </div>
            <button
              className="text-white font-bold text-2xl px-10 py-4 rounded-full shadow-lg mt-4 transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
              style={{ background: '#541C9C' }}
              onMouseOver={e => (e.currentTarget.style.background = '#680099')}
              onMouseOut={e => (e.currentTarget.style.background = '#541C9C')}
              onClick={() => setStep("form")}
            >
              Get Itinerary
            </button>
            <div className="w-full mt-16">
              <div style={{ background: '#FBF4FF', padding: '32px 0' }}>
                <VigoviaFooter textColor="#321E5D" />
              </div>
            </div>
          </div>
        )}
        {step === "form" && (
          <div className="flex flex-col items-center w-full min-h-screen bg-white">
            {/* Centered Vigovia logo */}
            <div className="w-full flex flex-col items-center mt-8">
              <img
                src={Vigovia}
                alt="Vigovia Logo"
                className="w-48 sm:w-56 md:w-64 lg:w-72 mx-auto"
              />
              <hr className="w-1/2 border-t-2" style={{ borderColor: '#541C9C', margin: '24px auto' }} />
            </div>
            <div className="w-full flex flex-col items-center">
              <ItineraryInputForm 
                onSubmit={handleItinerarySubmit}
                initialGeneral={generalInfo}
                initialItinerary={daysData}
                initialFlights={flights}
                initialHotels={hotels}
                initialPayments={payments}
              />
            </div>
            <div className="w-full mt-8">
              <div style={{ background: '#FBF4FF', padding: '32px 0' }}>
                <VigoviaFooter textColor="#321E5D" />
              </div>
            </div>
          </div>
        )}
        {step === "itinerary" && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-8 mt-4" style={{ minHeight: 60 }}>
              <img
                src={Vigovia}
                alt="Vigovia Logo"
                style={{ width: '180px', maxWidth: '40vw', height: 'auto' }}
              />
              <div className="flex gap-4">
                <button
                  className="bg-white text-[#541C9C] font-bold px-6 py-2 rounded border border-[#541C9C] shadow hover:bg-[#f3eaff] transition"
                  onClick={() => setStep('form')}
                  style={{ zIndex: 1001, position: 'relative', cursor: 'pointer' }}
                >
                  Back to Edit
                </button>
                <button
                  className="bg-[#541C9C] text-white font-bold px-6 py-2 rounded shadow hover:bg-[#680099]"
                  onClick={() => window.print()}
                  style={{ zIndex: 1001, position: 'relative', cursor: 'pointer' }}
                >
                  Print / Save as PDF
                </button>
              </div>
            </div>
            <div style={{
              width: '95%',
              margin: '24px auto',
              background: 'linear-gradient(90deg, #4ba1eb 0%, #936fe0 100%)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 2px 12px 0 rgba(84,28,156,0.08)',
              padding: '32px 24px',
              minHeight: '180px',
              textAlign: 'center',
            }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, margin: 0, letterSpacing: 0.5 }}>Hi{generalInfo.name ? `, ${generalInfo.name}!` : "!"}</h2>
              <h1 style={{ fontSize: 40, fontWeight: 800, margin: '12px 0 0 0', letterSpacing: 0.5 }}>
                {generalInfo.destination ? `${generalInfo.destination} Itinerary` : "Itinerary"}
              </h1>
              <p style={{ margin: '12px 0 0 0', fontSize: 24, fontWeight: 500 }}>
                {daysData.length > 0 ? `${daysData.length} Days ${daysData.length - 1} Nights` : ""}
              </p>
              {/* Travel Icons Row */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18, gap: 28, fontSize: 32 }}>
                <FaPlane color="#fff" />
                <FaHotel color="#fff" />
                <FaShuttleVan color="#fff" />
                <FaCar color="#fff" />
                <FaBus color="#fff" />
              </div>
            </div>
            <div style={{
              width: '90%',
              margin: '0 auto',
              border: '2px solid #541C9C',
              borderRadius: 16,
              padding: 16,
              marginTop: 24,
              background: '#fff',
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
                <TravelItem label="Rooms" value={generalInfo.rooms} />
              </div>
            </div>
            <div style={{ width: '100%', margin: '40px 0' }}>
              {daysData.map((day, idx) => (
                <TravelDays
                  key={idx}
                  day={idx + 1}
                  date={day.date || ''}
                  title={day.title || ''}
                  activities={Array.isArray(day.activities) ? day.activities : []}
                />
              ))}
            </div>

            <div style={{ width: '90%', margin: '40px auto' }}>
              <div style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 16 }}>
                <span style={{ color: '#222' }}>Flight </span>
                <span style={{ color: '#8B2FC9' }}>Summary</span>
              </div>
              <div style={{ padding: 0, background: 'transparent', boxShadow: 'none' }}>
                {flights && flights.length > 0 ? flights.map((flight, idx) => (
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
                      {flight.date}
                    </div>
                    <div style={{ padding: '0 24px', fontSize: 18, display: 'flex', alignItems: 'center', flex: 1 }}>
                      <span style={{ fontWeight: 700, color: '#222', marginRight: 8 }}>Fly {flight.airline}</span>
                      <span style={{ color: '#222' }}>From {flight.from} To {flight.to}</span>
                    </div>
                  </div>
                )) : <div style={{ color: '#888' }}>No flights added.</div>}
                <div style={{ fontSize: 15, color: '#444', marginTop: 12, borderTop: '1px solid #ccc', paddingTop: 8 }}>
                  Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.
                </div>
              </div>
            </div>
            <div style={{ width: '90%', margin: '40px auto' }}>
              <div style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 16 }}>
                <span style={{ color: '#222' }}>Hotel </span>
                <span style={{ color: '#8B2FC9' }}>Bookings</span>
              </div>
              <div style={{ borderRadius: 24, overflow: 'hidden', background: '#F9F6FF', padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#3D246C', color: '#fff', fontWeight: 700, fontSize: 20, padding: '18px 0', borderTopLeftRadius: 32, borderRight: '2px solid #fff', textAlign: 'center' }}>City</th>
                      <th style={{ background: '#3D246C', color: '#fff', fontWeight: 700, fontSize: 20, padding: '18px 0', borderRight: '2px solid #fff', textAlign: 'center' }}>Check In</th>
                      <th style={{ background: '#3D246C', color: '#fff', fontWeight: 700, fontSize: 20, padding: '18px 0', borderRight: '2px solid #fff', textAlign: 'center' }}>Check Out</th>
                      <th style={{ background: '#3D246C', color: '#fff', fontWeight: 700, fontSize: 20, padding: '18px 0', borderRight: '2px solid #fff', textAlign: 'center' }}>Nights</th>
                      <th style={{ background: '#3D246C', color: '#fff', fontWeight: 700, fontSize: 20, padding: '18px 0', borderTopRightRadius: 32, textAlign: 'center' }}>Hotel Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotels && hotels.length > 0 ? hotels.map((hotel, idx) => (
                      <tr key={idx} style={{ background: '#F9F6FF', fontSize: 18, color: '#222', textAlign: 'center' }}>
                        <td style={{ padding: '16px 0', borderRight: '2px solid #fff' }}>{hotel.city}</td>
                        <td style={{ padding: '16px 0', borderRight: '2px solid #fff' }}>{hotel.checkIn}</td>
                        <td style={{ padding: '16px 0', borderRight: '2px solid #fff' }}>{hotel.checkOut}</td>
                        <td style={{ padding: '16px 0', borderRight: '2px solid #fff' }}>{hotel.nights}</td>
                        <td style={{ padding: '16px 0', whiteSpace: 'pre-line' }}>{hotel.hotelName}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={5} style={{ color: '#888', padding: 24 }}>No hotels added.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <ul style={{ fontSize: 15, color: '#444', marginTop: 18, marginLeft: 8, lineHeight: 1.7 }}>
                <li>All Hotels Are Tentative And Can Be Replaced With Similar.</li>
                <li>Breakfast Included For All Hotel Stays.</li>
                <li>All Hotels Will Be 4* And Above Category</li>
                <li>A maximum occupancy of 2 people/room is allowed in most hotels.</li>
              </ul>
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
            {/* Scope Of Service Section */}
            <div style={{ width: '90%', margin: '40px auto' }}>
              <div style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 16 }}>
                <span style={{ color: '#222' }}>Scope Of </span>
                <span style={{ color: '#8B2FC9' }}>Service</span>
              </div>
              <div style={{ borderRadius: 40, overflow: 'hidden', background: '#F9F6FF', padding: 0, display: 'flex' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#3D246C', color: '#fff', fontWeight: 700, fontSize: 22, padding: '18px 0', borderTopLeftRadius: 40, textAlign: 'center', width: '30%' }}>Service</th>
                      <th style={{ background: '#3D246C', color: '#fff', fontWeight: 700, fontSize: 22, padding: '18px 0', borderTopRightRadius: 40, textAlign: 'center', width: '70%' }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        service: 'Flight Tickets And Hotel Vouchers',
                        details: 'Delivered 3 Days Post Full Payment',
                      },
                      {
                        service: 'Web Check-In',
                        details: 'Boarding Pass Delivery Via Email/WhatsApp',
                      },
                      {
                        service: 'Support',
                        details: 'Chat Support – Response Time: 4 Hours',
                      },
                      {
                        service: 'Cancellation Support',
                        details: 'Provided',
                      },
                      {
                        service: 'Trip Support',
                        details: 'Response Time: 5 Minutes',
                      },
                    ].map((row, idx) => (
                      <tr key={idx} style={{ background: '#F9F6FF', fontSize: 18, color: '#222', textAlign: 'center' }}>
                        <td style={{ padding: '24px 0', borderRight: '2px solid #fff' }}>{row.service}</td>
                        <td style={{ padding: '24px 0' }}>{row.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Footer */}
            <div className="w-full mt-16">
              <div style={{ background: '#FBF4FF', padding: '32px 0' }}>
                <VigoviaFooter textColor="#321E5D" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
