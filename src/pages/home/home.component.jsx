import Button from "../../components/button/button.component";
import Carousel from "../../components/carousel/carousel.component";
import CustomBanner from "../../components/custom-banner/custom-banner.componet";
import Footer from "../../components/footer/footer.component";
import PopularCategories from "../../components/popular-categories/popular-categories";

const Home = () => {
  return (
    <div>
      <Carousel />
      <PopularCategories />

      <CustomBanner>
        <div>
          <h3 className=" text-4xl font-bold text-[#FF01FD] mb-10">
            APEKKY STORE
          </h3>

          <h1 className=" text-white text-3xl  lg:w-[40vw] ">
            Offers the Best Skincare Products made with the world finest
          </h1>

          <p className=" mt-5 lg:w-[30vw] mb-10">
            Balance, purify, and heal your skin with Monastery. Ingredients of
            the highest quality.
          </p>

          <Button type="button" buttonType="inverted">
            SHOP NOW
          </Button>
        </div>
      </CustomBanner>

      <Footer />
    </div>
  );
};

export default Home;
