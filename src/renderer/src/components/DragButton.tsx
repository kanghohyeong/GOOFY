import { MouseEventHandler, useEffect, useRef, useState } from 'react'

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
  const draggable = useRef<HTMLDivElement>(null)
  const descP = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (descP.current == null) return

    setInterval(() => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }

      descP.current!.style.color = color
    }, 1000)
  }, [descP.current])

  const handleMouseDown: MouseEventHandler = (e) => {
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

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      setIsDragging(false)
      if (
        position >=
        (e.currentTarget as HTMLDivElement).offsetWidth -
          (draggable.current as HTMLDivElement).offsetWidth
      ) {
        activeCallback()
      }
      setPosition(0)
    }
  }

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(false)
    if (
      position >=
      (e.currentTarget as HTMLDivElement).offsetWidth -
        (draggable.current as HTMLDivElement).offsetWidth
    ) {
      activeCallback()
    }
    setPosition(0)
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
          backgroundColor: '#eee',
          borderRadius: '25px',
          cursor: 'pointer',
          color: 'black',
          textAlign: 'center',
          lineHeight: '3',
          fontStyle: 'italic',
          transform: `translateX(${position}px)`,
          transition: `${position ? null : 'transform 0.3s ease'}`,
          zIndex: 1
        }}
        ref={draggable}
        onMouseDown={handleMouseDown}
      >
        slide
      </div>
      <p
        style={{
          position: 'absolute',
          right: 10,
          top: 0,
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
