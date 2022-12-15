import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Sheet from "./index";
function Example() {
  const [state, setState] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setState(true)}>asd</button>
      <Sheet isVisible edgeHeight={0.15} onClose={() => setState(false)} initialPosition={"edge"}>
        asdasdsadsad
      </Sheet>
      <header className="App-header">
        <p>
          Edit <code>src/Example.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<Example />);
