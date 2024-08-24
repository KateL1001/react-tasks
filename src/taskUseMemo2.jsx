/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

function MagicNumber({ word }) {

  const getMagicNumber = (word) => {
    let i = 0;
    while (i < 1000000000) { i++; }
    return i + word.length;
  };

  const magicNumber =  useMemo(() => getMagicNumber(word), [word]);

  return <div>Magic Number: {magicNumber}</div>;
}

function App() {
  const [word, setWord] = React.useState('hello');

  return (
    <div>
      <input value={word} onChange={(e) => setWord(e.target.value)} />
      <MagicNumber word={word} />
    </div>
  );
}

export default App;