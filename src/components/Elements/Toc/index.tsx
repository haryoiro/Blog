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
  title?: Maybe<string>;
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
      <ul>
        {items.map((next: ITocData) => (
          <ExpandToc key={next.title} data={next} />
        ))}
      </ul>
      )}
  </>
)

const Toc: FC<IExpandTocProps> = ({ title, data, className }) => (
  <div className={`c-card toc-wrapper ${className  || ''}`}>
    <div className="toc-header">
      {title}
    </div>
    <ExpandToc data={data} />
  </div>
)

export { Toc as default }
