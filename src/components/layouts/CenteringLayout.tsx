import React, { FC } from 'react'

type GridPositions = 'left' | 'center' | 'right' | null | undefined
type GridProps = Partial<{
  className: string | undefined
  position: GridPositions
  children: React.ReactNode
}>

const Grid: FC<GridProps> = ({
  className,
  position = 'center',
  children,
}) => {
  switch (position) {
    case 'left':
      return (
        <div className={`grid-left ${className}`}>
          <div />
          <div>{children}</div>
          <div />
        </div>
      )
    case 'right':
      return (
        <div className={`grid-right ${className}`}>
          <div />
          <div>{children}</div>
          <div />
        </div>
      )
    case 'center':
    default:
      return (
        <div className={`grid-center ${className}`}>
          <div />
          <div>{children}</div>
          <div />
        </div>
      )
  }
}

export { GridPositions, Grid as default }