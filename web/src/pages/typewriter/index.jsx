import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import NumberBox from "../hacking/components/NumberBox";
import { fetchNui } from "@/src/utils/fetchNui";
import { useGlobalState } from "@/src/providers/StateProvider";
import playAudio from "@/src/utils/playAudio";

function createRandomizedArray(length) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomArray = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        randomArray.push(letters[randomIndex]);
    }

    return randomArray;
}

function Typewriter({count, completeTime}) {
  const globalState = useGlobalState();
  const currentTime = useRef(0);
  const currentNum = useRef(0);
  const [randomizedArray] = useState(
    createRandomizedArray(count)
  );
  const [progressValue, setProgressValue] = useState(100);

  useEffect(() => {
    currentTime.current = 0;
    setProgressValue(100);
    let interval = setInterval(() => {
      currentTime.current = currentTime.current + 100;
      if (currentTime.current >= completeTime) {
        if (currentNum.current < count) {
          fetchNui("failedTypewriter");
        }
        clearInterval(interval);
      } else {
        setProgressValue(100 - (currentTime.current / completeTime) * 100);
      }
    }, 100);

    function handler(event) {
      if (event.key.toUpperCase() == randomizedArray[currentNum.current]) {
        currentNum.current = currentNum.current + 1;

        if (currentNum.current == count) {
          fetchNui("successTypewriter");
          playAudio("complete");
        }
      } else {
        fetchNui("failedHacking");
        playAudio("error");
      }
    };

    window.addEventListener("keydown", handler)

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <div className="w-1/5 flex flex-col relative items-center">
      <div className="mb-4 text-base font-medium leading-none">{globalState.settings.locale.time_left}</div>
      <Progress value={progressValue} />
      <div className="w-full flex flex-row flex-wrap items-center justify-center mt-12 gap-4">
        {randomizedArray.map((x, index) => (
          <NumberBox
            key={index}
            visible={currentNum.current <= index}
            number={x}
          />
        ))}
      </div>
    </div>
  );
}

export default Typewriter;
