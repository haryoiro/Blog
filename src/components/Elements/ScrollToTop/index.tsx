import React, { FC, useState, useEffect } from 'react'

/* juliapottingerさんのコードを参考に実装
 * https://juliapottinger.com/react-gatsby-scroll-to-top/
 */

type BackToTopProps = JSX.IntrinsicElements['button'] & {
  showBelow?: number
  Icon?: React.ReactElement | null
}

// ボタン内部に表示されるアイコン。差し替え可能。
const DefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="2"
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
)

const BackToTop: FC<BackToTopProps> = ({
  showBelow = 50,
  Icon = <DefaultIcon />,
  ...props
}) => {
  const [show, setShow] = useState<boolean>(!!showBelow)

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll)
      return () => window.removeEventListener(`scroll`, handleScroll)
    }
  })

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      !show && setShow(true)
    } else {
      show && setShow(false)
    }
  }

  const handleClick = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      {show && (
        <button
          className="scroll-to-top"
          onClick={handleClick}
          aria-label="to top"
          {...props}
        >
          <i>{Icon}</i>
        </button>
      )}
    </>
  )
}

export default BackToTop
