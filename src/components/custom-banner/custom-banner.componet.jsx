// eslint-disable-next-line react/prop-types
const CustomBanner = ({ children }) => {
  return (
    <div className=" bg-banner4 bg-cover bg-no-repeat  flex flex-col justify-center font-serrat px-10 h-[100vh] lg:h-[80vh]">
      {children}
    </div>
  );
};

export default CustomBanner;
