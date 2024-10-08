import { useState, useRef, useEffect } from "react";
import axios from "axios";
import style from "../addGameModal.module.css";

const AddGameModal = ({
  setModalVisible,
  updateGameData,
  selectedGameNames,
  mainGameNameToi,
  selectedGameID,
}) => {
  const [inputs, setInput] = useState([]);
  const [mainGameName, setMainGameName] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    setInput(selectedGameNames);
    setMainGameName(mainGameNameToi);
  }, []);

  const handleMainGameNameChange = (e) => {
    setMainGameName(e.target.value);
  };

  const addInput = () => {
    setInput((prevInput) => [...prevInput, { id: Date.now(), value: "" }]);
  };

  const removeInput = (id) => {
    setInput((prevInputs) => prevInputs.filter((input) => input.id !== id));
    inputRefs.current.splice(inputRefs.length, 1);
  };

  const handleInputChange = (id, newValue) => {
    setInput((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/games/${selectedGameID}`
      );

      const game = response.data;

      await axios.put(`http://localhost:3000/games/${selectedGameID}`, {
        ...game,
        mainName: mainGameName,
      });

      const updateAdditionalGames = inputs.map((input) => ({
        name: input.value,
        status: input.status ? input.status : "none",
        time: input.time ? parseInt(input.time) : parseInt(0),
        numberOfEps: input.numberOfEps
          ? parseInt(input.numberOfEps)
          : parseInt(0),
      }));
      console.log(updateAdditionalGames);

      if (updateAdditionalGames.length !== 0) {
        await axios.put(`http://localhost:3000/games/${selectedGameID}`, {
          ...game,
          additionalGames: updateAdditionalGames,
        });
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса игры: ", error);
    }

    updateGameData();
    setModalVisible(false);
  };

  const cancelConirm = () => {
    setInput([]);
    setMainGameName("");
    setModalVisible(false);
  };

  useEffect(() => {
    if (
      inputRefs.current.length > 0 &&
      inputRefs.current[inputRefs.current.length - 1]
    ) {
      inputRefs.current[inputRefs.current.length - 1].focus();
    }
  }, [inputs.length]);

  return (
    <div className={style.modal}>
      <input
        id="mainGameName"
        placeholder="Main game name"
        value={mainGameName}
        className={style.mainGameName}
        onChange={handleMainGameNameChange}
      />
      <div className={style.moreGames}>
        {inputs.map((input, index) => (
          <div key={input.id} style={{ display: "flex", alignItems: "center" }}>
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              placeholder={`Game ${index + 1}`}
              value={input.value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
            />
            <button
              onClick={() => removeInput(input.id)}
              className={style.removeInput__button}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button onClick={addInput} className={style.addInput__button}>
        + add more game
      </button>
      <div className={style.modalButtons}>
        <button
          onClick={handleConfirm}
          className={style.addInput__button + " " + style.confirmButton}
        >
          Confirm
        </button>
        <button
          onClick={cancelConirm}
          className={style.addInput__button + " " + style.cancelButton}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddGameModal;
