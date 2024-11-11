import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const CoachViewProfile = () => {
  const { coachid } = useParams();
  console.log('Coach ID from useParams:', coachid);
  const [coachDetails, setCoachDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/coaches/${coachid}`)
      .then((response) => {
        setCoachDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error('Error fetching coach details:', error));
  }, [coachid]);

  return (
    <div>
      <h2>Coach Profile</h2>
      {coachDetails ? (
        <div>
          <p>Coach ID: {coachDetails.id}</p>
          <p>Date of Birth: {coachDetails.dateOfBirth}</p>
          <p>Mobile Number: {coachDetails.mobileNumber}</p>
          <p>Specialty: {coachDetails.speciality}</p>
        </div>
      ) : (
        <p>Loading coach profile...</p>
      )}
    </div>
  );
};
export default CoachViewProfile;
