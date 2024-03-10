import DragButton from '@renderer/components/DragButton'
import pageInfos from './PageInfo'
import { useSetRecoilState } from 'recoil'
import { pageState } from '@renderer/state/AppState'
import { useState } from 'react'
import HomeButton from '@renderer/components/HomeButton'

const UtilList = (): JSX.Element => {
  const setPage = useSetRecoilState(pageState)
  const [selectedUtil, setSelectedUtil] = useState(pageInfos[0].key)

  return (
    <>
      <HomeButton />
      {pageInfos
        .filter(({ isConfigPage }) => isConfigPage !== true)
        .map(({ key, description }) => {
          return (
            <div
              key={key}
              style={{
                cursor: 'pointer',
                border: `${selectedUtil == key ? '3px' : '1px'} solid white`,
                padding: '10px 10px',
                borderRadius: '10px',
                margin: '10px',
                fontWeight: selectedUtil == key ? 'bold' : 'normal'
              }}
              onClick={() => setSelectedUtil(key)}
            >
              {key} - {description}
            </div>
          )
        })}
      <DragButton description={selectedUtil} activeCallback={() => setPage(selectedUtil)} />
    </>
  )
}

export default UtilList
