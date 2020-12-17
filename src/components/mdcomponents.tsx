import * as React from 'react';

export type CustomComponents = { [P in keyof JSX.IntrinsicElements]?: (props: JSX.IntrinsicElements[P]) => React.ReactNode }


// MDX Custom Components
const customComponents: CustomComponents = {
    h1: (props) => <h1 {...props} />,
    h2: (props) => <h2 {...props} />,

}

export default customComponents