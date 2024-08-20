import { useContext, memo } from "react";
import { NavigatorContext } from "../components/Router";


const Home = memo(
function Home () {
  const { navForward } = useContext(NavigatorContext);

  return (
    <>
      <div>Home</div>
      <br />
      <button onClick={() => navForward('about')}>Ir a About</button>
    </>
  );
});

export default Home;
