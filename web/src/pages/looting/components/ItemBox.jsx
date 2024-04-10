import { useState } from "react";
import { Button } from "@/components/ui/button";
import RadialProgress from "./radialProgress";
import { isEnvBrowser } from "@/src/utils/misc";
import { useGlobalState } from "@/src/providers/StateProvider";
import { Hand } from "lucide-react";
import playAudio from "@/src/utils/playAudio";

function ItemBox({
  index,
  item,
  isSearching,
  startSearching,
  finishedSearching,
  pickupItem,
  timeToLoot,
  size
}) {
  const [searchProgress, setSearchProgress] = useState(-1);
  const globalState = useGlobalState();
  const getButtonStyle = (index) => {
    if (index == (size.x * size.y - size.x)) {
      return "w-full h-full text-xl rounded-none rounded-bl-xl";
    }

    if (index == (size.x - 1)) {
      return "w-full h-full text-xl  rounded-none rounded-tr-xl";
    }
    return "w-full h-full text-xl  rounded-none first:rounded-tl-xl last:rounded-br-xl";
  };

  const getImageSource = (itemName) => {
    if (isEnvBrowser()) {
      return "/mockitem.png";
    } else {
      return `https://cfx-nui-${globalState.settings.imageSource}/${itemName}.png`;
    }
  };

  const getWhichChildToDraw = () => {
    if (item.pickedUp) return;
    if (item.searched && item.item)
      return (
        <div className="group w-full h-full flex justify-center items-center relative">
          <img
            src={getImageSource(item.item)}
            className="group-hover:blur-sm"
          />
          <span className="absolute bottom-0 right-0 text-sm text-muted-foreground group-hover:blur-sm">
            {item.amount}
          </span>
          <Hand className="absolute invisible group-hover:visible" size={48} />
        </div>
      );
    if (item.searched) return <></>;
    if (searchProgress > 0) return <RadialProgress progress={searchProgress / timeToLoot * 100} />;
    return "?";
  };

  const handleClick = () => {
    if (isSearching) return;
    if (!item.searched) {
      startSearching(true);
      playAudio("searching", 0.35, timeToLoot);
      let timePassed = 0;
      const interval = setInterval(() => {
        timePassed += 10;
        setSearchProgress(curr => curr += 10);
        if (timePassed >= timeToLoot) {
          finishedSearching(index);
          clearInterval(interval);
        }
      }, 10);
      return;
    } else {
      if (!item.item || item.pickedUp) return;

      pickupItem(index);
    }
  };

  return (
    <Button
      key={index}
      className={getButtonStyle(index)}
      item={item}
      variant="outline"
      onClick={handleClick}
    >
      {getWhichChildToDraw()}
    </Button>
  );
}

export default ItemBox;
