import { useGlobalState } from "./providers/StateProvider";
import Lockpicking from "./pages/lockpicking";
import Hacking from "./pages/hacking";
import Looting from "./pages/looting";
import Typewriter from "./pages/typewriter";
import PressureBar from "./pages/pressure";

function App() {
  const globalState = useGlobalState();

  function getTheCurrentPage() {
    if (globalState.currentPage == "lockpick") {
      return <Lockpicking {...globalState.pageData}/>
    }

    if (globalState.currentPage == "hacking") {
      return <Hacking {...globalState.pageData}/>
    }

    if (globalState.currentPage == "looting") {
      return <Looting {...globalState.pageData}/>
    }

    if (globalState.currentPage == "typewriter") {
      return <Typewriter {...globalState.pageData}/>
    }

    if (globalState.currentPage == "pressure") {
      return <PressureBar {...globalState.pageData}/>
    }

    return <></>
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center" style={{"background": "rgba(0, 0, 0, 0.4)"}}>
        {getTheCurrentPage()}
    </div>
  );
}

export default App;
