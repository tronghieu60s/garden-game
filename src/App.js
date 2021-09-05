import React, { useState, useEffect } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden";
import SendBack from "./components/SendBank";
import Glove from "./components/Tools/Glove";
import Shovel from "./components/Tools/Shovel";
import plants from "./constants/plants";
import { objectToArray, isEmptyObject } from "./helpers/commonFunctions";

const plantsList = objectToArray(plants);

export default function App() {
  const [coinBankVal, setCoinBankVal] = useState(500); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);

  const [isGetGlove, setIsGetGlove] = useState(false);
  const [isGetShovel, setIsGetShovel] = useState(false);

  useEffect(() => {
    // block dragging of images
    window.ondragstart = () => false;

    // sound track
    // const soundtrack = new Audio("./assets/sounds/soundtrack.mp3");
    // soundtrack.loop = true;
    // soundtrack.load();
    // soundtrack.play();
  }, []);

  const handleSetPlant = (index) => {
    // check plant exists and selected
    if (!choosePlant) {
      return alert("Vui lòng chọn cây cần trồng trước.");
    }
    if (!isEmptyObject(plants[index])) {
      return alert("Cây đã được trồng, vui lòng chọn ô khác.");
    }

    // price action
    const coinPrice = coinBankVal - choosePlant.purchasePrice;
    if (coinPrice < 0) {
      return alert("Bro không có đủ tiền. Hãy nạp lần đầu đi bro!!!");
    }
    setCoinBankVal(coinPrice);

    // set plants
    const newPlants = [...plants];
    newPlants[index] = choosePlant;
    setPlants(newPlants);
    setChoosePlant(null);

    // play sound plant
    const soundPlant = new Audio("./assets/sounds/plant.ogg");
    soundPlant.play();
  };

  const handleDeletePlant = (index) => {
    // delete plants
    const newPlants = [...plants];
    newPlants[index] = {};
    setPlants(newPlants);
  };

  return (
    <div className="gd-container">
      <div className="gd-container-game">
        <SendBack
          coinBankVal={coinBankVal}
          plants={plantsList}
          choosePlant={choosePlant}
          setChoosePlant={(plant) =>
            setChoosePlant(plant === choosePlant ? null : plant)
          }
        />
        <Garden
          plants={plants}
          choosePlant={choosePlant}
          setPlant={handleSetPlant}
          deletePlant={handleDeletePlant}
        />
        <CoinBank coinBankVal={coinBankVal} />
        <div>
          <Glove isGetGlove={isGetGlove} setIsGetGlove={setIsGetGlove} />
          <Shovel isGetShovel={isGetShovel} setIsGetShovel={setIsGetShovel} />
        </div>
      </div>
    </div>
  );
}
