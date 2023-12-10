import { ProductCard } from "./ProductCard.js";

export const ProductList = ({ list }) => {
    return (
        <ul className="list-class">
            {list.map(
                ({ title , description , price , thumbnail , id }) =>
                    <li key={id}>
                        <ProductCard title={title} description={description} price={price} thumbnail={thumbnail} />
                    </li>



            )}
        </ul>
    );
};
