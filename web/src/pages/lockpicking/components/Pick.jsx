import { useState, useEffect, useRef } from "react";

const REQUIRED_ACCURACY = 40;

function GenerateRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function Pick({pickID, isActive, success, failed, EVENT_STEP}) {
    const required = useRef(GenerateRandomValue(5 + REQUIRED_ACCURACY, 190));
    const [Ypos, setYpos] = useState(0);
    const shouldDrop = useRef(true);
    const arrowPressed = useRef(false); 
    const pickRef = useRef(undefined);
    const spacePressed = useRef(false);

        useEffect(() => {
            if (!isActive) return;
            function handleKeyDown(e) {
                if (e.key == "ArrowUp") {
                    if(!arrowPressed.current) {
                        shouldDrop.current = false;
                    }
                    arrowPressed.current = true;
                }

                if(e.key == " ") {
                    if(!spacePressed.current)  {
                        if(Ypos <= required.current + REQUIRED_ACCURACY && Ypos >= required.current - REQUIRED_ACCURACY) {
                            success(pickID);
                        } else {
                            failed();
                        }
                        spacePressed.current = true;
                    }
                }
            }

            function handleKeyUp(e) {
                if (e.key == "ArrowUp") {
                    if(arrowPressed.current) {
                        shouldDrop.current = true;
                    }
                    arrowPressed.current = false;
                }

                if(e.key == " ") {
                    if(spacePressed.current) {
                        spacePressed.current = false
                    }
                }
            }

            const interval = setInterval(() => {
                if(shouldDrop.current) {
                    setYpos(currentValue => {
                        if (currentValue - EVENT_STEP <= 0) return 0;
                        return currentValue - EVENT_STEP;
                    });
                }

                if (arrowPressed.current) {
                    setYpos(currentValue => {
                        if (currentValue + EVENT_STEP >= 190) return 190;
                        return currentValue + EVENT_STEP;
                    });
                }
            }, 10);
        
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
        
            // Don't forget to clean up
            return function cleanup() {
              document.removeEventListener('keydown', handleKeyDown);
              document.removeEventListener('keyup', handleKeyUp);
              clearInterval(interval);
            }
        }, [Ypos, isActive]);

    const getBackgroundColor = () => {
        if(Ypos <= required.current + REQUIRED_ACCURACY && Ypos >= required.current - REQUIRED_ACCURACY) {
            return "bg-green-500";
        }

        return isActive ? "bg-slate-700" : "bg-slate-200";
    }

    return (
        <div className="h-full w-12 flex flex-col justify-between items-center">
            <div className="h-8 w-12 bg-white" />
            <div 
                ref={pickRef}
                className={`h-20 w-8 ${getBackgroundColor()} rounded relative` }
                style={{bottom: `${Ypos}px`}}
            />
        </div>
    )
}
  
export default Pick;