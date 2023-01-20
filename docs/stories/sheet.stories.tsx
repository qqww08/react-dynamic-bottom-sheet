import React, { useState } from "react"

import { Meta, Story, Canvas, ArgsTable } from "@storybook/addon-docs";
import Sheet from "react-dynamic-bottom-sheet";

export default {
  title: "Sheet",
  component: Sheet,
}
export const Default = () => {
  const [isVisbile, setisVisbile] = useState<boolean>(false)
  return (
    <>
      <button type="button" onClick={()=> setisVisbile(true)}>Open</button>
      <Sheet isVisible initialPosition={"edge"}>a</Sheet>
    </>
  );
};