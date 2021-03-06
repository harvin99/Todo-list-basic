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
// Vi???t m???t app todo-list c?? giao di???n nh?? h??nh https://cdn.glitch.com/780fd861-6c5c-464f-8b1b-c3c0ed64e30a%2FPasted_Image_4_20_20__9_05_PM.png?v=1587384320345
// Kh??ng c???n ph???i gi???ng 100%, nh??ng c??ng gi???ng c??ng t???t v?? ph???i c?? t??nh th???m m???
// Illustration c?? th??? t???i ??? ????y https://undraw.co/illustrations ho???c c??c ngu???n kh??c v?? upload l??n Glitch assets
// C???n l??m:
// - M??n h??nh danh s??ch todo list, n???u tr???ng th?? hi???n th??? m???t h??nh n??o ???? nh?? trong ???nh
// - Khi ???n n??t + ????? t???o todo m???i th?? hi???n th??? modal c?? ch???a 1 text input v?? n??t ????? add
// - Khi ???n v??o 1 item th?? s??? toggle tr???ng th??i isDone c???a n??
// - N???u isDone l?? true th?? cho v??o danh s??ch Finished, c??n kh??ng th?? ??? Upcoming
