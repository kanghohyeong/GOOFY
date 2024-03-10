import Home from './pages/Home'
import { useRecoilValue } from 'recoil'
import { pageState } from './state/AppState'
import PageInfo from './pages/PageInfo'

function App(): JSX.Element {
  const page = useRecoilValue(pageState)

  const renderPage = (): JSX.Element => {
    const target = PageInfo.find(({ key }) => key === page)
    if (!target) return <Home />
    return target.render
    // switch (page) {
    //   case 'Home':
    //     return <Home />
    //   case 'Squeeze':
    //     return <Squeeze />
    //   case 'UtilList':
    //     return <UtilList />
    //   case 'Emojimo':
    //     return <Emojimo />
    //   default:
    //     return <div>hi</div>
    // }
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="gradient" />
      {renderPage()}
    </div>
  )
}

export default App
