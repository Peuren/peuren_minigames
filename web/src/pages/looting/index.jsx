import { useState } from "react";
import ItemBox from "./components/ItemBox";
import { fetchNui } from "@/src/utils/fetchNui";
import playAudio from "@/src/utils/playAudio";

function TransformItemList(itemList, size) {
  console.log("ITEMLIST", itemList)
  console.log(typeof itemList);
  const arr = Array.from(Array(size.x * size.y)).map((x, index) => {
    if (itemList[index + 1]) {
      return {
        item: itemList[index + 1].item,
        amount: itemList[index + 1].amount,
        searched: false,
        pickedUp: false,
      };
    } else {
      return {
        item: undefined,
        amount: undefined,
        searched: false,
        pickedUp: false,
      };
    }
  });

  console.log(arr)
  return arr;
}

function Looting({ itemList, timeToLoot, size }) {
  const [items, setItems] = useState(() => {
    return TransformItemList(itemList, size);
  });

  const [isSearching, setSearching] = useState(false);

  const startSearching = () => {
    setSearching(true);
  };

  const finishedSearching = (index) => {
    setItems((prevItems) => {
      prevItems[index].searched = true;
      return prevItems;
    });
    setSearching(false);
  };

  const pickupItem = async (index) => {
    playAudio("pickup");
    const state = await fetchNui(
      "lootItem",
      { index: index + 1, item: items[index] },
      true
    );
    if (!state) return;
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].pickedUp = true;
      return newItems;
    });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className={`grid rounded-xl border-2 border-input`}
        style={{
          "width": `${9 * size.x}rem`,
          "height": `${9 * size.y}rem`,
          "gridTemplateColumns": `repeat(${size.y}, minmax(0, ${size.y}fr))`,
          "gridTemplateRows": `repeat(${size.x}, minmax(0, ${size.x}fr))`,
        }}
      >
        {items.map((item, index) => (
          <ItemBox
            key={index}
            index={index}
            item={item}
            isSearching={isSearching}
            startSearching={startSearching}
            finishedSearching={finishedSearching}
            pickupItem={pickupItem}
            timeToLoot={timeToLoot}
            size={size}
          >
            ?
          </ItemBox>
        ))}
      </div>
    </div>
  );
}

export default Looting;
