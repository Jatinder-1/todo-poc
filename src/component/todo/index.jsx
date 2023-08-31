import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Listing from "../listing";
import config from "../../config";

const createTodo = async (title) => {
  try {
    const res = await fetch(`${config.apiUrl}/api/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (data?.status === "error") {
      throw new Error(data?.error);
    }

    return data;
  } catch (err) {
    throw new Error(err || "Some thing went worng");
  }
};

const Header = (p) => {
  const [userInput, setUserInput] = useState("");
  const queryClient = useQueryClient();

  const todoMutation = useMutation({
    mutationFn: () => {
      return createTodo(userInput);
    },
    onSuccess: () => {
      console.log("Success");
      setUserInput("");
      // Invalidate and refetch
      queryClient.invalidateQueries(["todo"]);
    },
    onError: (err) => {
      console.log("Eroor", err);
    },
  });

  const addTodo = (e) => {
    e.preventDefault();
    const task = userInput.trim();
    if (task) {
      todoMutation.mutate();
      // setUserInput("")
    }
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      todoMutation.mutate();
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
            onChange={(e) => setUserInput(e.target.value)}
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
  const { data, isLoading } = useQuery(
    ["todo"],
    async () => (await fetch(`${config.apiUrl}/api/todos`)).json(),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <span
        className="bg-white rounded shadow p-6 m-5 mt-12 
            w-full lg:w-3/4 lg:max-w-lg flex justify-center"
      >
        Loading...
      </span>
    );
  }

  return (
    <>
      <div className="bg-white rounded shadow p-6 m-5 mt-12 w-full lg:w-3/4 lg:max-w-lg">
        <Header />
        <Listing todos={data?.data || []} />
      </div>
    </>
  );
};

export default Todo;
