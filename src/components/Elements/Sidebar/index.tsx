import React, { FC } from 'react'

interface ISideBar {
  className?: string | null | undefined,
  title?: string | null | undefined,
  children: React.ReactNode | string
}

const SideBar: FC<ISideBar> = ({ className, title, children }) => (
  <div className={`sidebar ${className}`}>
    {children}
  </div>
)

export default SideBar
