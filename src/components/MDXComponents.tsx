import * as React from 'react';
import { MDXProviderComponentsProp } from '@mdx-js/react'

export type CustomComponents = { [P in keyof JSX.IntrinsicElements]?: (props: JSX.IntrinsicElements[P]) => React.ReactNode }
export type MDXComponentProps = JSX.IntrinsicAttributes & React.ClassAttributes<HTMLHeadingElement> & React.HTMLAttributes<HTMLHeadingElement>
// MDX Custom Components
const customComponents: MDXProviderComponentsProp = {
    h1: (props: MDXComponentProps) => <h1 {...props} />,
    h2: (props: MDXComponentProps) => <h2 {...props} />,
}

export default customComponents