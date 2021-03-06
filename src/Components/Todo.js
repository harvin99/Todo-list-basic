import React from "react";

import "./TodoStyle.css";
import checkIcon from "../Images/check.svg";
import cancelIcon from "../Images/cancel.svg";
import classNames from "classnames";

export default class Todo extends React.Component {
  render() {
    const { item, index, onClickRemove, onClickCompleteHandle } = this.props;
    if (!item.isCompleted) {
      return (
        <div
          className={classNames("item", { done: item.isCompleted === true })}
        >
          <div className="content">
            {index + 1}. {item.title}
          </div>
          <div className="icon_group">
            <img
              src={checkIcon}
              alt=""
              height={10}
              width={10}
              onClick={() => onClickCompleteHandle(item.id)}
            ></img>
            <img
              src={cancelIcon}
              alt=""
              height={10}
              width={10}
              onClick={() => onClickRemove(item.id)}
            ></img>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={classNames("item", { done: item.isCompleted === true })}
        >
          <div className="content">
            {index + 1}. {item.title}
          </div>
          <div className="icon_group">
            <img
              src={cancelIcon}
              alt=""
              height={10}
              width={10}
              onClick={() => onClickRemove(item.id)}
            ></img>
          </div>
        </div>
      );
    }
  }
}
