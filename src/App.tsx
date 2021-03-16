import React, { useState, useEffect } from 'react';
import NameBlock from './components/NameBlock';

interface AppProps {}

type Speaker = 'one' | 'two'

interface Line {
  speaker: Speaker
  line: string
}

type Quote = Line[]

const quotes: Record<number,Quote[]> = {
  1: [
      [{speaker: 'one', line: 'I like water, it is tasty'}],
      [{speaker: 'one', line: 'Chocolate is my favorite fruit'}]
    ],
  2: [
    [{speaker: 'one', line: 'Do you like oysters?'},{speaker: 'two', line: 'Nope!'}],
    [{speaker: 'one', line: 'Can we get McDonalds?'}, {speaker: 'two', line: 'We have food at home!'}]
  ]
}


const App = () => {
  const [charNum, setCharNum] = useState(1)
  const [chars, setChars] = useState<Record<string, string>>({one: "Character One", two: "Character Two"})
  const [currentQuote, setQuote] = useState<Quote | null>(null)

  const randomQuote = () => {
    const quoteList = quotes[charNum]
    setQuote(quoteList[Math.floor(Math.random() * (quoteList[charNum].length))])
  }
  return (
    <>
      <header className="p-8 shadow bg-purple-200 text-3xl">Incorrect Quotes</header>
      <main className="flex">
        <div className="shadow-md p-8 h-screen">
          <label className="flex flex-col my-4">Number of Characters
            <select name="charNum" className="rounded" value={charNum} onChange={({target}) => {
              setQuote(null)
              setCharNum(parseInt(target.value))
            }}>
              <option value="1">One</option>
              <option value="2">Two</option>
            </select>
          </label>
          <NameBlock name={chars['one']} update={(val: string) => setChars({...chars, one: val})} />
          <NameBlock name={chars['two']} update={(val: string) => setChars({...chars, two: val})} />

        </div>
        <div>
          <button className="p-2 rounded text-xl" onClick={() => randomQuote()}>Quote It!</button>
          {currentQuote != null && currentQuote.map(line => (
            <p className="text-lg">{chars[line.speaker]}: "{line.line}"</p>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
