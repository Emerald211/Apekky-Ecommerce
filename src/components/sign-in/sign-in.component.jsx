import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.component";
import { SignInWithGooglePopup } from "../../utils/firebase/firebase.component";

const SignIn = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmitAction = async (data) => {
    const { email, password } = data;
    navigate("/checkout");

    await createAuthUserWithEmailAndPassword(email, password);
  };

  const googleSignInHandler = async () => {
    await SignInWithGooglePopup();

    navigate("/shop");
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" flex flex-col justify-center items-center z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <button
              onClick={() => navigate("/shop")}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-main hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-main dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-main">
                Sign in to our platform
              </h3>
              <form
                onSubmit={handleSubmit(onSubmitAction)}
                className="space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    name="email"
                    id="email"
                    className=" border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-main dark:bg-white dark:text-black"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-main dark:text-black"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <a
                    href="#"
                    className="text-blue-700 hover:underline dark:text-main"
                  >
                    Or Continue with
                  </a>
                </div>

                <GoogleButton onClick={googleSignInHandler} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
