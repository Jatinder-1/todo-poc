const Listing = (p) => {
  const { todos, updateTask, deleteTask } = p;
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
            <p className="w-full text-grey-darkest">title={todo.text}</p>
            <button
              className="flex-no-shrink p-2 ml-4 mr-2 border-2 
              rounded hover:text-white text-green-500
               border-green-500 hover:bg-green-500"
              title={todo.isDone ? "undo" : "done"}
              onClick={() => updateTask({ id: todo.id })}
            >
              Done
            </button>
            <button
              className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500
               border-red-500 hover:text-white hover:bg-red-500"
              title="delete"
              onClick={() => deleteTask({ id: todo.id })}
            >
              Remove
            </button>
          </div>
      ))}
    </>
  );
};

export default Listing;
