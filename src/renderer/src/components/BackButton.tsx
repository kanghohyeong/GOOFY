import Back from '@renderer/assets/back.svg?react'
import { pageState } from '@renderer/state/AppState'
import { MouseEventHandler } from 'react'
import { useSetRecoilState } from 'recoil'

const BackButton = (): JSX.Element => {
  const setPage = useSetRecoilState(pageState)
  const handleOnClick: MouseEventHandler = () => {
    setPage('Home')
  }
  return (
    <>
      <Back
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

export default BackButton
