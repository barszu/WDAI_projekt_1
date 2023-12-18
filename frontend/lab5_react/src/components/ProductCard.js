import { Link } from "react-router-dom";

// wyglad produktu , z mozliwoscia edycji

const ProductCard = ({ id, title, description, price, thumbnail }) => {
  const productEditUrl = `/product/edit/${id}`;

  return (
    <div className="product">
      <img src={thumbnail} alt={title} loading="lazy" />
      <div className="product-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="price-style">{price} zl</p>
        <Link to={productEditUrl}>Edit product</Link>
      </div>
    </div>
  );
};

export default ProductCard;
