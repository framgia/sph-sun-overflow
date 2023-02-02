import { ThreeCircles } from "react-loader-spinner";

type LoaderProp = {
    color: string;
};

const ThreeCirclesSpinner = ({ color }: LoaderProp): JSX.Element => {
    return <ThreeCircles
        height="100"
        width="100"
        color={color}
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass="loading-screen"
        visible={true}
    />
};
  
export default ThreeCirclesSpinner;
