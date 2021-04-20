import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'
import React, { useState, useRef } from 'react'
import NameBlock from './components/NameBlock'
import ReactModal from 'react-modal'
import { XIcon } from '@heroicons/react/outline'

type Speaker = 1 | 2 | 3

interface Line {
  speaker: Speaker
  line: string
  nameSuffix?: string
}

type Quote = Line[]

const quotes: Record<number, Quote[]> = {
  1: [
    [
      {
        speaker: 1,
        nameSuffix: ', sowing',
        line: 'Haha fuck yeah!!! Yes!!',
      },
      {
        speaker: 1,
        nameSuffix: ', reaping',
        line: 'Well this fucking sucks. What the fuck.',
      },
    ],
    [
      {
        speaker: 1,
        line:
          'If I wanted to avoid doing things with people I hate I would literally never leave my house',
      },
    ],
    [
      {
        speaker: 1,
        line: `I'm proud of you, but also a bit fearful that we're verging on what I call "feelings territory," so let's stare at the fire in silence.`,
      },
    ],
    [
      {
        speaker: 1,
        nameSuffix: ', holding a Minion plushie',
        line:
          'I won this ugly yellow toddler. Which is one of the most beautiful things I’ve ever seen.',
      },
    ],
    [
      {
        speaker: 1,
        line:
          'The only way to defeat a bully is to stand up to them! Trust me, I have bullied a lot of people.',
      },
    ],
    [
      {
        speaker: 1,
        line:
          'You know the sound that a fork makes in the garbage disposal? That’s the sound that my brain makes all the time.',
      },
    ],
    [
      {
        speaker: 1,
        line: "Well, excuse me for having enormous flaws that I don't work on!",
      },
    ],
    [{ speaker: 1, line: "I'm not superstitious, but I am a little stitious" }],
  ],
  2: [
    [
      {
        speaker: 1,
        line: "It's just one banana, ${2}, what could it cost? $10?",
      },
    ],
    [
      {
        speaker: 1,
        line:
          'I can’t believe ${2} betrayed us again. Why is it always the ones you most suspect?',
      },
    ],
    [
      { speaker: 1, line: 'Someone will die...' },
      { speaker: 2, line: 'Of fun!' },
    ],
    [
      { speaker: 1, line: 'I need some air' },
      { speaker: 2, line: "There's air in here" },
      { speaker: 1, line: "I DON'T WANT YOUR AIR!" },
      { speaker: 2, line: "WHAT'S WRONG WITH MY AIR?!" },
    ],
    [
      {
        speaker: 1,
        line: 'Remember that old saying, "If at first you don\'t succeed..."',
      },
      { speaker: 2, line: '"Try to pretend it never happened."' },
    ],
    [
      { speaker: 1, line: "It's nice to feel wanted" },
      { speaker: 2, line: 'Not by the law!' },
    ],
    [
      { speaker: 1, line: 'Oh, my God. Do you know what this is?' },
      {
        speaker: 2,
        line: 'It’s a book. There’s a lot of those in here, this is a library.',
      },
    ],
    [
      { speaker: 1, line: 'I will not stand here and be insulted!' },
      {
        speaker: 2,
        line:
          'Then stand somewhere else and I’ll insult you there, I don’t care.',
      },
    ],
    [
      { speaker: 1, line: "We agreed that's how we'd raise our kids" },
      { speaker: 2, line: "Our kids? ${1}, we're not married" },
      { speaker: 1, line: "Dude, we're a little married" },
      { speaker: 2, line: 'I know. I love it.' },
    ],
    [
      {
        speaker: 1,
        line: `Isn't the idea supposed to be "you saved my life, now I owe you a debt"?`,
      },
      {
        speaker: 2,
        line:
          "Nope. Other way around. You saved my life, so now I'm your problem. If you don't like it, then kill me.",
      },
      { speaker: 2, line: 'God wanted me dead, now you get to find out why.' },
    ],
    [
      {
        speaker: 1,
        line: `I can't believe you live nearby and you won't let anyone crash at your place.`,
      },
      { speaker: 2, line: 'You people already know too much about me.' },
      {
        speaker: 1,
        line:
          'I know exactly three facts about you and one of them is that you won’t let any of us crash at your place.',
      },
    ],
    [
      {
        speaker: 1,
        line:
          '${2} was banned from the Chicken Shack so we had to go out of town to get some.',
      },
      {
        speaker: 2,
        line: `Well, they shouldn't say "all you can eat" if they don't mean it.`,
      },
      { speaker: 1, line: '${2} you ate a chair.' },
    ],
    [
      { speaker: 1, line: 'I have a salsa emergency' },
      {
        speaker: 2,
        line: "The condiment or the dance? I'm equipped for both.",
      },
    ],
    [
      { speaker: 1, line: 'You played me like a fiddle!' },
      {
        speaker: 2,
        line:
          'Oh no, ${1}. Fiddles are actually difficult to play. I played you like the cheap kazoo you are.',
      },
    ],
    [
      { speaker: 1, line: 'Hey ${2}, that outfit looks really good on you' },
      { speaker: 2, line: 'Thanks! It was 50% off' },
      { speaker: 1, line: "I'd like to see it 100% off" },
      { speaker: 2, line: "...They can't just give things away for free" },
      { speaker: 1, line: "That's not what I-" },
      { speaker: 2, line: "That's a terrible way to run a business, ${1}" },
    ],
  ],
  3: [
    [
      { speaker: 1, line: "I know you're in love with them." },
      { speaker: 2, line: "I'm not in love with ${3}." },
      { speaker: 1, line: "I didn't say their name." },
    ],
    [
      { speaker: 1, line: 'How do I get someone to like me?' },
      { speaker: 2, line: 'Tell them about yourself!' },
      {
        speaker: 1,
        nameSuffix: ', later, to ${3}',
        line: 'I’m socially awkward and can eat a cheeseburger in two bites.',
      },
    ],
    [
      {
        speaker: 1,
        line:
          'Has ${3} always had a habit of running headlong into certain death?',
      },
      {
        speaker: 2,
        line:
          "Sometimes they walk, occasionally they shuffle, periodically they amble. Once, I'm pretty sure I saw them trip into certain death.",
      },
    ],
    [
      { speaker: 1, line: "You've acted like ${3}'s dad for years" },
      {
        speaker: 2,
        line: 'More like their slightly older, much wiser brother.',
      },
      { speaker: 1, line: 'Whatever you need to tell yourself.' },
    ],
    [
      { speaker: 1, line: "${3} won't come out of their room." },
      { speaker: 2, line: 'Just tell them I said something.' },
      { speaker: 1, line: 'Like what?' },
      { speaker: 2, line: 'Anything factually incorrect.' },
      {
        speaker: 3,
        nameSuffix: ', a few minutes later',
        line: 'Did you just say the sun is a fucking planet-',
      },
    ],
    [
      {
        speaker: 1,
        line:
          'Why is everyone so obsessed with top or bottom? Honestly, I’d just be excited to have a bunk bed.',
      },
      { speaker: 2, line: '' },
      { speaker: 3, line: '' },
      { speaker: 2, line: "I'm gonna tell them." },
      { speaker: 3, line: "Don't you dare." },
    ],
    [
      {
        speaker: 1,
        line: 'Hey, no, you stay out of this, this is between me and ${2}!',
      },
      { speaker: 3, line: 'So ${2} knows about this?' },
      {
        speaker: 3,
        nameSuffix: ', running away',
        line: 'No, this is between me and me!',
      },
    ],
  ],
}

