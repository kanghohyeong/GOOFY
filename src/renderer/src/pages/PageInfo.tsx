import Squeeze from './Squeeze'
import Emojimo from './Emojimo'
import Home from './Home'
import UtilList from './UtilList'

export type PageKey = 'Home' | 'Squeeze' | 'UtilList' | 'Emojimo'

interface PageInfo {
  key: PageKey
  description: string
  render: JSX.Element
  isConfigPage?: boolean
}

const infos: PageInfo[] = [
  { key: 'Home', description: 'home page', render: <Home />, isConfigPage: true },
  { key: 'UtilList', description: 'util list page', render: <UtilList />, isConfigPage: true },
  {
    key: 'Squeeze',
    description: "Too Long; Don't read. Make it shorter",
    render: <Squeeze />
  },
  {
    key: 'Emojimo',
    description: 'Give me Emoji!',
    render: <Emojimo />
  }
]

export default infos
