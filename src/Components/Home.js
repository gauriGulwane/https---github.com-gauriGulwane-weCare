import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const coachsignup = () => {
    navigate('/Home/coachsignup');
  };
  const coachlogin = () => {
    navigate('/Home/coachlogin');
  };
  const userlogin = () => {
    navigate('/Home/userlogin');
  };
  const usersignup = () => {
    navigate('/Home/usersignup');
  };
  return (
    <>
      <h1>Home Page</h1>

      <h2>We are at the heart of appropriate care</h2>
      <div>
        <button onClick={coachsignup}>Join as a coach</button>
        <button onClick={coachlogin}>Log in as coach</button>
      </div>

      <div>
        <button onClick={usersignup}>Sign up as user</button>
        <button onClick={userlogin}>Login as user</button>
      </div>
    </>
  );
};
export default Home;
