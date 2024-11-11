import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './Components/Header';
import CoachSignup from './Components/CoachSignup';
import CoachLogin from './Components/CoachLogin';
import UserSignup from './Components/UserSignup';
import UserLogin from './Components/UserLogin';
import NotFound from './Components/NotFound';
import Home from './Components/Home';
import CoachHome from './Components/CoachHome';
import UserHome from './Components/UserHome';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import CoachSchedules from './Components/CoachSchedules';
import CoachViewProfile from './Components/CoachViewProfile';
import UserAppointments from './Components/UserAppointments';
import UserViewProfile from './Components/UserViewProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='Home/coachsignup' element={<CoachSignup />} />
        <Route path='Home/coachlogin' element={<CoachLogin />} />
        <Route path='Home/userlogin' element={<UserLogin />} />
        <Route path='Home/usersignup' element={<UserSignup />} />
        <Route path='/coachhome/:coachid' element={<CoachHome />} />
        <Route
          path='/coachhome/:coachid/coachschedule'
          element={<CoachSchedules />}
        />
        <Route
          path='/coachhome/:coachid/coachviewprofile'
          element={<CoachViewProfile />}
        />
        <Route path='/userhome/:userid' element={<UserHome />} />

        <Route
          path='/userhome/:userid/userviewprofile'
          element={<UserViewProfile />}
        />
        <Route
          path='/userhome/:userid/userappointments'
          element={<UserAppointments />}
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
