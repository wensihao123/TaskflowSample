import React, { Component } from "react";

class Controls extends Component {
  state = {
    name: "",
  };

  render() {
    return (
      <div className="control">
        <h1>Controls</h1>
        <input
          onChange={(e) => this.setState({ name: e.target.value })}
          value={this.state.name}
          data-testid="new-task-name-input"
        ></input>
        <button
          data-testid="create-task-btn"
          disabled={!this.state.name || this.state.name === ""}
          onClick={() => {
            this.props.add(this.state.name);
          }}
        >
          Create
        </button>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
          <input
            placeholder="Selected task name"
            className="selectBox"
            data-testid="selected-task-field"
            value={this.props.cursor.name}
            onChange={() => {}}
          ></input>
          <button
            onClick={() =>
              this.props.delete(this.props.cursor.stage, this.props.cursor.id)
            }
            disabled={this.props.cursor.name === ""}
            data-testid="delete-btn"
          >
            Delete
          </button>
          <button
            disabled={
              this.props.cursor.name === "" ||
              this.props.cursor.stage === "done"
            }
            onClick={() =>
              this.props.forward(this.props.cursor.stage, this.props.cursor.id)
            }
            data-testid="move-forward-btn"
          >
            Forward
          </button>
          <button
            disabled={
              this.props.cursor.name === "" ||
              this.props.cursor.stage === "backlog"
            }
            onClick={() =>
              this.props.backward(this.props.cursor.stage, this.props.cursor.id)
            }
            data-testid="move-back-btn"
          >
            Backward
          </button>
        </div>
      </div>
    );
  }
}

export default Controls;
