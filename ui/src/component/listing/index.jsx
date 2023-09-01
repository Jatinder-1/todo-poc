import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import config from "../../config";

const deleteTodo = async (id) => {
  try {
    const res = await fetch(`${config.apiUrl}/api/todo/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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

const updateTodo = async (item) => {
  try {
    const res = await fetch(`${config.apiUrl}/api/todo/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
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

const Listing = (p) => {
  const { todos } = p;
  const queryClient = useQueryClient();
  //const { data: todo } = useQuery(['todo']);

  const todoDeleteMutation = useMutation({
    mutationFn: (id) => {
      return deleteTodo(id);
    },
    onSuccess: () => {
      console.log("Success");
      // Invalidate and refetch
      queryClient.invalidateQueries(["todo"]);
    },
    onError: (err) => {
      console.log("Eroor", err);
    },
  });

  const todoUpdateMutation = useMutation({
    mutationFn: (item) => {
      return updateTodo(item);
    },
    onSuccess: (_, data) => {
      // update data without refacting from the API
      queryClient.setQueryData(["todo"], (oldData) => {
        let oldTodos = oldData.data;
        const itemIndex = oldTodos.findIndex((e) => e.id === data.id);

        oldTodos[itemIndex].isDone = data.status;
        return { message: "Data updated", data: oldTodos };
      });

      // Invalidate and refetch
      //queryClient.invalidateQueries(["todo"]);
    },
    onError: (err) => {
      console.log("Eroor", err);
    },
  });

  if (!todos.length) {
    return (
      <div className="flex justify-center m-t-5">
        <span>No item found!</span>
      </div>
    );
  }

  if (todoUpdateMutation.isLoading || todoDeleteMutation.isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="flex mb-4 items-center">
          <p
            className={`w-full text-grey-darkest ${
              todo.isDone && "line-through"
            }`}
          >
            {todo.text}
          </p>
          <button
            className="flex-no-shrink p-2 ml-4 mr-2 border-2 
              rounded hover:text-white text-green-500
               border-green-500 hover:bg-green-500 disabled:opacity-25"
            title={todo.isDone ? "undo" : "done"}
            disabled={todoUpdateMutation.isLoading}
            onClick={() =>
              todoUpdateMutation.mutate({ id: todo.id, status: !todo.isDone })
            }
          >
            {todo.isDone ? "Undo" : "Done"}
          </button>
          <button
            className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500
               border-red-500 hover:text-white hover:bg-red-500 disabled:opacity-25"
            title="delete"
            disabled={todoDeleteMutation.isLoading}
            onClick={() => todoDeleteMutation.mutate(todo.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </>
  );
};

export default Listing;
