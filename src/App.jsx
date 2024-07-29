import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <div className="container">
      <header>Todo-App</header>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container-input">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        className="addBtn"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false); // 초기값은 false
  const screenShow = () => {
    setShow(show => !show);
  }

  return (
    <li>
      <input type="checkbox" className="checkbox" /> 

      {todo.content}

      <input
        className={show ? "show" : "none"} // 삼항연산자로 input 태그를 display에 보여질지 말지 표시
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button
        onClick={() => {
          screenShow() // 맨첨에 누르면 show-false였던 것이 show-true로 바뀐다
          if(show) { // show일 때만 적용시키기 조건문을 달지 않고 실행하면 처음 클릭시에 inputValue가 ""인 상태라서 todo.content가 바로 빈 문자열로 바뀜
            setTodoList((prev) =>
              prev.map((el) =>
                el.id === todo.id ? { ...el, content: inputValue } : el
              )
            );
          }
        }}
      >
        수정
      </button>

      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
