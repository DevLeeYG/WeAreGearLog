import React from 'react';
import '../App.css';
import Video from '../Video/Blue.mp4';

const Home = () => {
  return (
    <>
      <video height="100" className="GearLog" autoPlay loop muted>
        <source className="intro-video" src={Video} type="video/mp4" />
      </video>
    </>
  );
};

export default Home;
