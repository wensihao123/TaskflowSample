import React, { Component } from "react";
import "./App.css";

import Controls from "./components/Controls";
import Board from "./components/Board";

class App extends Component {
  constructor(props) {
    super(props);
    let stages = { backlog: [], todo: [], ongoing: [], done: [] };
    if (props.predefinedTasks) {
      stages = {
        backlog: props.predefinedTasks[0].map((name, index) => ({
          name,
          id: "0" + index.toString(),
        })),
        todo: props.predefinedTasks[1].map((name, index) => ({
          name,
          id: "1" + index.toString(),
        })),
        ongoing: props.predefinedTasks[2].map((name, index) => ({
          name,
          id: "2" + index.toString(),
        })),
        done: props.predefinedTasks[3].map((name, index) => ({
          name,
          id: "3" + index.toString(),
        })),
      };
    }
    this.state = {
      cursor: { stage: "", id: "", name: "" },
      stages,
    };
  }

  add = (name) => {
    const stages = this.state.stages;
    const newStages = Object.assign({}, stages, {
      backlog: [...stages.backlog, { name, id: Date.now().toString() }],
    });
    this.setState({ stages: newStages });
  };

  delete = (stage, id) => {
    const curStage = this.state.stages[stage];
    const newStages = Object.assign({}, this.state.stages, {
      [stage]: curStage.filter((item) => item.id !== id),
    });
    this.setState({
      stages: newStages,
      cursor: { stage: "", id: "", name: "" },
    });
  };

  readCursor = (stage, id, name) => {
    console.log(stage, id, name);
    this.setState({ cursor: { stage, id, name } });
  };

  backward = (stage, id) => {
    const nextStageName = (() => {
      switch (stage) {
        case "backlog":
          return "backlog";
        case "todo":
          return "backlog";
        case "ongoing":
          return "todo";
        default:
          return "ongoing";
      }
    })();
    if (stage === nextStageName) return;
    const temp = this.state.stages[stage].find((stage) => stage.id === id);
    const curStage = this.state.stages[stage];
    const newStages = Object.assign({}, this.state.stages, {
      [stage]: curStage.filter((item) => item.id !== id),
      [nextStageName]: this.state.stages[nextStageName].concat(temp),
    });
    this.setState({
      stages: newStages,
      cursor: { stage: nextStageName, id, name: temp.name },
    });
  };

  forward = (stage, id) => {
    const nextStageName = (() => {
      switch (stage) {
        case "backlog":
          return "todo";
        case "todo":
          return "ongoing";
        case "ongoing":
          return "done";
        default:
          return "done";
      }
    })();
    if (stage === nextStageName) return;
    const temp = this.state.stages[stage].find((stage) => stage.id === id);
    const curStage = this.state.stages[stage];
    const newStages = Object.assign({}, this.state.stages, {
      [stage]: curStage.filter((item) => item.id !== id),
      [nextStageName]: this.state.stages[nextStageName].concat(temp),
    });
    this.setState({
      stages: newStages,
      cursor: { stage: nextStageName, id, name: temp.name },
    });
  };

  render() {
    return (
      <div className="App">
        <Controls
          add={this.add}
          delete={this.delete}
          cursor={this.state.cursor}
          forward={this.forward}
          backward={this.backward}
        />
        <Board stages={this.state.stages} readCursor={this.readCursor} />
      </div>
    );
  }
}

export default App;
