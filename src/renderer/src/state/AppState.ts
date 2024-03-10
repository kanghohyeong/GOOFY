import { PageKey } from '@renderer/pages/PageInfo'
import { atom } from 'recoil'

const pageState = atom<PageKey>({
  key: 'pageState',
  default: 'Home'
})

export { pageState }
