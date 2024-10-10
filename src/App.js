import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const videoRef = useRef(null);
  const contentRef = useRef(null); // Define contentRef for scrollable content
  const [activeContent, setActiveContent] = useState(null);
  const [isSlideVisible, setIsSlideVisible] = useState(false);
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);
  const [showGenderButtons, setShowGenderButtons] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Erreur lors de l'accès à la caméra : ", err);
        });
    }
  }, []);

  // Show the slide-out panel with specific content
  const handleButtonClick = (content) => {
    setActiveContent(content);
    setIsSlideVisible(true);  // Show the slide-out panel
  };

  const showPopup = (gender) => {
    setSelectedGender(gender);
    setPopupVisible(true);
    setShowGenderButtons(false); // Hide the gender buttons once a selection is made
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Toggle button visibility when clicking the image button
  const handleImageClick = () => {
    setAreButtonsVisible(!areButtonsVisible);  // Toggle button visibility
  };

  // Hide the slide-out panel
  const handleCloseSlide = () => {
    setIsSlideVisible(false);  // Hide the slide-out panel
  };

  const handleRecommendClick = () => {
    setShowGenderButtons(!showGenderButtons);  // Toggle visibility of gender buttons
  };

  // Scroll functionality
  const handleScroll = (direction) => {
    if (contentRef.current) {
      if (direction === 'up') {
        contentRef.current.scrollBy({ top: -100, behavior: 'smooth' });
      } else if (direction === 'down') {
        contentRef.current.scrollBy({ top: 100, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="container">
      <div className="avatar">
        <video ref={videoRef} autoPlay playsInline></video>
      </div>

      <div className="menu">
        <button className="top-button" onClick={handleImageClick}>
          <img src="/3la9a.png" alt="show buttons" className="button-image" />
        </button>

        {areButtonsVisible && (
          <>
            <button className="icon-button" onClick={() => handleButtonClick('shirt')}>
              <img src="/tshi.png" alt="shirt" className="button-image" />
            </button>
            <button className="icon-button" onClick={() => handleButtonClick('pants')}>
              <img src="/pants.png" alt="pants" className="button-image" />
            </button>
            <button className="icon-button" onClick={() => handleButtonClick('shoes')}>
              <img src="/shoes.png" alt="shoes" className="button-image" />
            </button>
          </>
        )}
      </div>

      <button className="recommend-button" onClick={handleRecommendClick}>
        Recommend
      </button>

      {/* Gender buttons appear only after "Recommend" is clicked */}
      {showGenderButtons && !isPopupVisible && (
        <div className="gender-selection">
          <button onClick={() => showPopup('Man')} className="gender-button man-button">
            Man
          </button>
          <button onClick={() => showPopup('Woman')} className="gender-button woman-button">
            Woman
          </button>
        </div>
      )}

      {/* Pop-up for the selected gender */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>You selected: {selectedGender}</h2>
            <button onClick={closePopup} className="close-button">Close</button>
            <button onClick={closePopup} className="Next-button">Next</button>
          </div>
        </div>
      )}

      <div className={`slide-out ${isSlideVisible ? 'visible' : ''}`}>
        <button className="close-button" onClick={handleCloseSlide}>Close</button>

        {activeContent === 'shirt' && (
          <div className="scroll-container">
            <button className="scroll-arrow" onClick={() => handleScroll('up')}>
              <img src="/up-arrow.png" alt="up arrow" />
            </button>
            <div className="scroll-content" ref={contentRef}>
              <img src="/shirt1.png" alt="Shirt 1" className="scroll-item" />
              <img src="/shirt2.png" alt="Shirt 2" className="scroll-item" />
              <img src="/sh.png" alt="Shirt 3" className="scroll-item" />
              {/* Add more shirt items here */}
            </div>
            <button className="scroll-arrow" onClick={() => handleScroll('down')}>
              <img src="/down-arrow.png" alt="down arrow" />
            </button>
          </div>
        )}

        {activeContent === 'pants' && (
          <div className="scroll-container">
            <button className="scroll-arrow" onClick={() => handleScroll('up')}>
              <img src="/up-arrow.png" alt="up arrow" />
            </button>
            <div className="scroll-content" ref={contentRef}>
              <img src="/pant1.png" alt="Pant 1" className="scroll-item" />
              <img src="/pant2.png" alt="Pant 2" className="scroll-item" />
              <img src="/pant3.png" alt="Pant 3" className="scroll-item" />
              {/* Add more pants items here */}
            </div>
            <button className="scroll-arrow" onClick={() => handleScroll('down')}>
              <img src="/down-arrow.png" alt="down arrow" />
            </button>
          </div>
        )}

        {activeContent === 'shoes' && (
          <div>
            <img src="/shoes-large.png" alt="Shoes" className="slide-image" />
            <p>Shoes content displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
