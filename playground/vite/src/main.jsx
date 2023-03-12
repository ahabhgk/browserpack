import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import browserpack, { fs } from 'browserpack'

const INITIAL_STATS = {
  toString() { return "Compiling" },
  toJson() { return {} },
}

function App() {
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState(INITIAL_STATS);

  useEffect(() => {
    const compiler = browserpack({externalsType: 'var'})
    compiler.watch({ poll: 2000 }, (err, stats) => {
      if (err) {
        console.log(err)
        return err;
      }
      setStats(stats)
    })
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fs.vol.fromJson({
        './src/index.js': `console.log(${count})`,
      })
    }, 2000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  console.log(stats)

  return (
    <div>
      <div>Stats: {stats.toString()}</div>
      {/* <div>{JSON.stringify(stats.toJson(), 2)}</div> */}
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
