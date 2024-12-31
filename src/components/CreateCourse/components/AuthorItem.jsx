import Button from "../../../common/Button/Button";
import { RiAddLargeFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

function AuthorItem({
  authorName,
  isCourseAuthorItem,
  handleRemoveAuthor,
  addAuthorToCourse,
  handleRemoveAuthorFromCourseList,
}) {
  return (
    <div className="flex py-2 px-3 bg-indigo-500/10 rounded-md items-center justify-between ">
      <h3>{authorName}</h3>
      <div className="space-x-5">
        {isCourseAuthorItem ? (
          <Button onClick={handleRemoveAuthorFromCourseList}>
            <RxCross1 />
          </Button>
        ) : (
          <>
            <Button onClick={addAuthorToCourse}>
              <RiAddLargeFill />
            </Button>
            <Button onClick={handleRemoveAuthor}>
              <RxCross1 />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthorItem;
