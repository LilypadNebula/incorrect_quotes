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
      [{speaker: 'one', line: 'Chocolate is my favorite fruit'}],
      [{speaker: 'one', line: `I'm proud of you, but also a bit fearful that we're verging on what I call "feelings territory," so let's stare at the fire in silence.`}]
    ],
  2: [
    [{speaker: 'one', line: 'Do you like oysters?'},{speaker: 'two', line: 'Nope!'}],
    [{speaker: 'one', line: 'Can we get McDonalds?'}, {speaker: 'two', line: 'We have food at home!'}],
    [{speaker: 'one', line: 'Someone will die...'}, {speaker: 'two', line: 'Of fun!'}]
  ]
}


const App = () => {
  const [charNum, setCharNum] = useState(1)
  const [chars, setChars] = useState<Record<string, string>>({one: "Character One", two: "Character Two"})
  const [currentQuote, setQuote] = useState<Quote | null>(null)

  const randomQuote = () => {
    const quoteList = quotes[charNum]
    setQuote(quoteList[Math.floor(Math.random() * (quoteList.length))])
  }
  return (
    <>
      <header className="p-8 flex items-center h-1/6 shadow bg-purple-200 text-3xl font-line">Incorrect Quotes</header>
      <main className="flex h-5/6 font-line">
        <div className="shadow-md p-8 flex flex-col h-full">
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
          <NameBlock disabled={charNum < 2} name={chars['two']} update={(val: string) => setChars({...chars, two: val})} />

        </div>
        <div className="flex flex-col items-center w-full">
          <button className="p-2 rounded text-xl mb-8" onClick={() => randomQuote()}>Quote It!</button>
          {currentQuote != null && currentQuote.map(line => (
            <p key={line.line} className="text-xl font-line mb-1"><span className="font-speaker">{chars[line.speaker]}:</span> "{line.line}"</p>
          ))}
        <div className="fixed bottom-0">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
      </main>
    </>
  );
}

export default App;
