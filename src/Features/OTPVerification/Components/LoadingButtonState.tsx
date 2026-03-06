import { ThreeDots } from "react-loader-spinner";

export default function LoadingButtonState() {
  return (
    <ThreeDots
      visible={true}
      height="60"
      width="60"
      color="#fff"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
