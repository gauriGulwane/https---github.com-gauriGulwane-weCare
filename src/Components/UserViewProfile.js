import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserViewProfile = () => {
  const { userid } = useParams();
  console.log('User ID from useParams:', userid);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${userid}`)
      .then((response) => {
        setUserDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error('Error fetching user details:', error));
  }, [userid]);

  return (
    <div>
      <h2>User Profile</h2>
      {userDetails ? (
        <>
          <div>
            <p>User ID: {userDetails.id}</p>
            <p>Date of Birth: {userDetails.dateOfBirth}</p>
            <p>Mobile Number: {userDetails.mobileNumber}</p>
            <p>EmailID: {userDetails.email}</p>
            <p>Pincode: {userDetails.pincode}</p>
            <p>
              Address:
              {userDetails.city}, {userDetails.state}, {userDetails.country}
            </p>
          </div>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};
export default UserViewProfile;
