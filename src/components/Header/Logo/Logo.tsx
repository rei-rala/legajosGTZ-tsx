import React from 'react'

import './logo.css'

const Logo: React.FC = () =>  (
<div className="logo">
    <img src="https://firebasestorage.googleapis.com/v0/b/legajos-gtz.appspot.com/o/isotipo.png?alt=media&token=97625fb0-bc1c-420b-98cb-9deab0713e31" alt="GTZ" />
    <img className='logot' loading={'lazy'} src="https://firebasestorage.googleapis.com/v0/b/legajos-gtz.appspot.com/o/logotipo.png?alt=media&token=dd915362-9d7a-4c9b-a46e-69d03f17bf15" alt="GTZ" />
</div>
)


export default Logo;