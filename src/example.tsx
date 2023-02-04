import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Sheet, { SheetProps } from "./index";

function Example() {
  const [state, setState] = useState(false);
  const handleSheetOpen = () => {
    setState(false);
  };
  const sheetProps: SheetProps = {
    isVisible: true,
    isEdge: true,
    initialPosition: "edge",
    sheetLimit: [10, 50],
  };

  return (
    <div className="App">
      <button onClick={() => setState(true)}>OPEN</button>
      <Sheet {...sheetProps}>
        asdasdsadsad
        <header className="App-header" style={{ height: "100vh" }}>
          <p>
            Edit <code>src/Example.js</code> and save to reload.
          </p>
        </header>
      </Sheet>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<Example />);
