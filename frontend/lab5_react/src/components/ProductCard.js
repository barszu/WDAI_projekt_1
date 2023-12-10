export const ProductCard = ({ title , description , price , thumbnail  }) => {
    return (
        <div className='product'>
            <img src={thumbnail} alt={title} />
            <div className="product-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <p className="price-style">{price} zl</p>
            </div>
        </div>
    );
};