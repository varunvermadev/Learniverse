import { useNavigate, useParams } from "react-router";
import { formatDuration } from "../../helpers/formatDuration";
import { formatDate } from "../../helpers/formatDate";
import Button from "../../common/Button/Button";
import { useSelector } from "react-redux";

function CourseInfo() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses } = useSelector((store) => store.courses);
  const authorsList = useSelector((store) => store.authors.authors);

  const course = courses?.find((course) => course.id === courseId);

  const authors = course?.authors
    .map(
      (authorId) => authorsList.find((author) => author.id === authorId)?.name
    )
    ?.join(", ");
  const { title, description, id, creationDate, duration } = course;
  return (
    <section className=" px-5 py-10 sm:p-10 space-y-5 ">
      <h1 className="text-2xl font-semibold capitalize">{title}</h1>
      <main className="flex flex-col sm:flex-row gap-5 px-2 py-4 sm:p-8 rounded-md border-indigo-400 border-2 bg-slate-700/10 shadow-md">
        <div className="basis-2/3">
          <h2 className="font-semibold text-lg mb-2">Description : </h2>
          <p className="">{description}</p>
        </div>
        <ul className="space-y-2 divide-y divide-indigo-400 border-t py-5 sm:border-l-4 sm:py-0 sm:border-t-0 sm:px-5 border-indigo-400">
          <li className="flex ">
            <h3 className="font-semibold capitalize w-1/3">Id: </h3>
            <p className="w-2/3 text-ellipsis overflow-hidden ">{id}</p>
          </li>
          <li className="flex pt-2 ">
            <h3 className="font-semibold capitalize w-1/3">duration: </h3>
            <p>{formatDuration(duration)} hrs</p>
          </li>
          <li className="flex pt-2 ">
            <h3 className="font-semibold capitalize w-1/3">created: </h3>
            <p>{formatDate(creationDate)}</p>
          </li>
          <li className="flex pt-2 ">
            <h3 className="font-semibold capitalize w-1/3">Authors: </h3>
            <p>{authors}</p>
          </li>
        </ul>
      </main>
      <div className="text-right">
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </section>
  );
}

export default CourseInfo;
