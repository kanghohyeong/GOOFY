import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import Spinner from '@renderer/assets/gear-spinner.svg?react'

type ButtonProps = {
  description: string
  activeCallback: () => Promise<void> | void
  topPosition?: string
  leftPosition?: string
}

const DragButton = ({
  description,
  activeCallback,
  topPosition,
  leftPosition
}: ButtonProps): JSX.Element => {
  const [position, setPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setISProcessing] = useState(false)
  const draggable = useRef<HTMLDivElement>(null)
  const descP = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (descP.current == null) return

    const itv = setInterval(() => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }

      descP.current!.style.color = color
    }, 1000)
    return () => clearInterval(itv)
  }, [descP.current])

  const handleMouseDown: MouseEventHandler = (e) => {
    if (isProcessing) return
    setIsDragging(true)
    e.preventDefault()
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      const newPosition = Math.min(
        Math.max(
          0,
          e.clientX -
            (e.currentTarget as HTMLDivElement).offsetLeft -
            (draggable.current as HTMLDivElement).offsetWidth / 2 +
            (e.currentTarget as HTMLDivElement).offsetWidth / 2
        ),
        (e.currentTarget as HTMLDivElement).offsetWidth -
          (draggable.current as HTMLDivElement).offsetWidth
      )
      setPosition(newPosition)
    }
  }

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = async (e) => {
    if (isDragging) {
      setIsDragging(false)
      if (
        position >=
        (e.currentTarget as HTMLDivElement).offsetWidth -
          (draggable.current as HTMLDivElement).offsetWidth
      ) {
        setISProcessing(true)
        const result = activeCallback()

        if (result instanceof Promise) {
          await result
        }
      }
      setISProcessing(false)
      setPosition(0)
    }
  }

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = async (e) => {
    if (isDragging) {
      setIsDragging(false)
      if (
        position >=
        (e.currentTarget as HTMLDivElement).offsetWidth -
          (draggable.current as HTMLDivElement).offsetWidth
      ) {
        setISProcessing(true)
        const result = activeCallback()

        if (result instanceof Promise) {
          await result
        }
      }
      setISProcessing(false)
      setPosition(0)
    }
  }

  return (
    <div
      style={{
        width: '300px',
        height: '50px',
        backgroundColor: 'rgba(64,164,155,0.65)',
        borderRadius: '25px',
        overflow: 'hidden',
        position: 'absolute',
        top: topPosition ?? '80%',
        left: leftPosition ?? '50%',
        translate: '-50%'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          position: 'relative',
          width: '100px',
          height: '50px',
          backgroundColor: isProcessing ? '#333' : '#eee',
          borderRadius: '25px',
          cursor: isProcessing ? 'default' : 'pointer',
          color: isProcessing ? 'white' : 'black',
          transform: `translateX(${position}px)`,
          transition: `${position ? null : 'transform 0.3s ease'}`,
          zIndex: 1,
          boxShadow: '2px 2px rgba(100,100,100,1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        ref={draggable}
        onMouseDown={handleMouseDown}
      >
        {isProcessing ? (
          <Spinner width={'30px'} height={'30px'} />
        ) : (
          <p style={{ textAlign: 'center', lineHeight: '3', fontStyle: 'italic', width: '100%' }}>
            slide
          </p>
        )}
      </div>
      <p
        style={{
          position: 'absolute',
          right: 10,
          top: 0,
          fontWeight: 'bold',
          transform: 'translateY(50%)',
          transition: 'color 1s ease'
        }}
        ref={descP}
      >
        {description}
      </p>
    </div>
  )
}

export default DragButton
