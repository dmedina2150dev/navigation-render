import { useContext } from "react";
import { NavigatorContext } from "../components/Router";

export const Contact = () => {
  const { navBackward } = useContext(NavigatorContext);

  return (
    <>
      <div>Contact</div>
      <br />
      <button onClick={() => navBackward}>Ir a About</button>
    </>
  );
};
