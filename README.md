
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
import { Sheet } from "react-dynamic-bottom-sheet";
import { useState } from 'react';

function Example() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open sheet</button>
      <Sheet isVisible={isOpen} onClose={()=>setOpen(false)}>
         <Your_Component/>
      </Sheet>
    </>
  );
}
```

### Methods and properties
```tsx
import { Sheet, type DrawerRefProps} from "react-dynamic-bottom-sheet";
import { useState } from 'react';

function Example() {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<DrawerRefProps>(null);
  
  // 시트가 열립니다
  const handleDrawerOpen = () => {
      ref.current.onOpen()
  }
  
  // 시트가 닫힙니다
  const handleDrawerClose = () => {
      ref.current.onClose()
  }
  // 해당 시트 포지션으로 시트가 열립니다.
  const handleDrawerChange = () => {
      ref.current.positionTo("max") // default or max
  }
  console.log(ref.current.isVisible); // sheet open 여부
  console.log(ref.current.maxHeight); // maxHeight 
  console.log(ref.current.defaultHeight); // defaultHeight
  
  return (
    <>
      <button onClick={() => handleDrawerOpen()}>SHEET OPEN</button>
      <button onClick={() => handleDrawerClose()}>SHEET CLOSE</button>
      <button onClick={() => handleDrawerClose()}>SHEET POSITION CHANGE</button>
      <Sheet isVisible={isOpen} onClose={()=>setOpen(false)}>
        <Your_Component/>
      </Sheet>
    </>
  );
}
```
### Props

| Prop           | Type             | Required? | Default Value | Description                                       |
| -------------- |------------------|-------|---------------|---------------------------------------------------|
| children      | `ReactNode`      | o     | -             |                                                   |
| isVisible        | `boolean`        | o     | -             | sheet가 열려 있는지 여부를 알려주는 props                      |
| defaultHeight        | `number`         | x     | 0.3           | sheet 기본 높이, 높이는 0.15 ~ 0.5 제한 입니다.               |
| maxHeight        | `number`         | x     | 0.9           | sheet 최대 높이, 높이는 0.5 ~ 1 제한 입니다.                  |
| onClose        | `function`       | x     | -             | sheet 가 닫혔을 때의 callback function                  |
| onStart        | `function`       | x     | -             | sheet 에 touch(pointer)가 시작 되었을떄의 callback function |
| onMove       | `function`       | x     | -             | sheet 가 움직일 떄의 callback function                  |
| onEnd          | `function`         | x     | -             | sheet 에 touch(pointer)가 끝났을 때의 callback function  |
| initialPosition  | `default or max` | x         | "default"     | 시트가 열릴 때의 포지션 정의                                  |



### License
MIT
