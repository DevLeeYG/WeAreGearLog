import React from 'react';

import Nav from './Components/Nav';
import './App.css';
import SingIn from './Auth/SignIn';

import Home from './Components/Home';

import Brand from './Components/Brand';

import BrandCover from './Components/BrandCover';
import Intro from './Components/Intro';
import IntroCover from './Components/IntroCover';

import Footer from './Components/Footer';
import { Route } from 'react-router';
import Register from './Auth/Register';
import Padding from './Components/Padding';

const App = () => {
  return (
    <>
      <Nav />
      <Padding />
      <Route exact path="/">
        <Home />
        <IntroCover />
        <Intro />
        <BrandCover />
        <Brand />

        {/* <Footer /> */}
      </Route>
      <Route path="/account/login">
        <SingIn />
      </Route>
      <Route path="/account/register">
        <Register />
      </Route>
    </>
  );
};

export default App;
