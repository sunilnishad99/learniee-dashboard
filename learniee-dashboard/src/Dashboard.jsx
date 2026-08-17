import { useMemo, useState } from "react";
import { Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { courses } from "./data/courses";
import CourseCard from "./CourseCard";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("default");

  const [page, setPage] = useState(1);

  const coursesPerPage = 6;

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesSearch =
        course.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        course.subject
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesGrade =
        !grade || course.grade === grade;

      const matchesSubject =
        !subject ||
        course.subject === subject;

      let matchesPrice = true;

      if (price === "low") {
        matchesPrice = course.price < 700;
      }

      if (price === "medium") {
        matchesPrice =
          course.price >= 700 &&
          course.price <= 1000;
      }

      if (price === "high") {
        matchesPrice = course.price > 1000;
      }

      const matchesRating =
        !rating ||
        course.rating >= Number(rating);

      return (
        matchesSearch &&
        matchesGrade &&
        matchesSubject &&
        matchesPrice &&
        matchesRating
      );
    });

    if (sort === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [
    search,
    grade,
    subject,
    price,
    rating,
    sort,
  ]);

  const totalPages = Math.ceil(
    filteredCourses.length / coursesPerPage
  );

  const startIndex =
    (page - 1) * coursesPerPage;

  const visibleCourses =
    filteredCourses.slice(
      startIndex,
      startIndex + coursesPerPage
    );

  function clearFilters() {
    setSearch("");
    setGrade("");
    setSubject("");
    setPrice("");
    setRating("");
    setSort("default");
    setPage(1);
  }

  return (
    <div className="dashboard">

      {/* NAVBAR */}

      <header className="navbar">

        <h2>Learniee</h2>

        <div className="profile">

          <div className="avatar">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <b>{user?.name}</b>
            <small>Parent</small>
          </div>

          <button onClick={logout}>
            <LogOut size={17} />
          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="hero-section">

        <p>Hello, {user?.name} 👋</p>

        <h1>
          Find the right course
          for your child
        </h1>

        <p>
          Explore courses from trusted
          teachers and help your child
          learn better.
        </p>

      </section>

      {/* SEARCH */}

      <section className="courses-section">

        <div className="section-header">

          <div>
            <h2>Explore Courses</h2>
            <p>
              Search and filter courses
            </p>
          </div>

          <span>
            {filteredCourses.length} courses
          </span>

        </div>

        {/* SEARCH BAR */}

        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search course or subject..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

        </div>

        {/* FILTERS */}

        <div className="filters">

          <select
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              All Grades
            </option>

            <option value="Grade 4">
              Grade 4
            </option>

            <option value="Grade 5">
              Grade 5
            </option>

            <option value="Grade 6">
              Grade 6
            </option>

            <option value="Grade 7">
              Grade 7
            </option>

            <option value="Grade 8">
              Grade 8
            </option>

            <option value="Grade 9">
              Grade 9
            </option>

          </select>

          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              All Subjects
            </option>

            <option value="Mathematics">
              Mathematics
            </option>

            <option value="English">
              English
            </option>

            <option value="Science">
              Science
            </option>

            <option value="Physics">
              Physics
            </option>

            <option value="Biology">
              Biology
            </option>

            <option value="Chemistry">
              Chemistry
            </option>

            <option value="Computer Science">
              Computer Science
            </option>

          </select>

          <select
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              Any Price
            </option>

            <option value="low">
              Under ₹700
            </option>

            <option value="medium">
              ₹700 - ₹1000
            </option>

            <option value="high">
              Above ₹1000
            </option>

          </select>

          <select
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              Any Rating
            </option>

            <option value="4.5">
              4.5+
            </option>

            <option value="4.7">
              4.7+
            </option>

            <option value="4.8">
              4.8+
            </option>

          </select>

          <button
            className="clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

        {/* SORT */}

        <div className="sort">

          <span>
            Showing {filteredCourses.length} courses
          </span>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="default">
              Sort by
            </option>

            <option value="rating">
              Top Rated
            </option>

            <option value="price-low">
              Price Low to High
            </option>

            <option value="price-high">
              Price High to Low
            </option>

          </select>

        </div>

        {/* COURSES */}

        {visibleCourses.length > 0 ? (

          <div className="course-grid">

            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}

          </div>

        ) : (

          <div className="no-results">

            <Search size={35} />

            <h3>
              No courses found
            </h3>

            <p>
              Try changing your filters
              or search keyword.
            </p>

            <button
              onClick={clearFilters}
            >
              Reset Filters
            </button>

          </div>

        )}

        {/* PAGINATION */}

        {totalPages > 1 && (

          <div className="pagination">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage(page - 1)
              }
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  className={
                    page === index + 1
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    setPage(index + 1)
                  }
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage(page + 1)
              }
            >
              Next
            </button>

          </div>

        )}

      </section>

    </div>
  );
}

export default Dashboard;