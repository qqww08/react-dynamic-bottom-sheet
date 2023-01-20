import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Sheet from "./index";
function Example() {
  const [state, setState] = useState(false);
  return (
    <div className="App">
      <Sheet isVisible onClose={() => setState(false)} edgeHeight={0.1}>
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
