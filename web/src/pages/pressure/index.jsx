import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchNui } from "@/src/utils/fetchNui";

function PressureBar({breakLine}) {
    const [progressState, setProgressState] = useState(0);
    const spacePressed = useRef(false);
    const timeSinceLastCheck = useRef(new Date());

    useEffect(() => {
        function handleKeyDown(e) {
            if (spacePressed.current) return;;
            if (e.key == " ") {
                spacePressed.current = true;
                fetchNui("windPressureValue");
            }
        }

        function handleKeyUp(e) {
            if (!spacePressed.current) return;
            if (e.key == " ") {
                spacePressed.current = false;
                fetchNui("unwindPressureValue");
            }
        }

        const interval = setInterval(() => {
            if (spacePressed.current) {
                if (progressState >= breakLine) {
                    if (new Date() - timeSinceLastCheck.current > 1000) {
                        timeSinceLastCheck.current = new Date();

                        const breakChance = ((progressState - breakLine) / (100 - breakLine)) * 100;
                        const chance = Math.floor(Math.random() * (100 + 1));
                        if (chance < breakChance) {
                            fetchNui("breakPressure");
                            document.removeEventListener('keydown', handleKeyDown);
                            document.removeEventListener('keyup', handleKeyUp);
                            clearInterval(interval);
                        }
                    }
                }

                if (progressState + 1.25 <= 100) {
                    setProgressState(prev => prev + 1.25);
                }
            } else {
                if (progressState - 1.25 >= 0) {
                    setProgressState(prev => prev - 1.25);
                }
            }

        }, 25);
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
          clearInterval(interval);
        }
    }, [progressState]);

    return <div className=" absolute bottom-12 p-4 rounded-lg flex flex-col gap-4 justify-center items-center">
        <div className="flex justify-start items-center gap-2">
            <Button variant="outline" className="w-16 h-10">
                SPACE
            </Button>
        </div>
        <div className={`w-80 h-5 rounded-md shadow-xl relative bg-gradient-to-r from-green-500 via-${100 - breakLine}% to-red-900`}>
            <div className="h-full w-2 rounded-md bg-primary absolute" style={{"left": `${progressState}%`}}></div>
        </div>
    </div>
}

export default PressureBar;