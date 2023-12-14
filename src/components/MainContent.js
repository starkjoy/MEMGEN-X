import React, { useRef } from 'react';
import Meme from "./Meme";

const MainContent = () => {
    const memeRef = useRef();
     // Function to trigger getMemeImage in the Meme component
  const handleArrowClick = () => {
    memeRef.current.getMemeImage();
  };

  return (
    <main>
      <div className="left-content">
        <LeftContentSection />
        <p className='text'>Your <b>Meme Generator</b></p>
      </div>
      <div className="right-content">
        <div className="main-display">
            <Meme ref={memeRef} />
          <img src="/images/arrow.png" alt="triangle icon" className='arrow-icon' onClick={handleArrowClick}/>
        </div>
        <ButtonsSection  memeRef={memeRef}/>
      </div>
    </main>
  );
};

const LeftContentSection = () => {
  return (
    <div className='side-notice'>
      <img src="/images/x.png" alt="x" className='x-icon' />
      <div className="notice-content">
        <p>Please edit and<br/>move<br/>the<br/><b>"EDIT THIS"</b><br/>placeholders<br/>to<br/>your desired<br/>spot<br/>on the<br/>Meme</p>
      </div>
    </div>
  );
};


const ButtonsSection = ({memeRef}) => {
  const handleDownload = () => {
    memeRef.current.handleDownload();
  };
  const triggerFileInput = () => {
    memeRef.current.triggerFileInput();
  };
  return (
    <div className="buttons">
      <p className="download" onClick={handleDownload}>Download</p>
      <p className='upload' onClick={triggerFileInput}>Upload</p>
      <img src="/images/mxv.png" alt="triangle icon" className='mx-icon'/>
    </div>
  );
};

export default MainContent;
