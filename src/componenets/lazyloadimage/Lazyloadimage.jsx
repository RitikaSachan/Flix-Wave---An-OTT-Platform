import React from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component'

export default function Lazyloadimage({src}) {
  return (
    <div>
        <LazyLoadImage
        alt=''
        src={src}
        effect='blur' />
    </div>
  )
}
