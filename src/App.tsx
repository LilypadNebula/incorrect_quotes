import React, { useState, useEffect } from 'react';
import NameBlock from './components/NameBlock';

interface AppProps {}

interface Line {
  speaker: string
  line: string
}

type Quote = Line[]

const quotes: Quote[] = [
  [{speaker: 'One', line: 'I like water, it is tasty'},{speaker: 'One', line: 'Chocolate is my favorite fruit'}]
]

const App = () => {
  const [charNum, setCharNum] = useState(0)
  const [charOne, setCharOne] = useState("Character One")
  const [charTwo, setCharTwo] = useState("Character Two")

  const [quote, setQuote] = useState<Line>()
  return (
    <>
      <header className="p-8 shadow bg-purple-200 text-3xl">Incorrect Quotes</header>
      <main className="flex">
        <div className="shadow-md p-8 h-screen">
          <label className="flex flex-col my-4">Number of Characters
            <select name="charNum" className="rounded" value={charNum} onChange={({target}) => {setCharNum(parseInt(target.value))}}>
              <option value="1">One</option>
              <option value="2">Two</option>
            </select>
          </label>
          <NameBlock name={charOne} update={setCharOne} />
        </div>
        <div>
          <button className="p-2 rounded text-xl">Quote It!</button>
          {`${charOne} is really cool, but I'm not sure about ${charTwo}`}
        </div>
      </main>
    </>
  );
}

export default App;
