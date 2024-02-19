import { Link } from "react-router-dom";
import productsCollection from '../../resources/products-collection.jpeg'
import './ProductsCollection.css'
import { useContext, useEffect, useState } from "react";
import { DataContext } from '../../App';
import Product from "../product/Product";
import { GrFormNextLink } from "react-icons/gr";

function sortProducts(p1, p2) {
    if (sessionStorage.getItem(p2.id)) {
        return 1;
    }
    if (sessionStorage.getItem(p1.id)) {
        return -1;
    }
    return 0;
}

export default function ProductsCollection() {
    const { givenAnswers } = useContext(DataContext);
    const [products, setProducts] = useState(null);
    const [index, setIndex] = useState(0);

    function onNextProducts () {
        if (index + 2 >= products.length) {
            setIndex(0); 
        } else {
            setIndex(index + 2);
        }
    }
    
    useEffect(() => {
        if (sessionStorage.getItem('products')) {
            setProducts(JSON.parse(sessionStorage.getItem('products')).sort(sortProducts));
        } else {
            fetch('https://jeval.com.au/collections/hair-care/products.json', {
                method: "GET",
            })
            .then(response => response.json())
            .then(data => {
                let filteredData = data.products.filter(product => {
                    let filtered = false;
                    Object.values(givenAnswers).forEach((answer) => {
                        answer.split("/").forEach((a) => {
                            if(product.title.toLowerCase().includes(a.toLowerCase()) || product.tags.includes(a) || product.body_html.toLowerCase().includes(a.toLowerCase())) {
                                filtered = true;
                                return ;
                            }
                        })
                    });
                    if (filtered) {
                        return true;
                    }
                    return false;
                }).sort(sortProducts);
                setProducts(filteredData);
                sessionStorage.setItem('products', JSON.stringify(filteredData));
            })
            .catch(error => console.error('Error fetching products:', error));   
        }
    }, [])
    let li =[...Array(Math.ceil(products ? products.length / 2 : 0))].map((e, i) => <li className={`dot ${index / 2 == i ? 'active' : ''}`} key={i}></li>)


    return (
        <>
            <img
                className="collection-picture"
                src={productsCollection}
                alt="img"/>
            <div className="content-container">
                    <h1>Build you everyday self care routine.</h1>
                    <p>Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture.
                        With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day.</p>

                <Link to={`/`}>
                    <button className="retake" type="button" onClick={() => sessionStorage.removeItem('products')}>Retake the quiz</button>
                </Link>
            </div>

            <div className="products-container">
                <div className="product-card products-info">
                    <div>
                        <h2>
                            Daily routine
                        </h2>
                        <p>
                            Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture.
                            With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for.
                            And by choosing relaxing fragrances you can add a moment of calm to the end of your day.
                        </p>
                    </div>
                </div>
                {products && products[index] ? (
                    <div className="product-card">
                        <Product product={products[index]}/>    
                    </div>
                ) : <div></div>}
                {products && products[index+1] ? (
                    <div className="product-card">
                        <Product product={products[index+1]}/>    
                    </div>
                ) : <div></div>}
            </div>
            <button className="next-products" onClick={()=>onNextProducts()} style={{display: products && products.length > 0 ? 'block' : 'none' }}>
                <GrFormNextLink />
            </button>

            <ul className="carousel-indicators">
                {li}
            </ul>
        </>
  )
}
