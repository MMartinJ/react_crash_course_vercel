import { useState } from 'react';
import styles from './ProductCard.module.css'

export function ProductCard({ product, background="slategray", onPurchase, onFavorite, isFavorite }){
  
  const [showMore, setShowMore] = useState()
  
  function handleClick(){
    onPurchase(product.id, product.stockCount - 1)
  }
  function handleTwoClicks(){
    onPurchase(product.id, product.stockCount - 2)
  }
  

  return (
      <article className={styles.Container} style={{background}}>
        <button className={styles.Favorite} onClick={() => onFavorite(product.id)}>{isFavorite ? "❤️" : "🤍" }</button>
        <h2>{product.title}</h2>
        <img
        src={product.imageSrc}
        alt={product.title}
        width={128}
        height={128}
        />
        <p>Specification</p>
        <button onClick={() => setShowMore(!showMore)}>{showMore? 'Hide' : 'Show'}</button>
        {showMore &&
        <ul className={styles.Spec}>
          {product.specification.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>}
        <Status stockCount={product.stockCount}/>
        
        {product.stockCount > 0 && (
          <>
            <p>Price: ${product.price}</p>
            <button onClick={handleClick}>Buy</button>
          </>
        )}
        {product.stockCount >= 2 && ( 
          <button onClick={handleTwoClicks}>Buy two</button>
        )}
      </article>
    
  );
} 

export function Status({stockCount}){
  const statusNoAvailable = <p className={styles.StatusNotAvailable}>No items available</p>;
  const statusAvailable = <p className={styles.StatusAvailable}>Items available: {stockCount}</p>;
  
  return (stockCount === 0) ? statusNoAvailable : statusAvailable;
}