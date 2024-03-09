import Home from './pages/Home'
import { useRecoilValue } from 'recoil'
import { pageState } from './state/AppState'
import Squeeze from './pages/Squeeze'

function App(): JSX.Element {
  const page = useRecoilValue(pageState)

  const getPage = (): JSX.Element => {
    switch (page) {
      case 'Home':
        return <Home />
      case 'Squeeze':
        return <Squeeze />
      default:
        return <div>hi</div>
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="gradient" />
      {getPage()}
    </div>
  )
}

export default App
