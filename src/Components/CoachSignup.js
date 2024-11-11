import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoachSignup = () => {
  const [formData, SetFormData] = useState({
    name: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    speciality: '',
  });
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const [coachId, setCoachId] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {}; //is an object
    const currentYear = new Date().getFullYear(); //2024

    //name
    if (formData.name.length < 3 || formData.name.length > 50) {
      tempErrors.name = 'name should be 3 to 50 characters';
    }

    //password
    if (formData.password.length < 5 || formData.password.length > 10) {
      tempErrors.password = 'Password should have 5 to 10 characters';
    }
    // date of birth

    const birthYear = new Date(formData.dateOfBirth).getFullYear();
    const age = currentYear - birthYear;

    if (age < 20 || age > 100) {
      tempErrors.dateOfBirth = 'Age should be between 20 and 100';
    }
    //gender
    if (!formData.gender) {
      tempErrors.gender = 'Gender is required';
    }

    //mobile

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = 'Mobile number should be 10 numbers';
    }
    //speciality
    if (formData.speciality.length < 10 || formData.speciality.length > 50) {
      tempErrors.speciality = 'Speciality should have 10 to 50 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; //if tempErrors is empty
  };
  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      axios
        .post('http://localhost:8080/coaches', formData)
        .then((response) => {
          console.log(response.data);
          setIsRegistered(true);
          setCoachId(response.data.id);
          SetFormData({
            name: '',
            password: '',
            dateOfBirth: '',
            gender: '',
            mobileNumber: '',
            speciality: '',
          }); //clear the form data
        })
        .catch((err) => {
          console.log("can't post data");
        });
    } else {
      alert('Please correct the error in the form');
    }
  };

  const handleCoachLogin = () => {
    navigate('/Home/coachlogin');
  };
  return (
    <>
      {isRegistered ? (
        <>
          <h1 style={{ color: 'green' }}>You are a coach now!!</h1>
          {coachId && <p>Your coach id is {coachId}</p>}
          <button onClick={handleCoachLogin}>Login Now</button>
        </>
      ) : (
        <>
          <h1>Life Coach Profile</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name: </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>

            <div>
              <label>Password:</label>
              <input
                type='password'
                name='password'
                id='password'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p style={{ color: 'red' }}>{errors.password}</p>
              )}
            </div>

            <div>
              <label>Date of Birth</label>
              <input
                type='date'
                name='dateOfBirth'
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && (
                <p style={{ color: 'red' }}>{errors.dateOfBirth}</p>
              )}
            </div>

            <div>
              <label>Gender</label>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
              >
                <option value=''>Select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
              {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
            </div>

            <div>
              <label>Mobile Number:</label>
              <input
                type='text'
                name='mobileNumber'
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && (
                <p style={{ color: 'red' }}>{errors.mobileNumber}</p>
              )}
            </div>

            <div>
              <label>Speciality:</label>
              <input
                type='text'
                name='speciality'
                value={formData.speciality}
                onChange={handleChange}
              />
              {errors.speciality && (
                <p style={{ color: 'red' }}>{errors.speciality}</p>
              )}
            </div>
            <button type='submit'>Register</button>
          </form>
        </>
      )}
    </>
  );
};
export default CoachSignup;
