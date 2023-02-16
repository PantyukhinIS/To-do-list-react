import React from "react";
import "./ToDoItem.css";

const ToDoItem  = props => {
    const strikethroughText = {
        textDecoration: "line-through"
    }
    return (
        <div className="todo-item">
            <input 
                type="checkbox"
                className="checkbox"
                onChange={props.handleChange}
                defaultChecked={props.completed}
            />
            <p  className="description"
                style={props.completed ? strikethroughText : {}}
            >
                {props.description}
            </p>
            <button className="btn-delete" onClick={props.handleDelete}>X</button>
        </div>
    )
}

export default ToDoItem;