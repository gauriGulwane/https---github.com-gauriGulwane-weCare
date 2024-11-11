import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserAppointments = () => {
  const { userid } = useParams();
  console.log('User ID from useParams:', userid);
  const [appointments, setAppointments] = useState([]);
  const [isReschedule, setIsReschedule] = useState(false);
  const [bookingId, setBookingID] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [bookingError, setBookingError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [slot, setSlot] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch appointments
    axios
      .get(`http://localhost:8080/bookings?userId=${userid}`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error('Error fetching appointments', err);
        setError('Failed to load appointments');
      });
  }, [userid]);

  const handleReschedule = (bookid) => {
    setIsReschedule(true);
    setBookingID(bookid);
  };

  const handleConfirmAppointment = () => {
    const today = new Date();
    const selectedDate = new Date(appointmentDate);
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    if (
      !appointmentDate ||
      appointmentDate <= today ||
      selectedDate > sevenDaysLater
    ) {
      setBookingError('Appointment should be within the upcoming 7 days');
      return;
    }

    if (!slot) {
      setBookingError('Please select a slot');
      return;
    }

    const updatedBookingData = {
      appointmentDate,
      slot,
      userId: userid,
    };

    // Make PATCH request to update the booking
    axios
      .patch(`http://localhost:8080/bookings/${bookingId}`, updatedBookingData)
      .then(() => {
        setSuccessMessage('Your appointment has been updated successfully');
        setBookingError(null);
      })
      .catch((err) => {
        console.error('Error updating appointment', err);
        setBookingError('Failed to update the appointment');
      });
  };

  const confirmCancelAppointment = () => {
    axios
      .delete(`http://localhost:8080/bookings/${bookingId}`)
      .then(() => {
        setSuccessMessage('Your appointment has been canceled successfully');
        setShowCancelModal(false);
        setBookingID('');
        // Refresh appointments after canceling
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== bookingId)
        );
      })
      .catch((err) => {
        console.error('Error canceling booking', err);
        setError('Failed to cancel the booking');
      });
  };

  const handleCancelAppointmentClick = (id) => {
    setBookingID(id);
    setShowCancelModal(true);
  };

  return (
    <>
      <nav>
        <Link to={`/userhome/${userid}/userappointments`}>Appointments</Link>
        <Link to={`/userhome/${userid}/userviewprofile`}>View Profile</Link>
      </nav>
      <h1>Your Appointments</h1>
      {isReschedule ? (
        <>
          <p>Reschedule your appointment (Booking ID: {bookingId})</p>
          <label>
            Date of Appointment
            <input
              type='date'
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            Slot:
            <select value={slot} onChange={(e) => setSlot(e.target.value)}>
              <option value=''>Select</option>
              <option value='8 AM to 9 AM'>8 AM to 9 AM</option>
              <option value='9 AM to 10 AM'>9 AM to 10 AM</option>
              <option value='10 AM to 11 AM'>10 AM to 11 AM</option>
              <option value='11 AM to 12 PM'>11 AM to 12 PM</option>
            </select>
          </label>
          <br />
          <button onClick={handleConfirmAppointment}>
            Confirm Appointment
          </button>
          {bookingError && <p style={{ color: 'red' }}>{bookingError}</p>}
          {successMessage && (
            <>
              <p style={{ color: 'green' }}>{successMessage}</p>
              <button onClick={() => navigate(`/userhome/${userid}`)}>
                Go back
              </button>
            </>
          )}
        </>
      ) : (
        <>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <p>User ID: {userid}</p>
          )}

          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  <h2>Date: {appointment.appointmentDate}</h2>
                  <h3>Slot: {appointment.slot}</h3>
                  <p>Booking ID: {appointment.id}</p>
                  <p>Coach ID: {appointment.coachId}</p>
                  <div>
                    <button onClick={() => handleReschedule(appointment.id)}>
                      Reschedule Appointment
                    </button>
                    <button
                      onClick={() =>
                        handleCancelAppointmentClick(appointment.id)
                      }
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointment found</p>
          )}

          {/* Cancel Confirmation Modal */}
          {showCancelModal && (
            <div className='modal'>
              <div className='modal-content'>
                <h3>Do you want to cancel the booking?</h3>
                <button onClick={confirmCancelAppointment}>Yes</button>
                <button onClick={() => setShowCancelModal(false)}>No</button>
              </div>
            </div>
          )}
          <button onClick={() => navigate(-1)}>Go Back</button>
        </>
      )}
    </>
  );
};

export default UserAppointments;
