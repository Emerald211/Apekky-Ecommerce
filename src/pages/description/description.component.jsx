import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { selectCartItems } from "../../store/cart/cart.selector";
import { BsCurrencyEuro } from "react-icons/bs";
import { addItemToCart } from "../../store/cart/cart.action";
import { useState } from "react";

const Description = () => {

    const { id } = useParams();

    const [itemsAdd, setItemsAdd] = useState(false);

    const dispatch = useDispatch();
  

  
    const cartItem = useSelector(selectCartItems);
  
    const addToCartHandler = (products) => {
      setItemsAdd(true);
      dispatch(addItemToCart(cartItem, products));
    };
    
    const categories = useSelector(selectCategoriesMap)
    
      const findProductById = (productId, data) => {
        for (const category in data) {
          if (data.hasOwnProperty(category)) {
            const products = data[category];
              const foundProduct = products.find(product => product.id === productId);
              
              console.log(foundProduct);
            if (foundProduct) {
              return { category, product: foundProduct };
            }
          }
        }
        return null;
      };
    
    const productResult = findProductById(parseInt(id), categories);
    console.log(productResult);
    
      if (productResult) {
          const { category, product } = productResult;
          
         const  {imageUrl, name, price, } = product
        return (
            <div className=" flex flex-col justify-center items-center rounded-lg shadow dark:bg-white dark:border-gray-700">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={imageUrl}
                alt="product image"
              />
            </a>
            <div className="px-5 lg:px-24 pb-5">
              <a href="#">
                <h5 className=" text-sm md:text-xl font-semibold font-serrat tracking-tight text-gray-900 ">
                  {name}
                </h5>
                    </a>
                    <div className=" flex mt-4 flex-col text-[10px] lg:text-[13px] justify-center font-serrat text-gray-500 items-center">
                        <p>Discover the ultimate skincare essential for a flawless complexion. Our innovative skincare product is meticulously crafted to address all your skin concerns. Infused with powerful antioxidants and vitamins, it nourishes and protects your skin from environmental damage, while promoting a smooth and even skin tone. Experience the luxurious texture and refreshing scent as our product effortlessly absorbs into your skin, leaving it feeling soft, supple, and revitalized. Unleash the natural beauty of your skin with our transformative skincare solution and embrace a radiant and confident you.</p>
                    </div>
              <div className="flex items-center mt-2.5 mb-5">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  5.0
                </span>
              </div>
              <div className="flex gap-3 flex-col lg:flex-row lg:justify-between">
                <span className=" text-sm md:text-3xl flex items-center font-serrat font-bold text-gray-900 ">
                  <BsCurrencyEuro />
                  {price}
                </span>
    
                {itemsAdd ? (
                  <a
                  
                    className="text-white bg-black hover:bg-pink font-serrat focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] lg:text-[15px] md:text-sm px-1 md:px-5 py-2.5 text-center "
                  >
                    Added
                  </a>
                ) : (
                  <a
                    
                    className="text-white bg-main hover:bg-black font-serrat focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] lg:text-[15px] md:text-sm px-1 md:px-5 py-2.5 text-center "
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      }
    
      return <p>Product not found.</p>;
    }

export default Description;