import CustomBanner from "../custom-banner/custom-banner.componet";
import { Fragment } from "react";
import Button from "../button/button.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import CategoryPreview from "../category-preview/category-preview.component";

const ShoppingComponent = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  console.log(categoriesMap);

  return (
    <div>
      <CustomBanner>
        <div className=" flex flex-col justify-center items-center">
          <h3 className=" text-4xl font-bold text-white mb-10">HOME / SHOP</h3>

          <Button type="button" buttonType="inverted">
            EXPLORE
          </Button>
        </div>
      </CustomBanner>

      <div className=" mt-12 relative">
      <div className=" text-center flex flex-col justify-center items-center tracking-wide">
              <h1 className=" tracking-widest font-serrat text-3xl">WELCOME TO OUR STORE</h1>
              <div className="  bg-[#FF01FD] h-1 w-24 rounded-md mt-3"></div>
      </div>

    </div>



      <Fragment>
        {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];


          return (
            <CategoryPreview key={title} products={products} title={title} />
          );
        })}
      </Fragment>
    </div>
  );
};

export default ShoppingComponent;
