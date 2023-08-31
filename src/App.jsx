import Todo from "./component/todo";

function App() {
  return (
    <>
      <div className='p-1 bg-slate-100 min-h-[100vh]'>
        <div className="h-100 w-full flex items-center justify-center 
          bg-teal-lightest font-sans">
          <Todo />
        </div>
      </div>
    </>
  );
}

export default App;
