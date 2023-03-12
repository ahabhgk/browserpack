import logo from './logo.svg';
import './App.css';
import browserpack from './browserpack'

const compiler = browserpack({
  plugins: [
    // new webpack.ProgressPlugin(),
  ]
});
compiler.watch({ poll: 2000 }, (err, stats) => {
  if (err) {
    console.log(err)
    return;
  }
  console.log(stats?.toString())
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
