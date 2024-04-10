import { useState } from "react";
import Spacer from "./components/Spacer";
import Pick from "./components/Pick";
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button";
import { fetchNui } from "@/src/utils/fetchNui";
import { useGlobalState } from "@/src/providers/StateProvider";

function Lockpicking({pickCount, eventStep}) {
  const globalState = useGlobalState();
  const [currentPick, setCurrentPick] = useState(0);
  const failedPicking = () => {
    fetchNui("failedPicking");
  };

  const succesfullyPicked = async (pickID) => {
    if (pickID >= pickCount - 1) {
      setCurrentPick(-1);
      fetchNui("finishedPicking");
    } else {
      setCurrentPick(prev => prev + 1);
    }
  };
  
  return (
    <div className="h-96 flex flex-col relative items-center">
      <div className="h-full flex flex-row">
        {
          Array.from(Array(pickCount)).map((x, index) => 
          <>
            <Spacer/>
            <Pick 
              pickID={index}
              isActive={currentPick == index} 
              success={succesfullyPicked}
              failed={failedPicking}
              EVENT_STEP={eventStep}
            />
          </>)
        }
        <Spacer />
      </div>
      <div className="w-full h-6 flex bg-white mt-12"/>
      <div className="absolute w-screen h-12 flex flex-row justify-center items-center gap-12" style={{bottom: "-70px"}}>
        <div className="flex flex-row justify-center items-center gap-4">
          <Button variant="outline">
            <ArrowUp />
          </Button>
          <p className="text-sm font-medium leading-none">{globalState.settings.locale.arrow_key}</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <Button variant="outline">
            SPACE
          </Button>
          <p className="text-sm font-medium leading-none">{globalState.settings.locale.space_key}</p>
        </div>
      </div>
    </div>
  );
}

export default Lockpicking;
