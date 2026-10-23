import { useState, useEffect } from 'react'
import './App.css'

const ASCII_Control_KEY = {
  Backspace: 8,
  Tab: 9,
  Enter: 13,
  Escape: 27
};

function getAsciiInfo(pressedKey) {
  if(
    Object.prototype.hasOwnProperty.call((
      ASCII_Control_KEY,
      pressedKey)
    )
  ){
    return{
      key : pressedKey,
      asciiCode: ASCII_Control_KEY[pressedKey],
      description:  `ASCII control code for ${pressedKey}.`,
  };
  }
  if(pressedKey.length === 1){
    const code = pressedKey.charCodeAt(0);
    if(code <= 127){
      return{
        key: pressedKey,
        asciiCode: code,
        description: 
          code >= 32 && code <= 126
            ? "Printable ASCII character."
            : "ASCII control character.",
      };
    return{
      key: pressedKey,
      asciiCode: Null,
      description: "Character is outside the ASCII standard (0-127)."
    }  
      
    }
  }
   return {
    key: pressedKey,
    asciiCode: null,
    description:
      "This is a special key, not a single ASCII character.",
  };
}

function KeyDisplay({keyInfo}){
  const keyLabel = !keyInfo ? "?"
      : keyInfo.key === " " ? "space"
        :keyInfo.key;

  return(
    <section className='result-card' aria-live='polite'>
      <p className='card-label'>Last key pressed</p>
      <div className='keycap'>
        {keyLabel}
      </div>
      <p className='card-description'>{keyInfo ? "Detected from your keyboard."
          : "Press any key to begin."}</p>
    </section>
  );
}

function AsciiDisplay({ keyInfo}){
  const hasAsciiCode = keyInfo != null && keyInfo.asciiCode != null;
  return(
    <section className='result-card' aria-live='polite'>
      <p className='card-label'>ASCII DECIMAL</p>
      <div>
        {hasAsciiCode ? keyInfo.asciiCode : "_"}
      </div>
      <p className='card-description'>
        {keyInfo ? keyInfo.description : 'your ascii value appear here'}
      </p>
    </section>
  )
}

export default function App() {
  const [keyInfo, setKeyInfo] = useState(null);

  useEffect(() => {
    function handleKeyDown(event) {
      const info = getAsciiInfo(event.key);
      setKeyInfo(info);
    }

    window.addEventListener("keydown", handleKeyDown);

    // Remove the listener when this component is unmounted.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="page-shell">
      <div className="converter">
        <header className="hero">
          <p className="eyebrow">
            <span className="status-dot"></span>
            KEYBOARD PLAYGROUND
          </p>

          <h1>
            ASCII <span>Converter</span>
          </h1>

          <p className="intro">
            Press any key on your keyboard and discover
            its ASCII value instantly.
          </p>
        </header>

        <div className="result-grid">
          <KeyDisplay keyInfo={keyInfo} />
          <AsciiDisplay keyInfo={keyInfo} />
        </div>

        <section className="examples">
          <p className="examples-label">QUICK EXAMPLES</p>

          <div className="example-list">
            <span>A → 65</span>
            <span>a → 97</span>
            <span>0 → 48</span>
            <span>Space → 32</span>
          </div>
        </section>

        <p className="footnote">
          Standard ASCII contains codes from 0 to 127.
          Some special keys do not represent ASCII characters.
        </p>
      </div>
    </main>
  );
}