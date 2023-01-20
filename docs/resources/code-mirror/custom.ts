export const customJsCode = `import React, { useState } from "react";
import Sheet from "react-dynamic-bottom-sheet";
  
const SheetExample = () => {
const [isVisible, setIsVisible] = useState(false);

const handleSheetOpenClick = () => {
  setIsVisible(true);
};

const sheetOptions = {
  children: <div>Storybook Example</div>,
  isVisible,
  defaultHeight: 0.4,
  edgeHeight: 0.1,
  maxHeight: 1,
  onClose: () => {
    console.log("Close!!!");
  },
  onStart: () => {
    console.log("Start!!!");
  },
  onMove: () => {
    console.log("Move!!!!");
  },
  onEnd: () => {
    console.log("End!!!!");
  },
  initialPosition: "max",
};

return (
    <>
      <button type="button" onClick={handleSheetOpenClick}>
      Sheet Open
      </button>
      <Sheet {...sheetOptions} isVisible={isVisible} /> 
    </>
  )
}
  `;

export const customTsCode = `import React, { useState } from "react";
import Sheet, { type SheetProps } from "react-dynamic-bottom-sheet";
    
const SheetExample = () => {
const [isVisible, setIsVisible] = useState<boolean>(false);

const handleSheetOpenClick = () => {
  setIsVisible(true);
};

const sheetOptions: SheetProps = {
  children: <div>Storybook Example</div>,
  isVisible,
  defaultHeight: 0.4,
  edgeHeight: 0.1,
  maxHeight: 1,
  onClose: () => {
    console.log("Close!!!");
  },
  onStart: () => {
    console.log("Start!!!");
  },
  onMove: () => {
    console.log("Move!!!!");
  },
  onEnd: () => {
    console.log("End!!!!");
  },
  initialPosition: "max",
};

return (
    <>
      <button type="button" onClick={handleSheetOpenClick}>
      Sheet Open
      </button>
      <Sheet {...sheetOptions} isVisible={isVisible} /> 
    </>
  )
}
    `;
