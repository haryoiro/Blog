import React from 'react'

type SvgProps = {
  role?: string,
  viewBox?: string,
  title?: string,
  width?: string,
  height?: string,
  className?: string,
  path: {
    d: string
  }
};

const Svg: React.FC<SvgProps> = ({
  role,
  viewBox,
  title,
  path,
  width, height,
  className,
  ...props
}) => (
  <svg
    role={role || 'img'}
    viewBox={viewBox || '0 0 24 24'}
    xmlns="http://www.w3.org/2000/svg"
    width={width || '16'}
    height={height || '16'}
    className={className}
  >
    <title>{title}</title>
    <path {...path} />
  </svg>
)

export default Svg
