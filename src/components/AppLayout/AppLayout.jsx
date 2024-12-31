import { Outlet, useNavigate } from "react-router";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../services/services";
import { fetchLogin } from "../../store/user/thunk";
import { saveCourses } from "../../store/courses/thunks";
import { saveAuthors } from "../../store/authors/thunk";
import bgImg from "../../../public/bg-image.jpg";

function AppLayout() {
  const dispatch = useDispatch();

  // getting user details as the app on mount

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { result } = await getUser();
      dispatch(fetchLogin(result));
    }
    fetchUser();
  }, []);

  useEffect(() => {
    dispatch(saveCourses());
    dispatch(saveAuthors());
  }, []);

  return (
    <div
      className={`grid grid-rows-[auto_1fr] bg-[url('../../../bg-image.jpg')] bg-[#0f172a] bg-blend-overlay bg-cover bg-no-repeat`}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
