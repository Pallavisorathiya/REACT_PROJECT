import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteStudentAsync, getAllStudentAsync } from "../Services/Actions/studentAction";
import { Card, Form, InputGroup } from "react-bootstrap";
import Banner from "./Banner.jsx";
import ReactPaginate from "react-paginate";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import "./Home.css";
import Features from "./Features.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students = [], isError, isSearchActive } = useSelector(
    (state) => state.studentReducer || {}
  );

  const [search, setSearch] = useState("");
  const [sortData, setSortData] = useState("");         // "field,asc|desc"
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCat, setActiveCat] = useState("All");    // category chip
  const itemsPerPage = 4;

  useEffect(() => {
    if (!isSearchActive && (!students || students.length === 0)) {
      dispatch(getAllStudentAsync());
    }
  }, [dispatch, isSearchActive, students?.length]);

  // Unique categories from data
  const categoryList = useMemo(() => {
    let setCats = new Set();
    (students || []).forEach((s) => {
      let c = (s?.course || "Other").trim();
      if (c) setCats.add(c);
    });
    return ["All", ...Array.from(setCats).sort()];
  }, [students]);

  // Search + Category + Sort
  const filteredSorted = useMemo(() => {
    let list = Array.isArray(students) ? [...students] : [];

    if (activeCat && activeCat !== "All") {
      let c = activeCat.toLowerCase();
      list = list.filter(
        (s) => (s.course || "Other").trim().toLowerCase() === c
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          (s.fullName || "").toLowerCase().includes(q) ||
          (s.course || "").toLowerCase().includes(q) ||
          (s.rollNo || "").toLowerCase().includes(q) ||
          (s.email || "").toLowerCase().includes(q) ||
          (s.phone || "").toLowerCase().includes(q)
      );
    }

    if (sortData) {
      const [field, dir] = sortData.split(",");
      list.sort((a, b) => {
        const A = a?.[field],
          B = b?.[field];
        const nA = Number(A),
          nB = Number(B);
        if (!Number.isNaN(nA) && !Number.isNaN(nB)) {
          return dir === "asc" ? nA - nB : nB - nA;
        }
        return dir === "asc"
          ? String(A || "").localeCompare(String(B || ""))
          : String(B || "").localeCompare(String(A || ""));
      });
    }
    return list;
  }, [students, search, sortData, activeCat]);

  const pageCount = Math.ceil(filteredSorted.length / itemsPerPage) || 1;
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredSorted.slice(offset, offset + itemsPerPage);

  const handlePageClick = (e) => setCurrentPage(e.selected);
  const handleEdit = (id) => navigate(`/students/edit/${id}`);
  const handleDelete = (id) => dispatch(deleteStudentAsync(id));

  return (
    <>
      <Banner
        // title="Student Management System"
        // crumbs={["Home", "Student Management System"]}
      />

      {isError && <div className="text-danger text-center mt-3">{isError}</div>}

      {/* Discover + Chips */}
      <section className="discover-wrap">
        <h2 className="discover-title">Your Complete Student Management Solution</h2>
        <p className="discover-sub">
        Simplify student data, boost productivity, and manage everything from one dashboard.
        </p>

        <div className="chip-row" role="tablist" aria-label="Filter by category">
          {categoryList.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCat === cat}
              className={`chip ${activeCat === cat ? "active" : ""} cat-${cat
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              onClick={() => {
                setActiveCat(cat);
                setCurrentPage(0);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Top toolbar */}
      <div className="toolbar">
        <Form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(0);
          }}
          aria-label="Search students"
        >
          <InputGroup className="search-bar">
            <InputGroup.Text className="bg-transparent border-0">
              <IoSearch aria-hidden />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, roll no, course, email or phone"
              className="border-0 ps-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search text"
            />
            {search && (
              <InputGroup.Text
                className="bg-transparent border-0"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(0);
                }}
                style={{ cursor: "pointer" }}
                role="button"
                aria-label="Clear search"
                title="Clear search"
              >
                <IoCloseCircle className="text-secondary" />
              </InputGroup.Text>
            )}
          </InputGroup>
        </Form>

        <div className="sort-wrap">
          <select
            onChange={(e) => setSortData(e.target.value)}
            value={sortData}
            className="form-select sort-select"
            aria-label="Select sorting"
          >
            <option value="">Select Sorting</option>
            <option value="fullName,asc">Name - A to Z</option>
            <option value="fullName,desc">Name - Z to A</option>
            <option value="rollNo,asc">Roll No - Low to High</option>
            <option value="rollNo,desc">Roll No - High to Low</option>
            <option value="age,asc">Age - Low to High</option>
            <option value="age,desc">Age - High to Low</option>
            <option value="course,asc">Course - A to Z</option>
            <option value="course,desc">Course - Z to A</option>
          </select>
          <button
            type="button"
            className="btn-gradient"
            onClick={() => setCurrentPage(0)}
          >
            Sort
          </button>
        </div>
      </div>

      {/* Card grid */}
      <div className="row g-3 mt-3 w-100 mb-3 px-3">
        {currentItems.length ? (
          currentItems.map((st) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-3" key={st.id}>
              <Card className="student-card">
                {/* Hover-only actions */}
                <div className="action-fab">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleEdit(st.id)}
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleDelete(st.id)}
                    title="Delete"
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-outline-success btn-sm"
                    to={`/students/${st.id}`}
                    title="View"
                  >
                    View
                  </Link>
                </div>

                {/* Image banner */}
                <div className="img-wrap">
                  <img src={st.image} alt={st.fullName} />
                  <div className="img-grad" />
                  {/* <div className="img-cap">
                    <span className="cap-name">{st.fullName}</span>
                    {st.course && (
                      <span className="cap-chip">
                        {(st.course || "").toUpperCase()}
                      </span>
                    )}
                  </div> */}
                </div>

                {/* Meta */}
                <div className="meta">
                  <div className="rowline">
                    <span className="lbl">Name</span>
                    <span className="val">{st.fullName || "-"}</span>
                  </div>
                  <div className="rowline">
                    <span className="lbl">Course</span>
                    <span className="val">{st.course || "-"}</span>
                  </div>
                  <div className="rowline">
                    <span className="lbl">Roll</span>
                    <span className="val">{st.rollNo || "-"}</span>
                  </div>
                  <div className="rowline">
                    <span className="lbl">Age</span>
                    <span className="val">{st.age || "-"}</span>
                  </div>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <div className="text-center w-100 mt-5">
            <p>No students found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
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
      <Features/>
    </>
  );
};

export default Home;
