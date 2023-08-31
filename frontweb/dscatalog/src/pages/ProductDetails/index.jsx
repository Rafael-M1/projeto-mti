import { ReactComponent as ArrowIcon } from "./../../assets/images/arrow.svg";
import axios from "axios";
import ProductPrice from "./../../components/ProductPrice";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../util/requests";
import ProductInfoLoader from "./ProductInfoLoader";
import ProductDetailsLoader from "./ProductDetailsLoader";
import { productPageMock } from "../../util/mockData";

import "./styles.css";

const ProductDetails = () => {
  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState();

  useEffect(() => {
    setIsLoading(true);
    let element = productPageMock.content.filter(
      (product) => product.id == productId
    )[0];
    if (element) {
      console.log(element);
      setProduct(element);
    }
    // axios
    //   .get(`${BASE_URL}/products/${productId}`)
    //   .then((response) => {
    //     setProduct(response.data);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    setIsLoading(false);
  }, [productId]);

  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <Link to="/produtos">
          <div className="goback-container">
            <ArrowIcon />
            <h2>Voltar</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            {isLoading ? (
              <ProductInfoLoader />
            ) : (
              <>
                <div className="img-container">
                  <img src={product?.imgUrl} alt={product?.name} />
                </div>
                <div className="name-price-container">
                  <h1>{product?.name}</h1>
                  {product && <ProductPrice price={product?.price} />}
                </div>
              </>
            )}
          </div>
          <div className="col-xl-6">
            {isLoading ? (
              <ProductDetailsLoader />
            ) : (
              <div className="description-container">
                <h2>Descrição do produto</h2>
                <p>{product?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
