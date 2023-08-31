import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import config from "../../config";

const deleteTodo = (id) => {  
    fetch(`${config.apiUrl}/api/todo/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id}),
    });
};

const updateTodo = (item) => {  
  fetch(`${config.apiUrl}/api/todo/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

const Listing = (p) => {
  const { todos } = p;
  const queryClient = useQueryClient();

  const todoDeleteMutation = useMutation({
    mutationFn: (id) => {
     return deleteTodo(id)
    },
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries(["todo"]);
    },
    onError: (err) => {
      console.log("Eroor", err);
    },
  });

  const todoUpdateMutation = useMutation({
    mutationFn: (item) => {
     return updateTodo(item)
    },
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries(["todo"]);
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

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="flex mb-4 items-center">
          <p className={`w-full text-grey-darkest ${todo.isDone && 'line-through'}`}>{todo.text}</p>
          <button
            className="flex-no-shrink p-2 ml-4 mr-2 border-2 
              rounded hover:text-white text-green-500
               border-green-500 hover:bg-green-500"
            title={todo.isDone ? "undo" : "done"}
            onClick={() => todoUpdateMutation.mutate({id: todo.id, status: !todo.isDone})}
          >
            Done
          </button>
          <button
            className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500
               border-red-500 hover:text-white hover:bg-red-500"
            title="delete"
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
