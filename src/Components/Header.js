import React from 'react';
import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <h3>WeCare</h3>
      <h3>Call us at ...</h3>
      <Outlet />
    </>
  );
};
export default Header;
