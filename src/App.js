import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap'; // bootstrap 컴포넌트
import 'bootstrap/dist/css/bootstrap.min.css';

// 할일 항목 랜더링 컴포넌트
function Todo({ todo, index, markTodo, removeTodo, restoreTodo }) {
  return (
    <div
      className="todo"
    >
      {/* 완료된 항목의 텍스트에 취소선 추가 */}
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div>
        {!todo.isDone ? (
            <>
              {/* 완료 항목과 삭제 버튼 */}
              <Button variant="outline-success" onClick={() => markTodo(index)}>
                ✓
              </Button>{' '}
              <Button variant="outline-danger" onClick={() => removeTodo(index)}>
                ✕
              </Button>
            </>
        ) : (
            <Button variant="outline-warning" onClick={() => restoreTodo(index)}>
              recovery
            </Button>
        )}
      </div>
    </div>
  );
}

// 할일 추가 Form 컴포넌트
function FormTodo({ addTodo, toggleShowCompleted, showCompleted }) {
  const [value, setValue] = React.useState(""); // 입력 필드의 상태 관리

  const handleSubmit = e => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (!value) return; // 빈칸 입력 방지
    addTodo(value); // 할일 항목 추가
    setValue(""); // 입력 필드 초기화
  };

  // 입력값 초기화 (Cancel 버튼 함수)
  const handleCancel = () => {
    setValue("");
  }

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group>
      {/* 입력 필드 레이블 */}
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)} // 입력값 변경 시 상태 업데이트
          placeholder="Add new todo"
      />
    </Form.Group>

      {/* 제출 버튼(파란색) */}
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button> {' '}

      {/* 취소 버튼, 공백 추가(회색) */}
      <Button variant="secondary mb-3" type="button" onClick={handleCancel}>
        Cancel
      </Button> {' '}

      {/* 완료된 항목 표시, 숨기기 버튼 */}
      <Button variant="secondary mb-3" type="button" onClick={toggleShowCompleted}>
        {showCompleted ? "Hide" : "Show"}
      </Button>
  </Form>
  );
}

// 메인 App 컴포넌트
function App() {
  // 초기 할일 항목 설정
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      isDone: false
    }
  ]);

  // 완료 항목
  const [showCompleted, setShowCompleted] = React.useState(true);

  // 할일 항목 추가 함수
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  // 할일 항목 완료 처리 함수 (V)
  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  // 할일 항목 삭제 함수 (X)
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // 할일 항목 복원 함수 (완료 -> 미완료)
  const restoreTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = false;
    setTodos(newTodos);
  }


  return (
    <div className="app">
      <div className="container">
        {/* 제목 */}
        <h1 className="text-center mb-4">Todo List</h1>
        {/* 완료한 일 숨기기, 보이기 기능 구현 */}
        <FormTodo addTodo={addTodo}
        toggleShowCompleted={() => setShowCompleted(!showCompleted)}
        showCompleted={showCompleted}/> {/* 할일 추가 폼*/}

        <div>
          {todos
              // 완료된 항목 표시 여부
              .filter(todo => !todo.isDone || showCompleted)
              .map((todo, index) => ( // 반복 렌더링
            <Card>
              <Card.Body>
                <Todo
                    key={index}
                    index={index}
                    todo={todo} // 각 항목 전달
                    markTodo={markTodo} // 완료 처리 함수 전달
                    removeTodo={removeTodo} // 삭제 처리 함수 전달
                    restoreTodo={restoreTodo}

                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;