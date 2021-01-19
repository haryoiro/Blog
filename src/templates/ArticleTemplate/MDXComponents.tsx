import React, { FC } from 'react'
import { MDXProviderComponentsProp } from '@mdx-js/react'

import '../../styles/prism.css'
import './style.scss'

export type CustomComponents = React.FC<{
  children: React.ReactElement & React.ReactNode & undefined & null
}>
interface ICustom {
  id?: string
  alt?: string
  src?: string
  className?: string
}

const pre: FC<ICustom> = ({ children, className }) => <pre className={`${className} notranslate`}>{children}</pre>

const img: FC<ICustom> = ({ alt, src, className }): JSX.Element => (
  <img
    alt={alt}
    src={src}
    className={className}
    loading="lazy"
    decoding="async"
  />
)
const Undefined: FC<ICustom> = ({ children, className }): JSX.Element => (
  <div>{children}</div>
)

const customComponents: MDXProviderComponentsProp = {
  pre,
  img,
  undefined: Undefined,
}

export default customComponents
