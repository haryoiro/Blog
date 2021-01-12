import React, { FC } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ReactComponent as DefaultLogo } from './default.svg'

interface ISvgs {
  svgName: string | undefined
  className: string | undefined
  width?: string | undefined
  height?: string | undefined
  style?: any
}

type SvgsProps = Partial<ISvgs>
const defaultSize = '99'

const Svgs: FC<SvgsProps> = ({
  svgName,
  className,
  height = defaultSize,
  width = defaultSize,
  style,
}) => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {extension: {eq: "svg"}}) {
          nodes {
            publicURL
            name
          }
        }
      }
    `}
    render={(data) => {
      const url = data.allFile.nodes.filter((n: { name: string }) => n.name === svgName)[0]
      if (url) {
        return (
          <img
            height={height}
            width={width}
            className={className}
            src={url?.publicURL}
            alt={svgName}
            style={style}
          />
        )
      }
      return (
        <DefaultLogo
          width={width}
          height={height}
          className={className}
          style={style}
        />
      )
    }}
  />
)

export { Svgs as default }
