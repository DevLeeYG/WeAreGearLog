import React from 'react';
import '../App.css';
import intro from '../Video/intro.mp4';

const Intro = () => {
  return (
    <video className="intros" autoPlay loop muted>
      <source className="intro-video" src={intro} type="video/mp4" />
    </video>
  );
};

export default Intro;
