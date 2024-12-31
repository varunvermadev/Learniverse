import { useNavigate } from "react-router";
import Button from "../common/Button/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <section className=" px-5 py-10 sm:p-10 space-y-10 h-screen backdrop-blur-sm ">
      <div className="sm:w-1/2 mt-20">
        <h1 className="text-3xl sm:text-5xl text-gray-100 mb-2 font-semibold">
          All the skills you need in one place From critical skills to technical
        </h1>
        <p className="text-sm sm:text-2xl sm:mt-3 text-gray-400 ">
          topics, <span className="font-bold text-gray-50">Learniverse</span>{" "}
          supports your professional development.
        </p>
      </div>
      <div className="space-x-5">
        <Button
          btnType={"primary"}
          onClick={() => navigate("/registration")}
        >
          Register
        </Button>
        <Button
          btnType={"primary"}
          onClick={() => navigate("/courses")}
        >
          See Courses
        </Button>
      </div>
    </section>
  );
}

export default Home;
