import React, { FC } from 'react'
import { MDXProviderComponentsProp } from '@mdx-js/react'
// @ts-ignore
import { scale, rhythm } from '../utils/typography'

import '../styles/prism.css'

export type CustomComponents = React.FC<{
  children: React.ReactElement & React.ReactNode & undefined & null
}>

const Pre: FC<{className:string}> = ({ children, className }) => <pre className={`${className} notranslate`}>{children}</pre>
const H2: FC = ({ children }): JSX.Element => <h2 style={{
  fontSize: scale(2).fontSize,
  lineHeight: scale(2).lineHeight,
  marginBottom: rhythm(1),
  paddingTop: rhythm(3),
}}>{children}</h2>
const H3: FC = ({ children }): JSX.Element => <h3 style={{
  fontSize: scale(1.5).fontSize,
  lineHeight: scale(1.5).lineHeight,
  marginBottom: rhythm(1),
  paddingTop: rhythm(1),
}}>{children}</h3>


const customComponents: MDXProviderComponentsProp = {
  pre: Pre,
  h2: H2,
  h3: H3,
}

export default customComponents
