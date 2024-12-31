import Searchbar from "./components/Searchbar/Searchbar";
import Button from "../../common/Button/Button";
import { useEffect, useState } from "react";
import CourseCard from "./components/CourseCard/CourseCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Courses() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const data = useSelector((store) => store.courses.courses);
  const authorsList = useSelector((store) => store.authors.authors);
  const { isAuth } = useSelector((store) => store.user);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredCourses(data);
  }, [data.length, data]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredCourses(data);
      return;
    }
    setFilteredCourses(
      data?.filter((course) => {
        const isCourseFound = course.title
          .toLowerCase()
          .includes(query.toLowerCase());
        if (!isCourseFound) {
          setError("Course Not Found");
          return null;
        }
        setError("");
        return course;
      })
    );
  }, [query]);

  return (
    <section className=" px-5 py-10 sm:p-10 relative">
      <nav className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <div className="grow-[0.35]">
          <Searchbar
            handleSubmit={(e) => {
              e.preventDefault();
              if (!query.trim())
                setError("Please enter the course name or desc...");
            }}
            onChange={(e) => setQuery(e.target.value)}
            error={error}
          />
        </div>
        {isAuth ? (
          <div className="self-start">
            <Button
              onClick={() => {
                navigate("/courses/add");
              }}
            >
              Add New Course
            </Button>
          </div>
        ) : (
          ""
        )}
      </nav>
      <main>
        <ul className="flex flex-col gap-5">
          {filteredCourses.map((course) => {
            const authorsName = course.authors
              ?.map(
                (authorId) =>
                  authorsList?.find((author) => author.id === authorId)?.name
              )
              .join(", ");

            return (
              <li key={course.id}>
                <CourseCard
                  title={course.title}
                  desc={course.description}
                  duration={course.duration}
                  createdAt={course.creationDate}
                  authors={authorsName}
                  id={course.id}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </section>
  );
}

export default Courses;
