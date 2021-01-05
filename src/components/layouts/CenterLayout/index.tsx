import React, { FC } from 'react'

type GridProps = Partial<{
  className: string | undefined
  children: React.ReactNode
}>

const Grid: FC<GridProps> = ({
  className,
  children,
}) => (
  <div className="grid-center">
    <br />
    <div className={className}>{children}</div>
    <br />
  </div>
)

export { Grid as default }
