import React from "react";
import ReactDOM from "react-dom/client";
import { Sheet } from "./index";
function Example() {
  return (
    <div className="App">
      <Sheet isVisible onClose={() => console.log(1)}>
        asd
      </Sheet>
      <header className="App-header">
        <p>
          Edit <code>src/Example.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<Example />);
