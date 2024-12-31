import { useNavigate } from "react-router";
import Button from "../../common/Button/Button";
import { useSelector } from "react-redux";

function EmptyCourseList() {
  const navigate = useNavigate();
  const isAdmin = useSelector((store) => store.user.role) === "ADMIN";

  return (
    <section className="px-5 py-10 sm:p-10 flex items-center h-screen justify-center flex-col gap-5 text-center">
      {!isAdmin ? (
        <>
          <p className="text-3xl font-light ">
            "You don't have permissions to create a course. Please log in as
            ADMIN"
          </p>
          <Button onClick={() => navigate("/login")}>Login as ADMIN</Button>
        </>
      ) : (
        <>
          <p className="text-3xl font-light ">
            "Please use 'Add New Course' button to add new course"
          </p>
          <Button onClick={() => navigate("/course/add")}>
            Add new course
          </Button>
        </>
      )}
    </section>
  );
}

export default EmptyCourseList;
