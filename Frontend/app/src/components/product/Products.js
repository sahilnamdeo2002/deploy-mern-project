import React, { Fragment, useEffect, useState } from 'react'
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from '../../actions/productaction.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../layout/Loader/Loader.js';
import ProductCard from "../Home/ProductCard.js";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from 'react-router-dom';


const categories = [
    "Apple",
    "SamSung",
    "RealMe",
    "Redmi Note",
    "Laptop",
    "Footwear",
    "SunGlasses",
    "TeleVision",
];






const Products = () => {


    const dispatch = useDispatch();
    const {keyword} = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 2500000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    const {
        products,
        loading,
        error,
        productcount,
        resultPerPage,
        filterProductsCount } = useSelector((state) => state.products)



    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        event.preventDefault();
        setPrice(newPrice);
    }

    let count = filterProductsCount;

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, error]);


    return (
        < Fragment>
            {loading ? (
                <Loader />
            ) : (<Fragment>
                <MetaData title="PRODUCTS -- ECOMMERCE" />
                <h2 className='productsHeading'>Products</h2>


                <div className='products'>
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>






                {/* PRICE SLIDAR BAR */}
                <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={2500000}
                      
                    />

                    <Typography>Categories</Typography>
                    <ul className='categoryBox'>
                        {categories.map((category) => (
                            <li
                                className='category-link'
                                key={category}
                                onClick={() => setCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>

                    <fieldset>
                        <Typography component="legend">Rating  Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => {

                                setRatings(newRating);
                            }}
                            aria-labelledby='continous-slider'
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        >

                        </Slider>
                    </fieldset>


                </div>





                {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productcount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        >
                        </Pagination>
                    </div>
                )}
            </Fragment>
            )}
        </Fragment>
    )
}

export default Products
