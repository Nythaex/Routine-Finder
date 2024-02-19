import './Product.css'
import { useState } from 'react';

export default function Product ({product}) {
    const [liked, setLiked] = useState(sessionStorage.getItem(product.id));
    
    function onWishlistClick() {
        if(sessionStorage.getItem(product.id)) {
            sessionStorage.removeItem(product.id);
            setLiked(false);
        } else {
            sessionStorage.setItem(product.id,true);
            setLiked(true);
        }
    }

    return (
        <>
            <div className={`${sessionStorage.getItem(product.id) ? 'heart-icon-active' : ''} heart-icon`} onClick={()=>onWishlistClick()}></div>
            <img
                className='product-image'
                src={product.images[0].src}
                alt="img"/>
            <div className='product-info'>
                <h3>{product.title}</h3>
                <p>{`$${product.variants[0].price}`}</p>
            </div>
        </>
  )
}