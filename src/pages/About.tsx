import { useContext, useState } from 'react'
import { NavigatorContext } from '../components/Router'


export const About = () => {
  const { navBackward } = useContext(NavigatorContext);
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div>About</div>
      <br />
      <span>Contador:</span> {counter}
      <br />
      <button onClick={() => setCounter(prev => prev += 1)}>+1</button>
      <br />
      <button onClick={navBackward}>Volver</button>
    </>
  )
}
