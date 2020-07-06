import React from "react";


const Board = ({ stages, readCursor}) => {
  console.log(stages);
  return (
    <div className='board'>
      <h1>Kanban board</h1>
      <div className='listWrapper'>
        {Object.entries(stages).map(([key, value], index) => {
          return (
            <div key={key} data-testid={`stage-${index}`}>
              <h1>{key}</h1>
              <div>
                {value.map((item) => (
                  <div data-testid={`task-${item.name.split(' ').join('-')}`}className='TaskBox' key={item.id} onClick={()=>readCursor(key, item.id, item.name)}>{item.name}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
