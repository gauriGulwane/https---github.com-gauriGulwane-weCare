import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserHome = () => {
  const { userid } = useParams();
  console.log('User ID from useParams:', userid);
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCoach, setSelectdCoach] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [bookingError, setBookingError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [slot, setSlot] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    //fetch coaches
    axios
      .get(`http://localhost:8080/coaches`)
      .then((response) => {
        setCoaches(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error('Error fecthing coaches', err);
        setError('Failed to load coach information');
      });
  }, [userid]);

  const handleBookClick = (coach) => {
    setSelectdCoach(coach);
    setBookingError(null);
    setSuccessMessage('');
    setIsConfirm(false);
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

    const bookingData = {
      appointmentDate,
      slot,
      userId: userid,
      coachId: selectedCoach.id,
    };

    axios
      .post(`http://localhost:8080/bookings`, bookingData)
      .then(() => {
        setSuccessMessage('Booking confirmed!');
        setIsConfirm(true);
        console.log(successMessage); // Ensure this is logged

        // Delay reset of form to show success message first
        setTimeout(() => {
          setSelectdCoach(null);
          setAppointmentDate('');
          setSlot('');
        }, 3000); // delay for 500ms to ensure message appears
      })
      .catch((err) => {
        console.error('Error booking appointment', err);
        setError('Falied to book an appointmetn');
      });
  };

  return (
    <>
      <nav>
        <Link to={`/userhome/${userid}/userappointments`}>My Appointments</Link>
        <Link to={`/userhome/${userid}/userviewprofile`}>View Profile</Link>
      </nav>
      <h1>User Home</h1>
      {isConfirm ? (
        <>
          <p>{successMessage}</p>
          {/* <button onClick={() => navigate(`/userhome/${userid}`)}> */}
          <button onClick={() => setIsConfirm(false)}>Go back</button>
        </>
      ) : (
        <>
          {error ? <p>{error}</p> : <p>User ID: {userid}</p>}
          {/* {userid && <p>User ID: {userid}</p>} */}
          <h2>Coaches</h2>
          {coaches.length > 0 ? (
            <ul>
              {coaches.map((coach) => (
                <li key={coach.id}>
                  <h3>Name:{coach.name}</h3>Speciality: {coach.speciality}
                  <button onClick={() => handleBookClick(coach)}>
                    Book an appointment
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No coaches available</p>
          )}
          {selectedCoach && (
            <div>
              <h2>Proceed with your appointment with {selectedCoach.name}</h2>
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
              <button
                onClick={handleConfirmAppointment}
                disabled={!appointmentDate || !slot}
              >
                Confirm your appointment
              </button>
              {bookingError && <p style={{ color: 'red' }}>{bookingError}</p>}

              {successMessage && (
                <>
                  <p>{successMessage}</p>
                  <button onClick={() => navigate(`/userhome/${userid}`)}>
                    Go back
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
export default UserHome;
