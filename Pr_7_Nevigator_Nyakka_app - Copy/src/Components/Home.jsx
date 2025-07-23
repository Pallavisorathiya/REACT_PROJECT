import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../Services/StorageData";
import { Badge, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import "./Header.css";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortData, setSortData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    const data = getStorageData();
    const updatedData = data.filter((product) => product.id !== id);
    setStorageData(updatedData);
    setProductData(updatedData);
    setFilteredData(updatedData);
  };

  const handleSearch = () => {
    const data = getStorageData();
    const filtered = data.filter(
      (prod) =>
        prod.title.toLowerCase() === search.toLowerCase() ||
        String(prod.price) === search ||
        prod.category.toLowerCase() === search.toLowerCase()
    );
    setFilteredData(filtered);
    setSearch("");
    setCurrentPage(0);
  };

  const handleClear = () => {
    const data = getStorageData();
    setFilteredData(data);
    setCurrentPage(0);
  };

  const handleSorting = () => {
    const data = getStorageData();
    let sorted = [...data];
    const [field, type] = sortData.split(",");

    if (field && type) {
      sorted.sort((a, b) => {
        if (field === "price") {
          return type === "asc" ? a.price - b.price : b.price - a.price;
        } else {
          return type === "asc"
            ? a[field].localeCompare(b[field])
            : b[field].localeCompare(a[field]);
        }
      });
      setFilteredData(sorted);
      setCurrentPage(0);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const data = getStorageData();
    setProductData(data);
    setFilteredData(data);
  }, []);

  return (
    <>
      <h1 className="text-center my-4" style={{ color: "#c2185b" }}> All Products</h1>

      <div className="search-sort-controls">
        <input type="text"placeholder="Search by title, price or category"value={search}onChange={(e) => setSearch(e.target.value)}/>
        <Button onClick={handleSearch}style={{ backgroundColor: "#fc2779", border: "none" }}>Search</Button>
        <Button onClick={handleClear} variant="secondary">Clear</Button>
        <select onChange={(e) => setSortData(e.target.value)} defaultValue="">
          <option value="">Select for Sorting</option>
          <option value="title,asc">Name - A to Z</option>
          <option value="title,desc">Name - Z to A</option>
          <option value="price,asc">Price - Low to High</option>
          <option value="price,desc">Price - High to Low</option>
          <option value="category,asc">Category - A to Z</option>
          <option value="category,desc">Category - Z to A</option>
        </select>
        <Button onClick={handleSorting}style={{ backgroundColor: "#fc2779", border: "none" }} >Sort
        </Button>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {currentItems.map((product) => (
          <Card className="custom-card" key={product.id}>
            <Card.Img variant="top" src={product.image} className="card-img-top" />
            <Card.Body>
              <Card.Title>{product.title} - {product.id}</Card.Title>
              <Card.Text>{product.desc}</Card.Text>
              <Card.Text><strong>Price:</strong> ₹{product.price}</Card.Text>
              <span className="custom-btn">{product.category}</span>
              <br />
              <br />
              <div className="d-flex justify-content-center gap-3">
                <Button onClick={() => handleEdit(product.id)} variant="warning">Edit
                </Button>
                <Button onClick={() => handleDelete(product.id)}variant="danger">Delete</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
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
  );
};

export default Home;
