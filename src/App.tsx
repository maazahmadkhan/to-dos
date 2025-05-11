import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const LOCAL_STORAGE_KEY = "todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    localStorage.getItem(LOCAL_STORAGE_KEY)
      ? (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as any) as Todo[])
      : []
  );
  const [input, setInput] = useState("");

  const onChangeTodos = (todos: Todo[]) => {
    setTodos(todos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  };

  const addTodo = () => {
    if (!input.trim()) return;
    onChangeTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    onChangeTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    onChangeTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-0 md:p-6">
      <div className="w-full md:max-w-md mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-2xl font-bold text-center mb-4">📝 To-Dos</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-grow border rounded px-3 py-2 outline-none"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center gap-4 p-3 border rounded ${
                todo.completed ? "bg-green-100 line-through" : "bg-gray-50"
              }`}
            >
              <span
                className="flex-grow cursor-pointer"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                className="text-red-500 hover:text-red-700 ml-4"
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
