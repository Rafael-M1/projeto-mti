import { formatPrice } from './../../util/formatters';
import './styles.css';

const ProductPrice = ({ price }) => {
  return (
    <div className="product-price-container">
      <span>R$</span>
      <h3>{formatPrice(price)}</h3>
    </div>
  );
};

export default ProductPrice;
