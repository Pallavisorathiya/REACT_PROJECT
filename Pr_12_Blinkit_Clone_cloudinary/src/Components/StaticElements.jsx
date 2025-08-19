import { Row } from "react-bootstrap";
import banner from "../assets/banner.webp";
import img1 from "../assets/img-1.avif";
import img2 from "../assets/img-2.avif";
import img3 from "../assets/img-3.avif";
import "./StaticElement.css";

const StaticElem = () => {
  return (
    <div className="w-100">
      <Row className="m-0">
        <img src={banner} alt="banner" className="p-0 w-100" />
      </Row>
      <Row className="m-0">
        <div className="images d-flex mt-3 mb-2 w-100">
          <div className="img-1">
            <img src={img1} alt="img1" className="img ms-1" />
          </div>
          <div className="img-2">
            <img src={img2} alt="img2" className="img" />
          </div>
          <div className="img-3">
            <img src={img3} alt="img3" className="img" />
          </div>
        </div>
      </Row>
    </div>
  );
};

export default StaticElem;
