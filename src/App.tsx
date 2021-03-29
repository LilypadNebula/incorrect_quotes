import html2canvas from 'html2canvas';
import FileSaver from 'file-saver'
import React, { useState, useRef } from 'react';
import NameBlock from './components/NameBlock';

type Speaker = 1 | 2 | 3

interface Line {
  speaker: Speaker
  line: string
}

type Quote = Line[]

const quotes: Record<number, Quote[]> = {
  1: [
    [{ speaker: 1, line: 'If I wanted to avoid doing things with people I hate I would literally never leave my house' }],
    [{ speaker: 1, line: `I'm proud of you, but also a bit fearful that we're verging on what I call "feelings territory," so let's stare at the fire in silence.` }],
    [{ speaker: 1, line: '*holding a Minion plushie* I won this ugly yellow toddler. Which is one of the most beautiful things I’ve ever seen.' }],
    [{ speaker: 1, line: 'The only way to defeat a bully is to stand up to them!' }, { speaker: 1, line: 'Trust me, I have bullied a lot of people.' }],
    [{ speaker: 1, line: 'You know the sound that a fork makes in the garbage disposal?' }, { speaker: 1, line: "That’s the sound that my brain makes all the time." }],
    [{ speaker: 1, line: "Well, excuse me for having enormous flaws that I don't work on!" }],
    [{ speaker: 1, line: "I'm not superstitious, but I am a little stitious" }],
  ],
  2: [
    [{ speaker: 1, line: "It's just one banana, ${2}, what could it cost? $10?" }],
    [{ speaker: 1, line: "I can’t believe ${2} betrayed us again. Why is it always the ones you most suspect?" }],
    [{ speaker: 1, line: 'Someone will die...' }, { speaker: 2, line: 'Of fun!' }],
    [{ speaker: 1, line: 'I need some air' }, { speaker: 2, line: "There's air in here" }, { speaker: 1, line: "I DON'T WANT YOUR AIR!" }, { speaker: 2, line: "WHAT'S WRONG WITH MY AIR?!" }],
    [{ speaker: 1, line: 'Remember that old saying, "If at first you don\'t succeed..."' }, { speaker: 2, line: '"Try to pretend it never happened."' }],
    [{ speaker: 1, line: "It's nice to feel wanted" }, { speaker: 2, line: "Not by the law!" }],
    [{ speaker: 1, line: 'Oh, my God. Do you know what this is?' }, { speaker: 2, line: "It’s a book. There’s a lot of those in here, this is a library." }],
    [{ speaker: 1, line: 'I will not stand here and be insulted!' }, { speaker: 2, line: "Then stand somewhere else and I’ll insult you there, I don’t care." }],
    [{ speaker: 1, line: "We agreed that's how we'd raise our kids" }, { speaker: 2, line: "Our kids? ${1}, we're not married" }, { speaker: 1, line: "Dude, we're a little married" }, { speaker: 2, line: "I know. I love it." }],
    [{ speaker: 1, line: `Isn't the idea supposed to be "you saved my life, now I owe you a debt"?` }, { speaker: 2, line: "Nope. Other way around. You saved my life, so now I'm your problem. If you don't like it, then kill me." }, { speaker: 1, line: "God wanted me dead, now you get to find out why." }],

  ],
  3: [
    [{ speaker: 1, line: "I know you're in love with them." }, { speaker: 2, line: "I'm not in love with ${3}." }, { speaker: 1, line: "I didn't say their name." }],
    [{ speaker: 1, line: 'Has ${3} always had a habit of running headlong into certain death?' }, { speaker: 2, line: "Sometimes they walk, occasionally they shuffle, periodically they amble. Once, I'm pretty sure I saw them trip into certain death." }],
    [{ speaker: 1, line: "You've acted like ${3}'s dad for years" }, { speaker: 2, line: "More like their slightly older, much wiser brother." }, { speaker: 1, line: "Whatever you need to tell yourself." }],
    [{ speaker: 1, line: "${3} won't come out of their room." }, { speaker: 2, line: "Just tell them I said something." }, { speaker: 1, line: "Like what?" }, { speaker: 2, line: "Anything factually incorrect." }, { speaker: 3, line: "*a few minutes later* Did you just say the sun is a fucking planet-" }],
  ]
}

const interpolate = (str: string, obj: Record<string, string>) => str.replace(
  /\${([^]+)}/g,
  (_, prop) => obj[prop]
);


const App = () => {
  const [charNum, setCharNum] = useState(1)
  const [chars, setChars] = useState<Record<string, string>>({ 1: "Character One", 2: "Character Two", 3: "Character Three" })
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
      <main className="flex flex-col lg:flex-row h-5/6 font-line">
        <div className="lg:shadow-md p-8 flex flex-col lg:h-full">
          <button className="p-2 rounded text-xl" onClick={() => randomQuote()}>Quote It!</button>
          <button className={`p-2 rounded text-xl ${currentQuote == null && 'text-gray-400 cursor-not-allowed'}`} onClick={() => screenshot()} disabled={currentQuote == null}>Take a Pic</button>
          <label className="flex flex-col my-4">Number of Characters
            <select name="charNum" className="rounded" value={charNum} onChange={({ target }) => {
              setQuote(null)
              setCharNum(parseInt(target.value))
            }}>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </label>
          <NameBlock name={chars[1]} update={(val: string) => setChars({ ...chars, 1: val })} />
          <NameBlock disabled={charNum < 2} name={chars[2]} update={(val: string) => setChars({ ...chars, 2: val })} />
          <NameBlock disabled={charNum < 3} name={chars[3]} update={(val: string) => setChars({ ...chars, 3: val })} />

        </div>
        <div className="flex flex-col items-center justify-around w-full">
          <div className="flex flex-col p-2" ref={quoteRef}>
            {currentQuote != null && currentQuote.map(line => (
              <div key={line.line} className="text-lg lg:text-3xl flex mb-1 pb-1">
                <p className="font-speaker mr-1 font-black">{chars[line.speaker]}:</p>
                <p className="font-line text-justify max-w-xl"> {interpolate(line.line, chars)}</p>
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
