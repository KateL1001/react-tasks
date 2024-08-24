/* eslint-disable react/prop-types */
import { memo, useCallback, useState } from "react";

const Button = memo(function Button({ onClick, children }) {
  console.log("Button render");
  return <button onClick={onClick}>{children}</button>;
})


function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  },[]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  );
}

export default App;
