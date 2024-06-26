import { useState } from "react";
import AddGameModal from "./addGameModal.jsx";
import style from "./addGameModal.module.css";
import GameList from "./game-list/GameList.jsx";

const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  return (
    <div className={style.modalButtonContainer}>
      {isModalVisible && <AddGameModal setModalVisible={setModalVisible} />}
      <GameList />
    </div>
  );
};

export default App;
