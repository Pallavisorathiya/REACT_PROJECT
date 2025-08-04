import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductAsync,
} from "../Services/Actions/productAction";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import BannerSection from "./BannerSection";
import CategoryCards from "./CategoryCards";
import "./Home.css"

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  return (
    <>
      <BannerSection />
      <CategoryCards />

      <h2 className="text-center my-4">All Products</h2>

      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {products.map((prod) => (
              <div key={prod.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={prod.image}
                    className="card-img-top"
                    alt={prod.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{prod.title}</h5>
                    <p className="card-text">{prod.desc}</p>
                    <p>
                      <strong>Price:</strong> ₹{prod.price}
                    </p>
                    <p>
                      <strong>Category:</strong> {prod.category}
                    </p>
                    <div className="d-flex justify-content-between">
                      <Button className="edit-btn" onClick={() => handleEdit(prod.id)}>Edit</Button>
                      <Button className="edit-btn" onClick={() => handleDelete(prod.id)}>Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
