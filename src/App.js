import React from "react";

import "./styles.css";

import TodoItems from "./Components/TodoItems";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      todoItems: [
        { id: 1, title: "Learing", isCompleted: true },
        { id: 2, title: "Eating", isCompleted: false },
        { id: 3, title: "Shopping", isCompleted: true }
      ],
      status: "ALL"
    };
  }
  filterByStatus = (todos = [], status = "", id = "") => {
    switch (status) {
      case "ACTIVE":
        return todos.filter((item) => !item.isCompleted);
      case "COMPLETED":
        return todos.filter((item) => item.isCompleted);
      case "REMOVE":
        return todos.filter((item) => item.id !== id);
      default:
        return todos;
    }
  };
  onKeyUp = (event) => {
    let text = event.target.value;
    if (!text) return;
    text = text.trim();
    if (!text) return;
    if (event.keyCode === 13) {
      this.setState({
        newItem: "",
        todoItems: [
          {
            id: Date.now(),
            title: text,
            isCompleted: false
          },
          ...this.state.todoItems
        ]
      });
    }
  };
  onChange = (event) => {
    this.setState({
      newItem: event.target.value
    });
  };
  completeHandle = (id = "") => {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isCompleted: true
          };
        }
        return item;
      })
    });
  };
  onClickRemove = (id = "") => {
    const { todoItems } = this.state;
    this.setState({
      todoItems: this.filterByStatus(todoItems, "REMOVE", id)
    });
  };
  render() {
    const { todoItems, newItem } = this.state;
    return (
      <div className="App">
        <TodoItems
          todoItems={todoItems}
          filterByStatus={this.filterByStatus}
          onKeyUp={this.onKeyUp}
          newItem={newItem}
          onChange={this.onChange}
          onClickRemove={this.onClickRemove}
          onClickCompleteHandle={this.completeHandle}
        />
      </div>
    );
  }
}

// Requirements:
// Viết một app todo-list có giao diện như hình https://cdn.glitch.com/780fd861-6c5c-464f-8b1b-c3c0ed64e30a%2FPasted_Image_4_20_20__9_05_PM.png?v=1587384320345
// Không cần phải giống 100%, nhưng càng giống càng tốt và phải có tính thẩm mỹ
// Illustration có thể tải ở đây https://undraw.co/illustrations hoặc các nguồn khác và upload lên Glitch assets
// Cần làm:
// - Màn hình danh sách todo list, nếu trống thì hiển thị một hình nào đó như trong ảnh
// - Khi ấn nút + để tạo todo mới thì hiển thị modal có chứa 1 text input và nút để add
// - Khi ấn vào 1 item thì sẽ toggle trạng thái isDone của nó
// - Nếu isDone là true thì cho vào danh sách Finished, còn không thì ở Upcoming
