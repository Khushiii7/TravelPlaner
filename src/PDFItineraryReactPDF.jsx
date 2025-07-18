import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    backgroundColor: '#fff',
    color: '#222',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    border: '1px solid #541C9C',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#541C9C',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#541C9C',
  },
  text: {
    marginBottom: 6,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#F3E8FF',
    color: '#541C9C',
    padding: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 4,
    fontSize: 12,
  },
  footer: {
    marginTop: 32,
    padding: 12,
    borderTop: '2px solid #541C9C',
    textAlign: 'center',
    color: '#222',
    fontSize: 10,
  },
});

const PDFItineraryReactPDF = ({ generalInfo, daysData, flights, hotels, payments, scopeOfServiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* General Info */}
      <View style={styles.section}>
        <Text style={styles.title}>Itinerary for {generalInfo?.name || 'Guest'}</Text>
        <Text style={styles.text}>Destination: {generalInfo?.destination || 'N/A'}</Text>
        <Text style={styles.text}>Departure: {generalInfo?.departureFrom || 'N/A'} on {generalInfo?.departureDate || 'N/A'}</Text>
        <Text style={styles.text}>Arrival: {generalInfo?.destination || 'N/A'} on {generalInfo?.arrivalDate || 'N/A'}</Text>
        <Text style={styles.text}>Travellers: {generalInfo?.travellers || 'N/A'}</Text>
      </View>
      {/* Days & Activities */}
      {daysData && daysData.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Itinerary Days</Text>
          {daysData.map((day, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', color: '#541C9C' }}>Day {idx + 1}</Text>
              {day.activities && day.activities.map((act, aIdx) => (
                <Text key={aIdx} style={styles.text}>
                  {act.name} - {act.description} ({act.type}, {act.time}, {act.price})
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
      {/* Flights */}
      {flights && flights.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Flight Summary</Text>
          <View style={[styles.tableRow, { borderBottom: '2px solid #541C9C' }]}> 
            <Text style={styles.tableCell}>Date</Text>
            <Text style={styles.tableCell}>Airline</Text>
            <Text style={styles.tableCell}>From</Text>
            <Text style={styles.tableCell}>To</Text>
          </View>
          {flights.map((flight, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{flight.date}</Text>
              <Text style={styles.tableCell}>{flight.airline}</Text>
              <Text style={styles.tableCell}>{flight.from}</Text>
              <Text style={styles.tableCell}>{flight.to}</Text>
            </View>
          ))}
        </View>
      )}
      {/* Hotels */}
      {hotels && hotels.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Hotel Bookings</Text>
          <View style={[styles.tableRow, { borderBottom: '2px solid #541C9C' }]}> 
            <Text style={styles.tableCell}>City</Text>
            <Text style={styles.tableCell}>Check In</Text>
            <Text style={styles.tableCell}>Check Out</Text>
            <Text style={styles.tableCell}>Nights</Text>
            <Text style={styles.tableCell}>Hotel Name</Text>
          </View>
          {hotels.map((hotel, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{hotel.city}</Text>
              <Text style={styles.tableCell}>{hotel.checkIn}</Text>
              <Text style={styles.tableCell}>{hotel.checkOut}</Text>
              <Text style={styles.tableCell}>{hotel.nights}</Text>
              <Text style={styles.tableCell}>{hotel.hotelName}</Text>
            </View>
          ))}
        </View>
      )}
      {/* Payments */}
      {payments && payments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Payment Plan</Text>
          <View style={[styles.tableRow, { borderBottom: '2px solid #541C9C' }]}> 
            <Text style={styles.tableCell}>Installment</Text>
            <Text style={styles.tableCell}>Amount</Text>
            <Text style={styles.tableCell}>Due Date</Text>
          </View>
          {payments.map((payment, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{payment.installment}</Text>
              <Text style={styles.tableCell}>{payment.amount}</Text>
              <Text style={styles.tableCell}>{payment.dueDate}</Text>
            </View>
          ))}
        </View>
      )}
      {/* Scope of Service */}
      {scopeOfServiceData && scopeOfServiceData.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Scope of Service</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Service</Text>
            <Text style={styles.tableCell}>Details</Text>
          </View>
          {scopeOfServiceData[0].values.map((service, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{service}</Text>
              <Text style={styles.tableCell}>{scopeOfServiceData[1].values[idx]}</Text>
            </View>
          ))}
        </View>
      )}
      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text>Vigovia Tech Pvt. Ltd | Registered Office: Hd-109 Cinnabar Hills, Links Business Park, Karnataka, India.</Text>
        <Text>Phone: +91-99X9999999 | Email: Contact@Vigovia.Com</Text>
      </View>
    </Page>
  </Document>
);

export default PDFItineraryReactPDF; 