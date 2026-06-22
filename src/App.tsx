import {
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import { PercentCalc } from "./domains/calculator/pages/percent-calc";
import { PageLayout } from "./shared/layout/PageLayout";
import { useContext, useEffect } from "react";
import { Flip, toast, ToastContainer } from "react-toastify";
import { ThemeContext } from "./common/contexts/theme.context";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

const CHEAT_CODE = "DUMBMODE";
let currentInput = "";

const onKeypress = (e: KeyboardEvent) => {
  currentInput += e.key;

  // Check if the current input ends with the cheat code
  if (currentInput.toUpperCase().endsWith(CHEAT_CODE)) {
    toast(window.dumbMode ? "Dumb mode off" : "Dumb mode on");
    // Add your cheat code logic here
    window.dumbMode = !window.dumbMode; // Example: Activate dumb mode
    currentInput = ""; // Reset the input
  }

  // Keep only the last 5 characters (length of CHEAT)
  if (currentInput.length > CHEAT_CODE.length) {
    currentInput = currentInput.slice(-CHEAT_CODE.length);
  }
};

function App() {
  const { themeMode } = useContext(ThemeContext);

  useEffect(() => {
    window.dumbMode = false;
    document.addEventListener("keypress", onKeypress);

    return () => document.removeEventListener("keypress", onKeypress);
  }, []);

  return (
    <>
      <HashRouter>
        {/* @TODO: normal router */}
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<PercentCalc />} />
          </Route>
        </Routes>
      </HashRouter>
      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme={themeMode}
        transition={Flip}
      />
    </>
  );
}

export default App;
