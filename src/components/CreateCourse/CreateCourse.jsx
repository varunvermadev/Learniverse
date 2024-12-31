import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import AuthorItem from "./components/AuthorItem";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import store from "../../store/store";
import { formatDuration } from "../../helpers/formatDuration";
import FormError from "../../common/FormError/FormError";
import Spinner from "../../common/Spinner/Spinner";
import { addAuthor, removeAuthor } from "../../store/authors/thunk";
import { createCourse, updateCourse } from "../../store/courses/thunks";

function CreateCourse({ formAction }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const handleSubmit = useSubmit();
  const formRef = useRef();
  const params = useParams();
  const authorsList = useSelector((store) => store.authors.authors);
  const currentCourse = useSelector((store) => {
    if (params.courseId) {
      return store.courses.courses.find(
        (course) => course.id === params.courseId
      );
    }
    return null;
  });

  const errors = useActionData();

  const [courseAuthorsList, setCourseAuthorsList] = useState([]);
  const dispatch = useDispatch();
  const [author, setAuthor] = useState("");
  const updateForm = formAction === "update";
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentCourse?.authors) {
      setCourseAuthorsList(currentCourse.authors);
    }
    if (currentCourse?.duration) {
      setDuration(currentCourse?.duration);
    }
  }, [currentCourse]);

  if (navigation.state === "submitting") return <Spinner />;

  return (
    <section className="px-5 py-10 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {updateForm ? "Edit Course" : "Create Course"}
      </h1>
      <Form
        className="space-y-5 sm:space-y-10 py-10 px-5 sm:px-10 backdrop-blur-sm bg-slate-500/10 border border-indigo-400 rounded-md"
        method="POST"
        ref={formRef}
        onSubmit={(e) => {
          handleSubmit(e.target);
        }}
      >
        <div className="space-y-3">
          <h2 className="font-semibold text-xl">Main Info</h2>
          <div>
            <Input
              labelText={"Title"}
              placeholderText={"add title of the course e.g. Javascript.."}
              name={"title"}
              defaultValue={currentCourse?.title}
            />
            {errors?.title && <FormError message={errors.title} />}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-xs sm:text-base uppercase"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="add description about your course"
              rows={10}
              defaultValue={currentCourse?.description}
              className="resize-none bg-transparent text-sm sm:text-base placeholder:text-gray-400 text-slate-50 focus:outline-none focus:border-2 focus:border-indigo-400 py-2 px-3 rounded-md border-2 border-gray-300 "
            />
            {errors?.description && <FormError message={errors.description} />}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="font-semibold text-xl">Duration</h2>
          <div className="sm:w-1/2">
            <Input
              labelText={"duration"}
              placeholderText={"add duration in minutes"}
              name={"duration"}
              style={"secondary"}
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              defaultValue={currentCourse?.duration}
            >
              <div className="py-2 px-3 mt-1 sm:mt-0 font-bold bg-indigo-500/10 rounded-md">
                {formatDuration(duration)} hrs
              </div>
            </Input>
            {errors?.duration && <FormError message={errors.duration} />}
          </div>
        </div>
        <div className="grid grid-rows-[auto,1fr]  grid-cols-1 sm:grid-cols-[1fr,1fr] gap-y-5 sm:gap-10  ">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 ">
            <h2 className="font-semibold text-xl">Authors</h2>
            <div className="w-full ">
              <Input
                labelText={"Author Name"}
                placeholderText={"add author"}
                style={"secondary"}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <div className="mt-2 sm:mt-0">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (author.trim()) dispatch(addAuthor(author));
                      setAuthor("");
                    }}
                  >
                    create author
                  </Button>
                </div>
              </Input>
            </div>
          </div>
          <div className=" order-3  sm:order-none sm:row-span-2 sm:col-start-2 sm:col-end-4 space-y-3">
            <h2 className="font-semibold text-xl ">Course Authors</h2>
            <ul className="overflow-y-scroll  space-y-2 max-h-80 ">
              {courseAuthorsList?.map((authorId) => {
                const authorName = authorsList.find(
                  (author) => author.id === authorId
                )?.name;

                return (
                  <li key={authorId}>
                    <AuthorItem
                      authorName={authorName}
                      isCourseAuthorItem={true}
                      handleRemoveAuthorFromCourseList={(e) => {
                        e.preventDefault();
                        setCourseAuthorsList(
                          courseAuthorsList.filter((item) => item !== authorId)
                        );
                      }}
                    />
                  </li>
                );
              })}
              {errors?.authors && <FormError message={errors.authors} />}
            </ul>
          </div>
          <div className="space-y-3 sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-3">
            <h2 className="font-semibold text-xl">Authors List</h2>
            <ul className="overflow-y-scroll space-y-2 max-h-52 ">
              {authorsList?.map((el) => (
                <li key={el?.id}>
                  <AuthorItem
                    addAuthorToCourse={(e) => {
                      e.preventDefault();
                      if (
                        courseAuthorsList.find(
                          (authorId) => authorId === el?.id
                        )
                      )
                        return;
                      setCourseAuthorsList([...courseAuthorsList, el?.id]);
                    }}
                    handleRemoveAuthor={(e) => {
                      e.preventDefault();
                      dispatch(removeAuthor(el?.id));
                    }}
                    authorName={el?.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* hidden inputs */}

        <input
          type="hidden"
          name="authors"
          value={JSON.stringify(courseAuthorsList)}
        />

        <input
          type="hidden"
          name="id"
          value={params.courseId}
        />
      </Form>
      <div className="space-x-5 mt-5 text-end">
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
        {updateForm ? (
          <Button onClick={() => handleSubmit(formRef.current)}>
            Update Course
          </Button>
        ) : (
          <Button onClick={() => handleSubmit(formRef.current)}>
            create course
          </Button>
        )}
      </div>
    </section>
  );
}

export default CreateCourse;

export async function action({ request }) {
  const res = await request.formData();
  const formData = Object.fromEntries(res);

  console.log(formData);
  const error = validateForm(formData);
  if (Object.keys(error).length > 0) {
    return error;
  }

  if (formData.id) {
    store.dispatch(updateCourse(formData));
  } else {
    store.dispatch(createCourse(formData));
  }

  return redirect("/courses");
}

function validateForm({ title, description, duration, authors }) {
  const errors = {};
  if (!title) errors.title = "*Title is required.";

  if (!description) errors.description = "*Description is required.";

  if (!duration) errors.duration = "*Duration is required.";
  else if (duration < 30)
    errors.duration = "*Duration of course must be greater than 30 minutes.";

  if (JSON.parse(authors).length === 0)
    errors.authors =
      "*Course must have at least one author. Click '+' button to add authors from the authors list.";
  return errors;
}
