import ProductCard from "./ProductCard";

const ProductsList = ({ list }) => {
  return (
    <ul className="list-class">
      {list?.map(({ id, title, description, price, thumbnail }) => (
        <li key={id}>
          <ProductCard
            id={id}
            title={title}
            description={description}
            price={price}
            thumbnail={thumbnail}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
