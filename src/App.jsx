import { useEffect } from "react";
import "./App.scss";
import "@fontsource/caveat/500.css";
import "@fontsource/caveat/700.css";
import Experience from "./Experience/Experience";
import IntroScreen from "./components/IntroScreen/IntroScreen";
import Panel from "./components/Panel/Panel";
import { useUI } from "./store";

function App() {
  const ready = useUI((s) => s.ready);
  const setReady = useUI((s) => s.setReady);

  // cutout textures are drawn with the handwriting font, so wait for it
  useEffect(() => {
    Promise.all([document.fonts.load("700 80px Caveat"), document.fonts.load("500 80px Caveat")])
      .catch(() => {})
      .finally(setReady);
  }, [setReady]);

  return (
    <>
      <IntroScreen />
      {ready && <Experience />}
      <Panel />
    </>
  );
}

export default App;
