export const defaultJsCode = `import React, { useState } from "react";
import Sheet from "react-dynamic-bottom-sheet";

const SheetExample = () => {
const [isVisible, setIsVisible] = useState(false);

const handleSheetOpenClick = () => {
  setIsVisible(true);
};

return (
    <>
      <button type="button" onClick={handleSheetOpenClick}>
        Sheet Open
      </button>
      <Sheet isVisible={isVisible} onClose={() => setIsVisible(false)} /> 
    </>
  )
}
`;

export const defaultTsCode = `import React, { useState } from "react";
import Sheet from "react-dynamic-bottom-sheet";

const SheetExample = () => {
const [isVisible, setIsVisible] = useState<boolean>(false);

const handleSheetOpenClick = () => {
  setIsVisible(true);
};

return (
    <>
      <button type="button" onClick={handleSheetOpenClick}>
        Sheet Open
      </button>
      <Sheet isVisible={isVisible} onClose={() => setIsVisible(false)} /> 
    </>
  )
}
`;
