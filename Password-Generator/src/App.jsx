import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState("");

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz";
    if (allowNumber) {
      str += "0123456789";
    }
    if (allowChar) {
      str += "~!@#$%^&*(){}";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, allowNumber, allowChar, setPassword]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowChar, allowNumber, passwordGenerator]);

  return (
    <div className="bg-white w-full max-w-lg rounded-lg px-4 py-3 my-36 mx-auto shadow-2xl shadow-slate-500 ">
      <h1 className="text-black text-center my-3 mb-4 text-3xl font-semibold">
        Password Generator
      </h1>
      <div className="flex mb-4 rounded-lg shadow overflow-hidden">
        <input
          type="text"
          value={password}
          ref={passwordRef}
          placeholder="Password"
          className="outline-none w-full py-2 px-3 rounded-l-xl"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="text-white bg-blue-600 rounded-r-xl py-1 px-3 outline-none shrink-0 active:scale-105"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-6 ">
        <div className="flex items-center gap-x-2 text-black">
          <input
            type="range"
            min={1}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label> Length: {length}</label>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            defaultChecked={allowNumber}
            id="numberInput"
            onChange={() => {
              setAllowNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            defaultChecked={allowChar}
            id="charInput"
            onChange={() => {
              setAllowChar((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
