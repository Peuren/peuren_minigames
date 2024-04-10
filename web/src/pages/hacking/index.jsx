import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import NumberBox from "./components/NumberBox";
import { fetchNui } from "@/src/utils/fetchNui";
import { useGlobalState } from "@/src/providers/StateProvider";
import playAudio from "@/src/utils/playAudio";

function createRandomizedArray(number) {
  const array = Array.from({ length: number }, (_, i) => i + 1);

  for (let i = number - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Hacking({count, rememberTime, completeTime}) {
  const globalState = useGlobalState();
  const currentTime = useRef(0);
  const currentNum = useRef(0);
  const [randomizedArray] = useState(
    createRandomizedArray(count)
  );
  const [numbersVisible, setNumbersVisible] = useState(true);
  const [progressValue, setProgressValue] = useState(100);

  useEffect(() => {
    currentTime.current = 0;
    setProgressValue(100);
    let interval;
    if (numbersVisible) {
      interval = setInterval(() => {
        currentTime.current = currentTime.current + 100;
        if (currentTime.current >= rememberTime) {
          setNumbersVisible(false);
        } else {
          setProgressValue(100 - (currentTime.current / rememberTime) * 100);
        }
      }, 100);
    } else {
      interval = setInterval(() => {
        currentTime.current = currentTime.current + 100;
        if (currentTime.current >= completeTime) {
          if (currentNum.current < count) {
            fetchNui("failedHacking");
          }
          clearInterval(interval);
        } else {
          setProgressValue(100 - (currentTime.current / completeTime) * 100);
        }
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [numbersVisible]);

  const handleNumberClick = (number) => {
    if (number - 1 == currentNum.current) {
        currentNum.current = currentNum.current + 1;
    } else {
        playAudio("error");
        fetchNui("failedHacking");
    }

    if(currentNum.current >= count) {
        playAudio("complete");
        fetchNui("successHacking");
    }
  }

  return (
    <div className="w-96 flex flex-col relative items-center">
      <div className="mb-4 text-base font-medium leading-none">{globalState.settings.locale.time_left}</div>
      <Progress value={progressValue} />
      <div className="w-full flex flex-row flex-wrap items-center justify-center mt-12 gap-4">
        {randomizedArray.map((x, index) => (
          <NumberBox
            key={index}
            visible={numbersVisible || currentNum.current >= x}
            number={x}
            onClick={handleNumberClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Hacking;
