import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const CoachHome = () => {
  const { coachid } = useParams();
  console.log('Coach ID from useParams:', coachid);
  const [appointments, setAppointments] = useState([]);
  const [coachDetails, setCoachDetails] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    //fetch appointments for coach
    axios
      .get(`http://localhost:8080/bookings?coachId=${coachid}`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error('Error fecthing appointments', err);
      });

    //fetch coach details
    axios
      .get(`http://localhost:8080/coaches/${coachid}`)
      .then((response) => {
        setCoachDetails(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error('Error fetching coach details', err);
        setError('Coach not found or server error');
      });
  }, [coachid]);

  return (
    <>
      <nav>
        <Link to={`/coachhome/${coachid}/coachschedule`}>My Schedule</Link>
        <Link to={`/coachhome/${coachid}/coachviewprofile`}>View Profile</Link>
      </nav>
      <h1>Coach Home</h1>
      {/* {error ? <p>{error}</p> : <p>Coach ID: {coachid}</p>} */}
      {coachid && <p>Coach ID: {coachid}</p>}

      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              Appointment Data:{appointment.appointmentDate}, Slot:{' '}
              {appointment.slot}, Booking ID: {appointment.id}, User ID:{' '}
              {appointment.userId}
            </li>
          ))}
        </ul>
      ) : (
        <p>No planned schedule yet</p>
      )}
    </>
  );
};
export default CoachHome;
