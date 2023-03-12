import { useSyncExternalStore } from 'react'
import { browserpackStore } from './browserpack.store'

export default function App() {
  const { stats, error } = useSyncExternalStore(browserpackStore.subscribe, browserpackStore.getSnapshot)

  return (
    <div>
      <div>Stats: {stats ? error ? error.message : stats.toString() : 'Compiling...'}</div>
      <div>{stats ? error ? error.message : JSON.stringify(stats.toJson(), undefined, 2) : 'Compiling...'}</div>
      <button onClick={() => browserpackStore.writeFile()}>update file</button>
    </div>
  )
}
