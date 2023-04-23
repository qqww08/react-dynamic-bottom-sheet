import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Sheet, { SheetProps } from "./index";

function Example() {
  const [state, setState] = useState(false);

  const sheetProps: SheetProps = {
    isVisible: state,
    onClose: () => {
      setState(false);
    },
  };

  return (
    <div className="App">
      <button onClick={() => setState(true)}>OPEN</button>
      <Sheet {...sheetProps}>
        <div />
      </Sheet>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<Example />);
