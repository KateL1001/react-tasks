/* eslint-disable react/prop-types */

import React, { memo, useMemo } from 'react';

const Sum = memo(function Sum({ numbersProp }) {
  console.log("render1");
  const total = useMemo(() => {
    console.log("render3");
    return numbersProp.reduce((acc, number) => acc + number, 0);
  },[numbersProp]) 
  return <div>Sum: {total}</div>;
})

const numbers = [1, 2, 3, 4, 5,5];

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Sum numbersProp={numbers} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
