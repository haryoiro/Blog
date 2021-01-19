import React, { FC } from 'react'
import { Link } from 'gatsby'
import { Maybe } from '../../../utils/util'
// @ts-ignore
import { scale } from '../../../utils/typography'

interface ITocData {
  title: Maybe<string>,
  url: Maybe<string>,
  items: Maybe<Array<ITocData>>,
}
interface IExpandTocProps {
  className?: Maybe<string>,
  data: ITocData,
}

const ExpandToc: FC<IExpandTocProps> = ({ data: { title, items, url } }) => (
  <>
    {title && (
        <li>
          <Link to={encodeURI(url || '')} rel="heading">
            {title}
          </Link>
        </li>
      )}
    {items && (
      <ol>
        {items.map((next: ITocData) => (
          <ExpandToc key={next.title} data={next} />
        ))}
      </ol>
      )}
  </>
)

const Toc: FC<IExpandTocProps> = ({ data }) => (
  <div className="c-card toc-wrapper">
    <div className="toc-header">
      目次
    </div>
    <ExpandToc data={data} />
  </div>
)

export { Toc as default }
