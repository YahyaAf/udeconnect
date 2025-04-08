import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Test() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('yahya')

  const incremment = () => { setCount((count) => count + 1) }
  const decremment = () => { setCount((count) => count - 1 )}
  const reset = () => { setCount(() => 0 )}
  const firstName = () => {setName((name) => `${name} afadisse`)}

  return (
    <>
      <div className="card">
        <button onClick={incremment}>
          incremment
        </button>
        <button onClick={decremment}>
          decremment
        </button>
        <button onClick={reset}>
          reset
        </button>
        <p>
            count is {count}
        </p>

        <p>{name}</p>
        <button onClick={firstName}>
          ajouter first name
        </button>
      </div>
    </>
  )
}

export default Test
