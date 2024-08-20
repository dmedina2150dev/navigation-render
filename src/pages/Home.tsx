import { useContext } from "react";
import { NavigatorContext } from "../components/Router";

export const Home = () => {
  const { navForward } = useContext(NavigatorContext);

  return (
    <>
      <div>Home</div>
      <br />
      <button onClick={() => navForward('about')}>Ir a About</button>
    </>
  );
};
