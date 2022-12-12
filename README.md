![da2b8967-2dbe-455b-a07e-1dafb2bf6941](https://user-images.githubusercontent.com/62181345/149617448-d98c2f8f-3a75-4371-8eca-eca5b3819df1.gif)

* [Getting Started](#getting-started)
* [Basic Usage](#basic-usage)
* [Props](#props)
* [License](#license)

## Getting Started

You can install the module via `npm`

```sh
npm install react-payment-keypad
or
yarn add react-payment-keypad
```



### Description
사용하기 쉬운 Payment PIN 번호 입력 컴포넌트 


### Basic Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import ReactPaymentKeypad from "react-payment-keypad";

ReactDOM.render(
    <ReactPaymentKeypad
        isVisible
        emptyPassword={false}
        onClose={() => null}
        className={"password"}
        onFinish={(password) => console.log(password)}
        onPassConfirm={(pass) => console.log(pass)}
        shuffle={"always"}
    />,
    document.getElementById("root")
);


```
### Custom Usage
```js
import ReactPaymentKeypad, { PaymentKeypadProps } from "react-payment-keypad";
import React, { useState } from "react";

const Example = () => {
  const [visible, setVisible] = useState(false);

  const setting: PaymentKeypadProps = {
    // {Required} keypad 사용 여부 입니다.
    isVisible: visible,
    // {Optional} emptyPassword true 일 경우 패스워드를 2번 입력 하도록 변경
    emptyPassword: true,
    // {Optional}  패스워드 화면을 꽉 채웁니다
    full: true,
    // {Optional} 패스워드를 입력 하는 횟수를 정하는 props 입니다
    count: 6,
    // {Optional} 에러 메세지 props 입니다.
    errorMessage: "패스워드가 일치 하지 않습니다.",
    // {Optional} 메세지 커스텀을 위한 props 입니다.
    messages: [
      "패스워드를 입력 해주세요.",
      "사용할 패스워드를 설정 해주세요",
      "다시 한번 입력해 주세요.",
    ],
    /**
     *  숫자 키패드 정렬 props 입니다.
     * - always 키패드 클릭 시 항상 패드를 재정렬 합니다.
     * - fixed 숫자 순서 그대로 정렬 합니다.
     * - once 키패드 입력 전 한번 랜덤으로 정렬 합니다.
     * */
    shuffle: "always",
    /**
     *   전체삭제 버튼 커스텀을 위한 props 입니다.
     *   @example
     *    deleteAllIcon: <img src="/image/icon.png"/> or "전체삭제"
     * */
    deleteAllIcon: "전체 삭제버튼",
    /**
     * 삭제 버튼 커스텀을 위한 props 입니다.
     *  @example
     *    deleteAllIcon: <img src="/image/icon.png"/> or "삭제"
     * */
    deleteIcon: "삭제버튼",
    // {Required} keypad close func
    onClose: () => {
      setVisible(false);
    },
    // {Required} keypad 입력 후 패스워드 결과 값이 나오는 func
    onFinish: (password) => {
      console.log(password);
    },
    // {Optional} emptyPassword true 일 경우 패스워드 결과 값이 return 되는 func
    onPassConfirm: (password) => {
      console.log(password);
    },
  };

  return <ReactKeypad {...setting} />;
};

export default Example;

```

### 새 창으로 열어서 패스워드를 받아와야 하는 경우

#### ${your_domain}/main
```js
import { usePaymentOpener } from "react-payment-keypad";

const Main = () => {
  const { password, onPaymentOpen } = usePaymentOpener();
  console.log(password); // passwrod callback
  
  const handleOpen = () =>{
    onPaymentOpen("/payment", { width:600, height:700 })
  }
  
  return (
    <div>
      <button onClick={handleOpen}>Payment Open!</button>    
    </div>
  );
};

export default Main;
```
#### ${your_domain}/payment
```js
import ReactPaymentKeypad from "react-payment-keypad";

const Payment = () => {
  return <ReactPaymentKeypad opener={true} />
};

export default Payment;
```
## Props

| Prop           | Type                        | Required? | Default Value | Description                                       |
| -------------- |-----------------------------| --------- | ------------- |---------------------------------------------------|
| isVisible      | `boolean`                   | Optional  | -             | keypad 사용 여부 입니다.                                 |
| onClose        | `function`                  | Optional  | -             | keypad close func                                 |
| onFinish       | `function`                  | Optional  | -             | keypad 입력 후 패스워드 결과 값이 나오는 func                   |
| count          | `number`                    | Optional  | `6`           | 패스워드를 입력 하는 횟수를 정하는 props 입니다                     |
| emptyPassword  | `boolean`                   | Optional  | `false`       | emptyPassword true 일 경우 패스워드를 2번 입력 하도록 변경        |
| onPassConfirm  | `function`                  | Optional  | `true`        | emptyPassword true 일 경우 패스워드 결과 값이 return 되는 func |
| shuffle        | `always or fixed or once`   | Optional  | `fixed`   | -always 키패드 클릭 시 항상 패드를 재정렬 합니다.- fixed 숫자 순서 그대로 정렬 합니다.- once 키패드 입력 전 한번 랜덤으로 정렬 합니다.                  |
| errorMessage          | `string`                    | Optional  | -             | 에러 메세지 props 입니다.                               |
| messages       | `array`                     | Optional  | ` 메세지 커스텀을 위한 props 입니다.`   | message                                           |
| deleteAllIcon  | `string or React.ReactNode` | Optional  | `전체삭제`   | 전체삭제 버튼 커스텀을 위한 props 입니다.                                             |
| deleteIcon     | `string or React.ReactNode` | Optional  | `삭제`   |삭제 버튼 커스텀을 위한 props 입니다.|
| full     | `boolean`                   | Optional  | `false`   | true 일 경우 패스워드창이 페이지를 꽉 채웁니다.                     |
| opener     | `boolean`                   | Optional  | `false`   | 새 창 열기로 패스워드를 입력 받을 경우 해당 페이지에서 true                 |



## License
MIT

