import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password).then(() => {
      setCopiedMessage('Copied!');

      // Clear the message after a delay (e.g., 1500 milliseconds)
      setTimeout(() => {
        setCopiedMessage('');
      }, 1500);
    });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  useEffect(() => {
    const handleCopy = () => {
      setCopiedMessage('Copied!');
    };

    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return (
    <div className="App">
      <div className="flex min-h-screen justify-center">
        <div className="w-max">
          <h1 className="text-7xl text-center text-white mt-20 font-mono font-bold animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5">
            PASSWORD GENERATOR
          </h1>
          <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600 text-black text-base h-52">
            <input
              className="w-80 h-10 rounded-md border-2 border-gray-700 bg-white shadow-md text-base font-semibold text-gray-700 px-2 outline-none focus:border-blue-500 mt-16"
              type="text"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyToClipBoard}
              type="button"
              className="outline-none bg-blue-700 text-white px-3 py-0.5 h-10 rounded-md border-2"
            >
              Copy
            </button>
            <div>{copiedMessage}</div>
            <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input 
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e) => {setLength(Number(e.target.value))}} // Convert to Number
                />
                <label>Length: {length}</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="numberInput">Numbers</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={() => {
                    setCharAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="characterInput">Characters</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
