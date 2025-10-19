import React from 'react'

const BrandMark = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 80"
    className={className}
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <g fill="#3949ab">
      <path d="M18 64c10-28 14-34 32-34-10 5-12 11-9 17 8-9 18-12 30-12-12 6-16 12-14 17 10-8 24-12 41-12-14 6-20 12-18 16 8-5 14-7 24-7-7 5-12 10-14 15 10-5 20-7 32-7-12 10-27 15-46 15-22 0-39-2-58-8z"/>
      <path d="M36 22c3-7 10-12 18-14l-3 7c5-2 9-2 14-2-5 2-8 5-10 7 7 0 12 1 16 5-10 0-17 0-26-3 0 2-3 5-9 7z"/>
    </g>
  </svg>
)

const BrandHeader = ({
  align = 'left',
  size = 'md',
  markOnlyOnMobile = true,
  markSrc = '/phoenix.png',
  wordmark = 'THE GREGGORY FOUNDATION. LTD',
  tagline = 'Your Vision Delivered with Trust',
  fullSrc = '/brand-header.png/b1.PNG',
  heightClass,
  responsive = false,
  wrapperClass,
}) => {
  const [fullError, setFullError] = React.useState(false)
  const [imgError, setImgError] = React.useState(false)
  const isCenter = align === 'center'
  const sizes = {
    sm: { icon: 'w-9 h-9', title: 'text-lg', tagline: 'text-xs', full: 'h-10 sm:h-12' },
    md: { icon: 'w-12 h-12', title: 'text-2xl', tagline: 'text-sm', full: 'h-12 sm:h-14' },
    lg: { icon: 'w-14 h-14', title: 'text-3xl', tagline: 'text-base', full: 'h-14 sm:h-16' },
  }
  const s = sizes[size] || sizes.md
  // Backward-compat: if callers passed heightClass/responsive, map to wrapper sizing.
  const computedWrapper = wrapperClass
    ? wrapperClass
    : (responsive
        ? (heightClass ? heightClass : 'h-auto max-h-12 sm:max-h-14')
        : (heightClass ? heightClass : s.full))
  const iconHeight = heightClass ? heightClass : s.icon

  return (
    <div className={`flex items-center ${isCenter ? 'justify-center' : ''} gap-3 select-none ${computedWrapper}`}>
      {/* Prefer exact combined logo image if present */}
      {(!fullError && fullSrc) ? (
        <img
          src={fullSrc}
          alt="The Greggory Foundation — Brand Logo"
          className={`flex-shrink-0 object-contain h-full w-auto`}
          onError={() => setFullError(true)}
        />
      ) : (
        <>
          {imgError || !markSrc ? (
            <BrandMark className={`h-full w-auto flex-shrink-0`} />
          ) : (
            <img
              src={markSrc}
              alt="Phoenix mark"
              className={`flex-shrink-0 object-contain h-full w-auto`}
              onError={() => setImgError(true)}
            />
          )}
          <div className={`${isCenter ? 'text-center' : ''}`}>
            <div className={`${markOnlyOnMobile ? 'hidden sm:block' : ''} ${s.title} font-extrabold tracking-wide uppercase text-navy-900 leading-tight`}>{wordmark}</div>
            <div className={`${markOnlyOnMobile ? 'hidden sm:block' : ''} ${s.tagline} text-blue-600 mt-0.5`}>{tagline}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default BrandHeader
