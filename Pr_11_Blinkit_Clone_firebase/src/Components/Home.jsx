import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProductAsync, getAllProductAsync } from "../Services/Actions/productAction";
import { Button, Spinner, Card, Form, InputGroup } from "react-bootstrap";
import StaticElem from './StaticElements';
import { useNavigate } from "react-router";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import time from "../assets/time.avif";
import Categories from "./Categories";
import ReactPaginate from "react-paginate";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, isSearchActive } = useSelector(
    (state) => state.productReducer
  );
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortData, setSortData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [filteredData, setFilteredData] = useState([]);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  const handleSearch = () => {
    let filtered = products.filter(
      (prod) =>
        prod.title.toLowerCase().includes(search.toLowerCase()) ||
        String(prod.price) === search ||
        prod.category?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(0);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredData(products);
    setCurrentPage(0);
  };

  const handleSorting = () => {
    let sorted = [...filteredData];
    const [field, type] = sortData.split(",");

    if (field && type) {
      sorted.sort((a, b) => {
        if (field === "price") {
          return type === "asc" ? a.price - b.price : b.price - a.price;
        } else {
          return type === "asc"
            ? a[field]?.localeCompare(b[field])
            : b[field]?.localeCompare(a[field]);
        }
      });
      setFilteredData(sorted);
      setCurrentPage(0);
    }
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    if (!isSearchActive && products.length === 0) {
      dispatch(getAllProductAsync());
    }
  }, [dispatch, isSearchActive, products.length]);

  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  return (
    <>
      {isLoading ? (
        <div className="spinner">
          <Spinner animation="border" variant="success" />
        </div>
      ) : isError ? (
        <div className="text-danger text-center mt-5">{isError}</div>
      ) : (
        <>
          <StaticElem />
          <Categories />

          {/* 🔍 Search + Sort */}
          <div className="d-flex flex-wrap gap-2 my-3 px-3 align-items-center justify-content-between">
            <Form
              className="flex-grow-1 me-1 ms-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              style={{ maxWidth: "600px" }}
            >
              <InputGroup style={{ background: "#f8f8f8" }}>
                <InputGroup.Text
                  className="bg-transparent border-0"
                  onClick={handleSearch}
                  style={{ cursor: "pointer" }}
                >
                  <IoSearch className="fs-5 search" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by title, price or category"
                  className="border-0 ps-0"
                  style={{ background: "#f8f8f8" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <InputGroup.Text
                    className="bg-transparent border-0"
                    onClick={handleClear}
                    style={{ cursor: "pointer" }}
                  >
                    <IoCloseCircle className="fs-5 text-secondary clear" />
                  </InputGroup.Text>
                )}
              </InputGroup>
            </Form>

            <div className="d-flex align-items-center gap-2 ms-4">
              <select
                onChange={(e) => setSortData(e.target.value)}
                defaultValue=""
                className="form-select"
                style={{ maxWidth: "200px" }}
              >
                <option value="">Select Sorting</option>
                <option value="title,asc">Name - A to Z</option>
                <option value="title,desc">Name - Z to A</option>
                <option value="price,asc">Price - Low to High</option>
                <option value="price,desc">Price - High to Low</option>
                <option value="category,asc">Category - A to Z</option>
                <option value="category,desc">Category - Z to A</option>
              </select>
              <Button className="short-button" onClick={handleSorting}>
                Sort
              </Button>
            </div>
          </div>

          {/* 🛒 Product Cards */}
          <div className="row g-3 mt-3 w-100 mb-3 px-3">
            {currentItems.length > 0 ? (
              currentItems.map((prod) => (
                <div
                  className="col-6 col-sm-4 col-md-3 col-lg-2"
                  key={prod.id}
                >
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={prod.image}
                      alt="img"
                      className="product-img"
                    />

                    <div className="time-tag text-muted d-flex mb-2 fw-bold rounded-2">
                      <img
                        src={time}
                        alt="time"
                        className="me-1 my-1"
                        style={{ width: "11px", height: "11px" }}
                      />
                      <span className="pt-1">11 mins</span>
                    </div>

                    <Card.Body className="p-0 d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title as="h6" className="mb-2 fw-semibold title">
                          {prod.title}
                        </Card.Title>
                        <small className="amount">{prod.amount}</small>
                      </div>

                      <div>
                        <div className="fw-bold mt-2 price">
                          ₹{prod.price}
                        </div>
                        <div className="action-buttons d-flex mt-2 gap-2">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleEdit(prod.id)}
                          >
                            <TbEdit />
                          </Button>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleDelete(prod.id)}
                          >
                            <AiOutlineDelete />
                          </Button>
                          <Link
                            to={`/product/${prod.id}`}
                            className="btn btn-outline-success btn-sm"
                          >
                            <GrView />
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <div className="text-center w-100 mt-5">
                <p>No products found.</p>
              </div>
            )}
          </div>

          {/* 📄 Pagination */}
          <div className="d-flex justify-content-center mt-4 ">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< Prev"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
