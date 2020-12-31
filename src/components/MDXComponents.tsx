import * as React from 'react'
import { MDXProviderComponentsProp } from '@mdx-js/react'

export type CustomComponents = React.FC<{
  children: React.ReactElement & React.ReactNode & undefined & null
}>

const Pre: CustomComponents = ({ children }) => <pre>{children}</pre>

const customComponents: MDXProviderComponentsProp = {
  Pre,
}

export default customComponents
