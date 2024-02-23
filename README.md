
![test](https://user-images.githubusercontent.com/62181345/207508460-45777460-64f2-44f9-afc1-4a2fdad4e909.gif)
### Installation
```shell
# With npm
npm install react-dynamic-bottom-sheet

# With yarn
yarn add react-dynamic-bottom-sheet

# With pnpm
pnpm install react-dynamic-bottom-sheet
```
### Usage  
```tsx
import Sheet from "react-dynamic-bottom-sheet";
import { useState } from 'react';

function Example() {
  const [isOpen, setOpen] = useState<boolean>(false);
  // 시트가 열립니다
  // 해당 시트 포지션으로 시트가 열립니다.
  const handleSheetOpen = () => {
      setOpen(true);
  };

    const handleSheetClose = () => {
        setOpen(false);
    };
  return (
    <>
      <button onClick={() => handleSheetOpen()}>Open sheet</button>
      <Sheet isVisible={isOpen} onClose={()=>handleSheetClose()}>
         <Your_Component/>
      </Sheet>
    </>
  );
}
```


### Edge Sheet
![ezgif-4-0e1680939e](https://user-images.githubusercontent.com/62181345/207778374-0e74f104-1967-413b-a301-24e1677832c5.gif)

```tsx
// Edge Sheet Example
import React from "react";
import Sheet, { type SheetProps } from "./index";
function Example() {
    const sheetProps: SheetProps = {
        isVisible: true,
        isEdge: true,
        initialPosition: "edge",
        sheetLimit: [10, 50],
    };
    
    return (
        <div className="App" style={{ background: "#ccc", height: "100vh" }}>
            <Sheet {...sheetProps}>
                <YOUR_COMPONENT>
            </Sheet>
        </div>
    );
}
```
### Props

| Prop           | Type                  | Required? | Default Value | Description                                                                                                                        |
| -------------- |-----------------------|-----------|---------------|------------------------------------------------------------------------------------------------------------------------------------|
| children      | `ReactNode`           | o         | -             |                                                                                                                                    |
| isVisible        | `boolean`             | o         | false         | sheet가 열려 있는지 여부를 알려주는 props                                                                                                       |
| defaultHeight        | `number`              | x         | 0.3           | sheet 기본 높이, 높이는 0.15 ~ 0.5 제한 입니다. 제한치를 넘을 경우 경고 문구와 함께 default value로 반환 됩니다.                                                    |
| edgeHeight        | `number or undefined` | x          | -             | edgeHeight 를 Props로 넘길 경우 sheet를 닫아도 가장자리에 Sheet가 닫히지 않고 남아 있습니다. 높이는 0 ~ 0.15 제한 입니다. 제한치를 넘을 경우 경고 문구와 함께 default value로 반환 됩니다. |
| maxHeight        | `number`              | x         | 0.9           | sheet 최대 높이, 높이는 0.5 ~ 1 제한 입니다. 제한치를 넘을 경우 경고 문구와 함께 default value로 반환 됩니다.                                                       |
| onClose        | `function`            | x         | -             | sheet 가 닫혔을 때의 callback function                                                                                                   |
| onStart        | `function`            | x         | -             | sheet 에 touch(pointer)가 시작 되었을떄의 callback function                                                                                 |
| onMove       | `function`            | x         | -             | sheet 가 움직일 떄의 callback function                                                                                                   |
| onEnd          | `function`            | x         | -             | sheet 에 touch(pointer)가 끝났을 때의 callback function                                                                                   |
| initialPosition  | `default or max`      | x         | "default"     | 시트가 열릴 때의 포지션 정의                                                                                                                   |
| sheetLimit  | `[number.number]`     | x         | "[15,50]"     | 0 번의 index는 닫히는 위치 입니다. isEdge 가 true 일 경우 Edge 컴포넌트 위치 입니다.1 번의 index는 defaultHeight 와 maxHeight 중간값을 정하는 값 입니다.                  |
| isEdge  | `boolean`             | x         | -             | Sheet Edge Components 여부                                                                                                           |
| classname  | `string`              | x         | -             | classname 재활당                                                                                                                      |

### Theming
```css
.sheet-portal{
    
}

.sheet-container{

}

.sheet-header{

}

.sheet-scroll{

}
```
### License
MIT
