import React from "react";
import Modal from "react-modal";

import "./TodoStyle.css";
import Plus from "../Images/plus.svg";
import Bars from "../Images/bars.svg";
import emptyIcon from "../Images/empty.svg";

import Todo from "./Todo";
export default class TodoItems extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };
  }
  setModalIsOpen = (status) => {
    this.setState({
      modalIsOpen: status
    });
  };
  render() {
    const { modalIsOpen } = this.state;
    const {
      todoItems,
      filterByStatus,
      onKeyUp,
      newItem,
      onChange,
      onClickRemove,
      onClickCompleteHandle
    } = this.props;
    if (todoItems.length > 0) {
      return (
        <div className="container">
          <div className="header">
            <img className="icon" src={Bars} alt=" " height={10} width={10} />
            <div className="title">DAILIST</div>
          </div>

          <div className="upcoming">
            <div className="label">UPCOMING</div>

            {/* Filter through status of item */}
            {todoItems.length &&
              filterByStatus(todoItems, "ACTIVE").map((item, index) => (
                <Todo
                  index={index}
                  key={item.id}
                  item={item}
                  onClickRemove={onClickRemove}
                  onClickCompleteHandle={onClickCompleteHandle}
                />
              ))}
          </div>
          <div className="finished">
            <div className="label">FINISHED</div>
            {todoItems.length &&
              filterByStatus(todoItems, "COMPLETED").map((item, index) => (
                <Todo
                  index={index}
                  item={item}
                  key={item.id}
                  onClickRemove={onClickRemove}
                />
              ))}
          </div>
          {/* Set Modal when button is clicked */}
          <div className="add">
            <img
              src={Plus}
              alt=""
              onClick={() => this.setModalIsOpen(true)}
            ></img>
          </div>
          <Modal
            className="modal"
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => this.setModalIsOpen(false)}
            ariaHideApp={false}
            style={{
              overlay: {
                backgroundColor: "rgba(50, 170, 184, 1)"
              }
            }}
          >
            <div class="header">
              <input
                type="text"
                placeholder="Add a task"
                onKeyUp={onKeyUp}
                value={newItem}
                onChange={onChange}
              />
            </div>
          </Modal>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="header">
            <img className="icon" src={Bars} alt=" " height={10} width={10} />
            <div className="title">DAILIST</div>
          </div>

          <div className="empty">
            <img src={emptyIcon} alt="" height={140} width={140}></img>
            <div className="content_empty">Nothing todo...</div>
          </div>

          <div className="add">
            <img
              src={Plus}
              alt=""
              onClick={() => this.setModalIsOpen(true)}
            ></img>
          </div>
          <Modal
            className="modal"
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => this.setModalIsOpen(false)}
            ariaHideApp={false}
            style={{
              overlay: {
                backgroundColor: "rgba(50, 170, 184, 1)"
              }
            }}
          >
            <div class="header">
              <input
                type="text"
                placeholder="Add a task"
                onKeyUp={onKeyUp}
                value={newItem}
                onChange={onChange}
              />
            </div>
          </Modal>
        </div>
      );
    }
  }
}
