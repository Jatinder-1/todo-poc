import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Todo from "./component/todo";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="p-1 bg-slate-100 min-h-[100vh]">
          <div
            className="h-100 w-full flex items-center justify-center 
          bg-teal-lightest font-sans"
          >
            <Todo />
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
