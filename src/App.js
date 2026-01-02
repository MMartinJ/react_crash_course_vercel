import { Fragment } from "react/jsx-runtime";
import { ProductCard } from "./components/ProductCard";
import { ProductList } from "./components/ProductList";
import styles from "./App.module.css";
import { ProductFilter } from "./components/ProductFilter";
import { useState } from "react";
import { products as productsData } from "./data/products";


function App() {
  const [products, setProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    price: {
      min: 0,
      max: 999,
    },
    other: "other value",
  });

  const [favorites, setFavorites] = useState([]);

  function handlePurchase(productId, stockCount){
      setProducts(prevProducts=>prevProducts.map((product)=>product.id === productId ? {...product, stockCount} : product))
  }

  function handleFilter(key, value){
    setFilters((prevFilters) => ({
      ...prevFilters,
      price:{...prevFilters.price,[key]:value}
    }));
  }

  function handleFavorite(productId){
    if(favorites.includes(productId) ){
      setFavorites(favorites.filter(item => item !== productId));
    }
    else{
      setFavorites((prevFav) => [...prevFav, productId]);
    }
  }

  return (
    
    <div className={styles.App}>

      <h2>Products</h2>
      
      <ProductList>
        {products.map((product) => (
            <ProductCard key={product.title} width="96px" height="96px" onPurchase={handlePurchase} product={product}  onFavorite={handleFavorite} isFavorite={favorites.includes(product.id)} />
        ))}
      </ProductList>

      <h2>Products filtered by price</h2>
      <ProductFilter filters={filters} onFilter={handleFilter}/>
      
        {products.filter(({price}) => price <= filters.price.max && price >= filters.price.min).map(({title, price}) => (
          <Fragment key={title}>
            <p key={title} className={styles.ListTitle}>
              {title} cost ${price}
            </p>
            <hr className={styles.ListDivider}/>
          </Fragment>
        ))}
      
    </div>
    
  );
}

export default App;