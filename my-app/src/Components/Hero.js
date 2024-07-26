import React from 'react'

const Hero = ({ heroObj }) => {

  return (
    <div className='hero-section'>
      <video autoPlay loop muted className='hero-vid' src={heroObj.video}></video>
      <div className='hero-text-contaier'>
        <div className='hero-text'>
          <h1>{heroObj.heading}</h1>
          <p>{heroObj.p}</p>
        </div>
      </div>
    </div>
  )
}

export default Hero;

