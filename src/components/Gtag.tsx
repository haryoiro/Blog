import React from 'react'

const Gtag: React.FC = () => {
  const GID: string = process.env.GOOGLE_ANALYTICS_ID || ''

  return (
  <>
    <>{'<!-- Global site tag (gtag.js) - Google Analytics -->'}</>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GID}`}></script>
    <script>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${GID});
    `}
    </script>
  </>
)}


export default Gtag
