import { atom } from 'recoil'

type PP = 'Home' | 'Squeeze'

const pageState = atom<PP>({
  key: 'pageState',
  default: 'Home'
})

export { pageState }
