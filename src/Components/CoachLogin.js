import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoachLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};

    if (formData.id.length === 0) {
      tempErrors.id = 'Id is required';
    }

    if (formData.password.length < 5 || formData.password.length > 10) {
      tempErrors.password = 'password should be 5 to 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, password } = formData;
    if (validate()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/coaches?id=${id}&password=${password}`
        );

        if (response.data.length === 0) {
          throw new Error('Coach ID and password do not exist');
        }

        setIsLoggedIn(true);
        setErrors({});
        setFormData({
          id: '',
          password: '',
        });
        navigate(`/coachhome/${id}`);
      } catch (err) {
        // setErrors('Invalid credentials');
        setErrors({ general: 'Invalid credentials' });
        console.error(err);
      }
    } else {
      alert('please correct the errors in the form');
    }
  };

  return (
    <>
      <h1>Login as Life Coach</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='id'
            value={formData.id}
            onChange={handleChange}
            placeholder='Coach Id'
          />
          {errors.id && <p style={{ color: 'red' }}>{errors.id}</p>}
        </div>
        <div>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button type='submit'>Login</button>
      </form>

      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
      {isLoggedIn && <p style={{ color: 'green' }}>You are now logged in</p>}
    </>
  );
};
export default CoachLogin;
