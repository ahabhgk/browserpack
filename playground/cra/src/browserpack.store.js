import browserpack, { fs } from 'browserpack'

function getFileContent(content) {
  return `console.log(${content})`
}

let state = {}
let nextContent = 0
const file = './src/index.js'

fs.vol.fromJSON({ [file]: getFileContent(nextContent++) })

const compiler = browserpack({ mode: 'development' })
compiler.watch({ poll: 2000 }, (error, stats) => {
  state = { error, stats }
  emitChange();
})

let listeners = [];

export const browserpackStore = {
  writeFile() {
    fs.vol.fromJSON({ [file]: getFileContent(nextContent++) })
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return state;
  }
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
