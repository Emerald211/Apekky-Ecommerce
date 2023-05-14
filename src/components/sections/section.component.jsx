import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../product-card/product-card.component";
import "./section.styles.scss";
const Sections = () => {
  const { section } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);

  const [product, setProducts] = useState(categoriesMap[section]);

  useEffect(() => {
    setProducts(categoriesMap[section]);
  }, [section, categoriesMap]);

  return (
    <Fragment>
      <div className=" px-4 md:px-12">
        <h2 className="section-title font-serrat mt-12 md:mt-24">
          {section.toLocaleUpperCase()}
        </h2>

        <div className=" section-container grid grid-cols-2 lg:grid-cols-4">
          {product &&
            product.map((eachproduct) => (
              <ProductCard key={eachproduct.id} products={eachproduct} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Sections;
