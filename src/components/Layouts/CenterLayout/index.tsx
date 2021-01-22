import React, { FC } from 'react'

interface IGrid {
  className: string
  inClassName: string
  children: React.ReactNode
}
type GridProps = Partial<IGrid>

const Grid: FC<GridProps> = ({
  className,
  children,
}) => (
  <div className={className || ''}>
    <div className="grid-center">
      {children}
    </div>
  </div>
)

export { Grid as default }
