import ProductCard from "./../../components/ProductCard";
import { Link } from "react-router-dom";
import Pagination from "./../../components/Pagination";
import { useState, useEffect } from "react";
import { requestBackend } from "../../util/requests";
import CardLoader from "./CardLoader";
import "./styles.css";
import { productPageMock } from "../../util/mockData";

const Catalog = () => {
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [parametros, setParametros] = useState({
    method: "GET",
    url: "/products",
    params: {
      page: 0,
      size: 8,
    },
  });

  useEffect(() => {
    getProducts(0);
  }, []);

  const getProducts = (pageNumber) => {
    setIsLoading(true);
    const newParametros = {
      ...parametros,
      params: { ...parametros.params, page: pageNumber ?? 0 },
    };
    setParametros(parametros);
    requestBackend(newParametros)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Catálogo de produtos</h1>
      </div>
      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to={`/produtos/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="row">
        <Pagination
          pageCount={page && page.totalPages ? page.totalPages : 0}
          range={3}
          onChange={getProducts}
        />
      </div>
    </div>
  );
};

export default Catalog;
