import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    mobileNumber: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  });
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [userId, setUserId] = useState(''); //userid will set after sign up
  const navigate = useNavigate();
  const validate = () => {
    let tempErrors = {};
    const currentYear = new Date().getFullYear(); //2024

    //name
    if (formData.name.length < 3 || formData.name.length > 50) {
      tempErrors.name = 'name should be 3 to 50 characters';
    }

    //city
    if (formData.city.length < 6 || formData.city.length > 20) {
      tempErrors.city = 'city name should be 6 to 20 characters';
    }
    //state
    if (formData.state.length < 6 || formData.state.length > 20) {
      tempErrors.state = 'state name should be 6 to 20 characters';
    } //country
    if (formData.country.length < 6 || formData.country.length > 20) {
      tempErrors.country = 'country name should be 6 to 20 characters';
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

    //email
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    }

    //mobile

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = 'Mobile number should be 10 numbers';
    }

    //pincode
    if (!/^\d{6}$/.test(formData.pincode)) {
      tempErrors.pincode = 'pincode should be 6 digits';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; //means tempErrors is empty object so it will return true
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //const nextId =users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
      //const newUser = { id: nextId, ...formData };
      //setUsers((prevUsers) => [...prevUsers, newUser]);
      axios
        .post('http://localhost:8080/users', formData)
        .then((response) => {
          console.log(response.data);
          setIsRegistered(true);
          setUserId(response.data.id);
          setFormData({
            name: '',
            password: '',
            gender: '',
            dateOfBirth: '',
            email: '',
            mobileNumber: '',
            pincode: '',
            city: '',
            state: '',
            country: '',
          });
        })
        .catch((err) => {
          console.log("can't post data");
        });
    } else {
      alert('Please correct the errors in the form');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    navigate('/Home/userlogin');
  };
  return (
    <>
      {isRegistered ? (
        <>
          <h1>Account created successfully</h1>
          {userId && <h2>Your User Id is: {userId}</h2>}
          <button onClick={handleLogin}>Login Now</button>
        </>
      ) : (
        <>
          <h1>User Profile</h1>
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
              <label>Email: </label>
              <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>

            <div>
              <label>City: </label>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
            </div>

            <div>
              <label>State: </label>
              <input
                type='text'
                name='state'
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
            </div>

            <div>
              <label>Country: </label>
              <input
                type='text'
                name='country'
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && (
                <p style={{ color: 'red' }}>{errors.country}</p>
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
              <label>Pincode:</label>
              <input
                type='text'
                name='pincode'
                value={formData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && (
                <p style={{ color: 'red' }}>{errors.pincode}</p>
              )}
            </div>

            <button type='submit'>Register</button>
          </form>
        </>
      )}
    </>
  );
};
export default UserSignup;
