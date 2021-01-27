import React, { FC } from 'react'
import { Link } from 'gatsby'
import { Maybe } from '../../../utils/util'

interface ITocData {
  title: Maybe<string>
  url: Maybe<string>
  items: Maybe<Array<ITocData>>
}
interface IExpandTocProps {
  className?: Maybe<string>
  data: ITocData
  title?: Maybe<string>
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

const Tocer: FC<IExpandTocProps> = ({ data }) => (
  <ol>
    {data.items?.map(item => (
      <>
        <li key={item.url}>
          <Link to={item.url || ''}>{item.title}</Link>
        </li>
        {item.items && (
          <ul>
            {item.items.map(sec => (
              <li key={sec.url}>
                <Link to={sec.url || ''}>{sec.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </>
    ))}
  </ol>
)

const Toc: FC<IExpandTocProps> = ({ title, data, className }) => (
  <div className={`toc-container ${className || ''}`}>
    <div className="float-shadow">
      <div className="box-border">
        <div className="text">
          <header className="sidecontent-header">{title}</header>
          <main className="">
            <Tocer data={data} />
          </main>
        </div>
      </div>
    </div>
  </div>
)

export { Toc as default }