const interpolate = (str: string, obj: Record<string, string>) =>
  str.replace(/\${([^]+)}/g, (_, prop) => obj[prop])

const App = () => {
  const [charNum, setCharNum] = useState(1)
  const [chars, setChars] = useState<Record<string, string>>({
    1: 'Character One',
    2: 'Character Two',
    3: 'Character Three',
  })
  const [currentQuote, setQuote] = useState<Quote | null>(null)
  const [currentIndex, setIndex] = useState<number | null>(null)
  const quoteRef = useRef<HTMLDivElement | null>(null)

  const [showModal, setShowModal] = useState(false)

  const randomQuote = () => {
    const quoteList = quotes[charNum]
    let newIndex = Math.floor(Math.random() * quoteList.length)
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * quoteList.length)
    }
    setIndex(newIndex)
    setQuote(quoteList[newIndex])
  }

  const screenshot = async () => {
    if (quoteRef.current == null) return
    const canvas = await html2canvas(quoteRef.current)
    canvas.toBlob((blob) => {
      if (blob == null) return
      FileSaver.saveAs(blob, 'quote.png')
    })
  }

  ReactModal.setAppElement('#root')

  return (
    <>
      <header className="p-8 flex items-center justify-between h-1/6 shadow bg-purple-200 text-lg lg:text-3xl">
        <p>Incorrect Quotes</p>
        <button className="underline" onClick={() => setShowModal(true)}>
          About
        </button>
      </header>
      <main className="flex flex-col lg:flex-row h-5/6 font-speaker">
        <div className="lg:shadow-md p-8 flex flex-col lg:h-full">
          <button className="p-2 rounded text-xl" onClick={() => randomQuote()}>
            Quote It!
          </button>
          <button
            className={`p-2 rounded text-xl ${
              currentQuote == null && 'text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => screenshot()}
            disabled={currentQuote == null}
          >
            Take a Pic
          </button>
          <label className="flex flex-col my-4 text-lg">
            Number of Characters
            <select
              name="charNum"
              className="rounded text-lg"
              value={charNum}
              onChange={({ target }) => {
                setQuote(null)
                setCharNum(parseInt(target.value))
              }}
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </label>
          <NameBlock
            name={chars[1]}
            update={(val: string) => setChars({ ...chars, 1: val })}
          />
          <NameBlock
            disabled={charNum < 2}
            name={chars[2]}
            update={(val: string) => setChars({ ...chars, 2: val })}
          />
          <NameBlock
            disabled={charNum < 3}
            name={chars[3]}
            update={(val: string) => setChars({ ...chars, 3: val })}
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="p-2 max-w-full" ref={quoteRef}>
            {currentQuote != null &&
              currentQuote.map((line, index) => (
                <div
                  key={`${line.speaker}_${line.line}_${index}`}
                  className="text-lg lg:text-2xl flex justify-center mb-2 pb-1"
                >
                  <p className="font-speaker mr-3 font-black text-right">
                    {line.nameSuffix == null
                      ? chars[line.speaker]
                      : `${chars[line.speaker]}${interpolate(
                          line.nameSuffix,
                          chars,
                        )}`}
                    :
                  </p>
                  <p className="font-line font-light flex-grow">
                    {' '}
                    {line.line.length > 0 ? interpolate(line.line, chars) : ' '}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </main>
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        closeTimeoutMS={200}
      >
        <div className="flex flex-col h-full items-center justify-around text-lg lg:text-3xl text-center">
          <div className="leading-relaxed">
            <p>
              Hello! This is an incorrect quotes generator, to make funny
              pictures of your characters saying things from
              shows/books/memes/etc.
            </p>
            <p>
              It's entirely free to use and you are allowed to use the
              images/text for anything you'd like without attribution
            </p>
            <p>
              This app is created by{' '}
              <a href="http://twitter.com/lilypadnebula">
                Lily, aka LilypadNebula
              </a>
            </p>
          </div>
          <div>
            Icons used are from{' '}
            <a href="https://www.heroicons.com/" title="Heroicons">
              Heroicons
            </a>
          </div>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 lg:top-8 lg:right-8"
        >
          <XIcon className="h-10 w-10" />
        </button>
      </ReactModal>
    </>
  )
}

export default App
