import { pageState } from '@renderer/state/AppState'
import { MouseEventHandler } from 'react'
import { useSetRecoilState } from 'recoil'
import Home from '@renderer/assets/home.svg?react'

const HomeButton = (): JSX.Element => {
  const setPage = useSetRecoilState(pageState)
  const handleOnClick: MouseEventHandler = () => {
    setPage('Home')
  }
  return (
    <>
      <Home
        fill="none"
        width={'30px'}
        height={'30px'}
        stroke="white"
        style={{ position: 'absolute', left: '10px', top: '10px', cursor: 'pointer' }}
        onClick={handleOnClick}
      />
    </>
  )
}

export default HomeButton
