import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="white"
      ariaLabel="three-dots-loading"
      visible={true}
      wrapperClass="loader"
    />
  );
}

export default Loader;
