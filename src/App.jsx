import { useState, useCallback, useEffect} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8); 
  const [number, setAllowNumber] = useState(false);
  const [char, setAllowChar] = useState(false);
  const [password, setPassword] = useState("");
  const [re, setRe] = useState(false);

  const regen = function regenrate(){
    setRe((prev) => !prev)
  }

  const generatePass = useCallback(()=>{
    let pass = ""
    let str= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(number) str += "0123456789"
    if(char) str += "!@#$%^&*()_-+=[]{}|;:"

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(index)
    }

    setPassword(pass);
  },[length, number, char, password])

  useEffect(()=>{
    generatePass();
  },[length, number, char, re])

  const copyToClip = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='h-screen w-full bg-black flex flex-wrap justify-center flex-row'>
        <div className='m-20 w-1/5 h-48 bg-slate-600 rounded-2xl'>
          <div className='flex flex-wrap justify-evenly py-3 px-0'>
            <input 
            className='px-3 py-2 rounded-2xl'
            type="text"
            placeholder='Password'
            value={password}
            readOnly
             />
            <button onClick={copyToClip} className='bg-blue-600 px-2 py-1 rounded-2xl'>copy</button>
          </div>
          <div className='flex flex-wrap justify-evenly py-3 px-0'>
            <input 
            className='px-0 py-1'
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e)=>{
              setLength(e.target.value)
            }}
            id = "range"
            />
            <label htmlFor="range" >Length : {length}</label>
          </div>
          <div className='px-3'>
            <input 
            type="checkbox"
            id='numberAllowed'
            className='mx-2'
            onChange={() => setAllowNumber((prev) => !prev)}
            />
            <label htmlFor="numberAllowed">NumberAllowed</label>
            <input 
            type="checkbox"
            id='charAllowed'
            className='mx-2'
            onChange={() => {
              setAllowChar((prev) => !prev)}
            }
            />
            <label htmlFor="charAllowed">CharAllowed</label>
          </div>
          <div className='flex justify-center p-4'>
            <button 
            className='bg-blue-600 px-2 rounded-2xl'
            onClick={regen}
            >Re-generate</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App