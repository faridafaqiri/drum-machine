import React, { useState, useEffect } from 'react';
import './App.css';

const drumPadsBank1 = [
  { key: 'Q', id: 'Heater-1', src: '/audio/sound-1.mp3' },
  { key: 'W', id: 'Heater-2', src: '/audio/sound-2.mp3' },
  { key: 'E', id: 'Heater-3', src: '/audio/sound-3.mp3' },
  { key: 'A', id: 'Heater-4', src: '/audio/sound-4.mp3' },
  { key: 'S', id: 'Clap', src: '/audio/sound-5.mp3' },
  { key: 'D', id: 'Open-HH', src: '/audio/sound-6.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', src: '/audio/sound-7.mp3' },
  { key: 'X', id: 'Kick', src: '/audio/sound-8.mp3' },
  { key: 'C', id: 'Closed-HH', src: '/audio/sound-9.mp3' },
];

const drumPadsBank2 = [
  { key: 'Q', id: 'Heater-1', src: '/audio/sound-1.mp3' },
  { key: 'W', id: 'Heater-2', src: '/audio/sound-2.mp3' },
  { key: 'E', id: 'Heater-3', src: '/audio/sound-3.mp3' },
  { key: 'A', id: 'Heater-4', src: '/audio/sound-4.mp3' },
  { key: 'S', id: 'Clap', src: '/audio/sound-5.mp3' },
  { key: 'D', id: 'Open-HH', src: '/audio/sound-6.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', src: '/audio/sound-7.mp3' },
  { key: 'X', id: 'Kick', src: '/audio/sound-8.mp3' },
  { key: 'C', id: 'Closed-HH', src: '/audio/sound-9.mp3' },
];

function App() {
  const [display, setDisplay] = useState('');
  const [powerOn, setPowerOn] = useState(true);
  const [currentBank, setCurrentBank] = useState(drumPadsBank1);
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState(null);

  const playSound = (key, id) => {
    if (!powerOn) return; // Do nothing if power is off

    const audio = document.getElementById(key);
    if (audio) {
      if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
      }

      audio.currentTime = 0; // Reset playback time
      audio.play().catch(error => {
        console.error("Error playing sound:", error);
      });

      setCurrentlyPlayingAudio(audio);
      setDisplay(id);
    }
  };

  const handleKeyPress = (event) => {
    const pad = currentBank.find(d => d.key === event.key.toUpperCase());
    if (pad) {
      playSound(pad.key, pad.id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentBank, powerOn]);

  const togglePower = () => {
    setPowerOn(prev => !prev);
    if (powerOn) setDisplay('');
  };

  const toggleBank = () => {
    setCurrentBank(prev => 
      prev === drumPadsBank1 ? drumPadsBank2 : drumPadsBank1
    );
    setDisplay('');
  };

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pads">
        {currentBank.map(pad => (
          <div
            key={pad.id}
            className="drum-pad"
            id={pad.id}
            onClick={() => playSound(pad.key, pad.id)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </div>
        ))}
      </div>
      <div className="controls">
        <div className="control">
          <span>Power</span>
          <div className="toggle-switch" onClick={togglePower}>
            {powerOn ? 'On' : 'Off'}
          </div>
        </div>
        <div className="control">
          <span>Volume</span>
          <input type="range" min="0" max="100" />
        </div>
        <div className="control">
          <span>Bank</span>
          <div className="toggle-switch" onClick={toggleBank}>
            {currentBank === drumPadsBank1 ? 'Bank 1' : 'Bank 2'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
