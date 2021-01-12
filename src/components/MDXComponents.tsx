import * as React from 'react'
import { MDXProviderComponentsProp } from '@mdx-js/react'
import '../styles/prism.css'

export type CustomComponents = React.FC<{
  children: React.ReactElement & React.ReactNode & undefined & null
}>

const Pre: CustomComponents = ({ children }) => <pre className="notranslate">{children}</pre>

const customComponents: MDXProviderComponentsProp = {
  Pre,
}

export default customComponents
