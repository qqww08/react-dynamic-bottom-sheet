import React, { useState } from "react";
import Sheet from "../../src";
import { ArgsTable, PRIMARY_STORY, Stories, Title } from "@storybook/addon-docs";
import { ComponentMeta } from "@storybook/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { defaultJsCode, defaultTsCode } from "../resources/code-mirror/default";
import { SheetProps } from "../../src/types";
import { customJsCode, customTsCode } from "../resources/code-mirror/custom";
import "../styles/main.css";

export default {
  title: "Sheet",
  component: Sheet,
  argTypes: {
    children: {
      name: "children",
      type: { name: "string", required: true },
      description: "JSX Components",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
      control: {
        type: null,
      },
    },
    isVisible: {
      name: "isVisible",
      defaultValue: false,
      type: { name: "boolean", required: true },
      description: "sheet가 열려 있는지 여부를 알려주는 props",
      table: {
        type: {
          summary: "Boolean",
        },
      },
      control: {
        type: null,
      },
    },
    defaultHeight: {
      name: "defaultHeight",
      defaultValue: 0.3,
      type: { name: "number", required: false },
      description:
        "sheet 기본 높이, 높이는 0.15 ~ 0.5 제한 입니다. 제한치를 넘을 경우 경고 문구와 함께 default value로 반환 됩니다.",
      table: {
        type: {
          summary: "Number",
        },
      },
      control: {
        type: "number",
      },
    },
    edgeHeight: {
      name: "edgeHeight",
      type: { name: "number", required: false },
      description:
        "edgeHeight 를 Props로 넘길 경우 sheet를 닫아도 가장자리에 Sheet가 닫히지 않고 남아 있습니다. 높이는 0 ~ 0.15 제한 입니다. 제한치를 넘을 경우 경고 문구와 함께 default value로 반환 됩니다.",
      table: {
        type: {
          summary: "Number or undefined",
        },
      },
      control: {
        type: "number",
      },
    },
    maxHeight: {
      name: "maxHeight",
      defaultValue: 0.9,
      type: { name: "number", required: false },
      description:
        "sheet 최대 높이, 높이는 0.5 ~ 1 제한 입니다. 제한치를 넘을 경우 경고 문구와 함께 default value로 반환 됩니다.",
      table: {
        type: {
          summary: "Number",
        },
      },
      control: {
        type: "number",
      },
    },
    initialPosition: {
      name: "initialPosition",
      defaultValue: "default",
      type: { name: "string", required: false },
      description: "시트가 열릴 때의 포지션 정의",
      table: {
        type: {
          summary: "default or max or edge",
        },
      },
      control: "select",
      options: ["default", "max", "edge"],
    },
  },
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    docs: {
      source: {
        code: null,
      },

      page: () => (
        <>
          <Stories title="" includePrimary />
          <Title>Props</Title>
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Sheet>;

export const Default = (arg) => {
  const [type, setType] = useState<"js" | "ts">("js");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  delete arg.children;
  delete arg.isVisible;

  const handleSheetOpenClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <button type="button" onClick={handleSheetOpenClick} style={{ marginBottom: "50px" }}>
        Sheet Open
      </button>
      <br />
      <div className="box">
        <div className="box">
          <button
            type="button"
            className={`button left-btn ${type === "js" ? "active" : ""}`}
            onClick={() => setType("js")}
          >
            JS
          </button>
          <button
            type="button"
            className={`button ${type === "ts" ? "active" : ""}`}
            onClick={() => setType("ts")}
          >
            TS
          </button>
        </div>
        <CodeMirror
          theme={"dark"}
          value={type === "js" ? defaultJsCode : defaultTsCode}
          height="400px"
          extensions={[javascript({ jsx: true })]}
        />
      </div>
      <Sheet isVisible={isVisible} onClose={() => setIsVisible(false)} {...arg} />
    </>
  );
};
export const Custom = (arg) => {
  const [type, setType] = useState<"js" | "ts">("js");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  delete arg.children;
  delete arg.isVisible;

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
    ...arg,
  };
  return (
    <>
      <button type="button" onClick={() => setIsVisible(true)} style={{ marginBottom: "50px" }}>
        Sheet Open
      </button>
      <button type="button" onClick={() => setIsVisible(false)}>
        Sheet Close
      </button>
      <div className="box">
        <div className="box">
          <button
            type="button"
            className={`button left-btn ${type === "js" ? "active" : ""}`}
            onClick={() => setType("js")}
          >
            JS
          </button>
          <button
            type="button"
            className={`button ${type === "ts" ? "active" : ""}`}
            onClick={() => setType("ts")}
          >
            TS
          </button>
        </div>
        <CodeMirror
          theme={"dark"}
          value={type === "js" ? customJsCode : customTsCode}
          height="750px"
          extensions={[javascript({ jsx: true })]}
        />
      </div>
      <Sheet {...sheetOptions} />
    </>
  );
};
