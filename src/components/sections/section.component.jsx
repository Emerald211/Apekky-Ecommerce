import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { BsArrowLeftCircle } from "react-icons/bs";
import ProductCard from "../product-card/product-card.component";
import "./section.styles.scss";
const Sections = () => {

  

  const { section } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);

  const navigate = useNavigate()

  const [product, setProducts] = useState(categoriesMap[section]);

  useEffect(() => {
    setProducts(categoriesMap[section]);
  }, [section, categoriesMap]);

  return (
    <Fragment>
      <div className=" px-4 md:px-12">
        <div onClick={() =>  navigate("/shop")} className=" flex items-center text-xl text-main gap-3 mt-6 font-serrat">
          <BsArrowLeftCircle />
          <h1>Go Back</h1>
      </div>
        <h2 className="section-title font-serrat mt-4 md:mt-24">
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
