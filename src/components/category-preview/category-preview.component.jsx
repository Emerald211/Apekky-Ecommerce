import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";
import {GrFormNext} from 'react-icons/gr'

// eslint-disable-next-line react/prop-types
const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container px-5 md:px-12 mt-12">
      <h2>
        <Link className="title flex items-center font-serrat" to={title}>
          {title.toUpperCase()} <GrFormNext />
        </Link>
      </h2>

      <div className="grid mt-8 gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => {
            return <ProductCard key={product.id} products={product} />;
          })}
      </div>
    </div>
  );
};

export default CategoryPreview;
