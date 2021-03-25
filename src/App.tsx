import html2canvas from 'html2canvas';
import FileSaver from 'file-saver'
import React, { useState, useEffect, useRef } from 'react';
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
      [{speaker:'one', line: 'If I wanted to avoid doing things with people I hate I would literally never leave my house'}],
      [{speaker: 'one', line: `I'm proud of you, but also a bit fearful that we're verging on what I call "feelings territory," so let's stare at the fire in silence.`}],
      [{speaker: 'one', line: '*holding a Minion plushie* I won this ugly yellow toddler. Which is one of the most beautiful things I’ve ever seen.'}],
      [{speaker: 'one', line: 'The only way to defeat a bully is to stand up to them!'}, {speaker: 'one', line: 'Trust me, I have bullied a lot of people.'}],
      [{speaker: 'one', line: "It's a banana, what could it cost? $10?"}]
    ],
  2: [
    [{speaker: 'one', line: 'Someone will die...'}, {speaker: 'two', line: 'Of fun!'}],
    [{speaker: 'one', line: 'I need some air'}, {speaker: 'two', line: "There's air in here"}, {speaker: 'one', line: "I DON'T WANT YOUR AIR!"}, {speaker: 'two', line: "WHAT'S WRONG WITH MY AIR?!"}],
    [{speaker: 'one', line: 'Remember that old saying, "If at first you don\'t succeed..."'}, {speaker: 'two', line: '"Try to pretend it never happened."'}],
    [{speaker: 'one', line: "It's nice to feel wanted"}, {speaker: 'two', line: "Not by the law!"}],
    [{speaker: 'one', line: 'Oh, my God. Do you know what this is?'}, {speaker: 'two', line: "It’s a book. There’s a lot of those in here, this is a library."}],
    [{speaker: 'one', line: "We agreed that's how we'd raise our kids"}, {speaker: 'two', line: "Our kids? We're not married"}, {speaker: 'one', line: "Dude, we're a little married"}, {speaker: 'two', line: "I know. I love it."}],

  ],
  3: []
}


const App = () => {
  const [charNum, setCharNum] = useState(1)
  const [chars, setChars] = useState<Record<string, string>>({one: "Character One", two: "Character Two"})
  const [currentQuote, setQuote] = useState<Quote | null>(null)
  const quoteRef = useRef<HTMLDivElement | null>(null)

  const randomQuote = () => {
    const quoteList = quotes[charNum]
    setQuote(quoteList[Math.floor(Math.random() * (quoteList.length))])
  }

  const screenshot = async () => {
    if (quoteRef.current == null) return
    const canvas = await html2canvas(quoteRef.current)
    canvas.toBlob(blob => {
      if (blob == null) return
      FileSaver.saveAs(blob, "quote.png")
    })
    
  }


  return (
    <>
      <header className="p-8 flex items-center h-1/6 shadow bg-purple-200 text-3xl font-line">Incorrect Quotes</header>
      <main className="flex h-5/6 font-line">
        <div className="shadow-md p-8 flex flex-col h-full">
          <button className="p-2 rounded text-xl" onClick={() => randomQuote()}>Quote It!</button>
          <button className={`p-2 rounded text-xl ${currentQuote == null && 'text-gray-400 cursor-not-allowed'}`} onClick={() => screenshot()} disabled={currentQuote == null}>Take a Pic</button>
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
        <div className="flex flex-col items-center justify-around w-full">
          <div className="flex flex-col p-2" ref={quoteRef}>
          {currentQuote != null && currentQuote.map(line => (
            <div key={line.line} className="text-3xl flex mb-1 pb-1">
              <p className="font-speaker mr-1 font-black">{chars[line.speaker]}:</p>
              <p className="font-line text-justify max-w-xl"> {line.line}</p>
            </div>
          ))}
          </div>
        <div className="fixed bottom-0">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
      </main>
    </>
  );
}

export default App;
