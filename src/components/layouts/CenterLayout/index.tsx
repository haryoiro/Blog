import React, { FC } from 'react'

interface IGrid {
  className: string
  inClassName: string
  children: React.ReactNode
}
type GridProps = Partial<IGrid>

const Grid: FC<GridProps> = ({
  className,
  inClassName,
  children,
}) => (
  <div className={`grid-center ${className || ''}`}>
    <div />
    <div className={inClassName}>{children}</div>
    <div />
  </div>
)

export { Grid as default }
