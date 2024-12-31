import Button from "../../../../common/Button/Button";
import { FaPen, FaTrashRestore } from "react-icons/fa";
import { formatDate } from "../../../../helpers/formatDate";
import { formatDuration } from "../../../../helpers/formatDuration";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../../../store/courses/thunks";

function CourseCard({ title, desc, duration, createdAt, authors, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, role } = useSelector((store) => store.user);
  const isAdmin = role === "ADMIN";

  function deleteCourseFromStore() {
    if (id) {
      dispatch(deleteCourse(id));
    }
  }

  return (
    <article className="p-4 gap-4 sm:gap-y-5 border-[1px]  border-indigo-400 sm:gap-x-8 grid grid-rows-[auto,1fr,auto] grid-cols-5 w-full sm:py-8 sm:px-12  mt-5 sm:mt-10 rounded-lg bg-slate-500/10 backdrop-blur-sm shadow-md">
      <h2 className="text-xl font-bold tracking-wider col-span-full capitalize">
        {title}
      </h2>
      <div className="col-span-full row-start-2 -row-end-1 sm:col-span-3 text-justify">
        <p className=" text-sm sm:text-base ">{desc}</p>
      </div>
      <ul className="divide-y divide-gray-400 space-y-2 col-span-full sm:col-start-4 sm:col-end-6    ">
        <li className=" flex items-center    ">
          <h3 className=" w-24 font-semibold ">Authors: </h3>
          <p className=" w-40 sm:w-3/4 text-ellipsis overflow-hidden whitespace-nowrap capitalize">
            {authors}
          </p>
        </li>
        <li className=" flex items-center  pt-2 ">
          <h3 className=" w-24 font-semibold ">Duration: </h3>
          <p className="">{formatDuration(duration)} Hrs</p>
        </li>
        <li className=" flex items-center  pt-2 ">
          <h3 className=" w-24 font-semibold ">Created At: </h3>
          <p className="">{formatDate(createdAt)}</p>
        </li>
      </ul>
      <div className="flex gap-5 items-center  col-span-full sm:col-start-4 sm:col-end-6">
        <div className="mt-5">
          <Button onClick={() => navigate(`/courses/${id}`)}>
            Show Course
          </Button>
        </div>
        {isAuth && isAdmin ? (
          <>
            <div className="hidden sm:block mt-5">
              <Button onClick={deleteCourseFromStore}>
                <FaTrashRestore className="text-gray-50 text-lg" />
              </Button>
            </div>
            <div className="hidden sm:block mt-5">
              <Button onClick={() => navigate(`/courses/update/${id}`)}>
                <FaPen className="text-lg text-gray-50" />
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}

export default CourseCard;
