import { useState } from "react";
import Listing from "../listing";

const Header = (p) => {
  const addTodo = () => {
    const task = p.text.trim();
    if (task) {
      //dispatch(addTask({ text: p.text || "" }));
      p.setText("");
    }
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      //dispatch(addTask({ text: p.text || "" }));
      p.setText("");
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-grey-darkest text-xl font-bold">Todo List</h2>
        <div className="flex mt-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 
              px-3 mr-4 text-grey-darker"
            name="addTodo"
            placeholder="Add new item"
            value={p.text}
            onChange={(e) => p.setText(e.target.value)}
            onKeyDown={handleEnterPress}
          />
          <button
            onClick={addTodo}
            className="flex-no-shrink p-2 border-2 rounded text-teal-500
             border-teal-500 hover:text-white hover:bg-teal-500"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

const Todo = () => {
  const [userInput, setUserInput] = useState("");

  return (
    <>
      <div className="bg-white rounded shadow p-6 m-5 mt-12 w-full lg:w-3/4 lg:max-w-lg">
        <Header setText={setUserInput} text={userInput} />
        <Listing
          todos={[
            { id: 1, text: "Nope-----" },
            { id: 2, text: "Bla bla bla" },
            { id: 3, text: "Do this task" },
          ]}
          useState
          setUserInput
        />
      </div>
    </>
  );
};

export default Todo;
