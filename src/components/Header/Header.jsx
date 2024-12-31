import { Link, useNavigate } from "react-router";
import Button from "../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/user/userSlice";
import { getLogout } from "../../services/services";

function Header() {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();

  async function logout() {
    const res = await getLogout();
    if (res) {
      localStorage.clear();
      dispatch(removeUser());
    }
  }

  return (
    <header className="px-5 py-5 sm:px-10 backdrop-blur-sm border-b border-indigo-400 bg-slate-500/10   w-full top-0">
      <nav className="flex justify-between items-center gap-5">
        <div className="text-lg ">
          <Link
            to={"/"}
            className="focus:outline-none uppercase tracking-widest text-slate-50"
          >
            Learn
            <span className="font-extrabold lowercase text-3xl align-baseline">
              i
            </span>
            verse
          </Link>
        </div>
        {userData?.isAuth && (
          <p className="text-lg font-bold uppercase ml-auto self-center text-slate-50 ">
            {userData?.role === "ADMIN" ? userData?.role : userData?.name}
          </p>
        )}
        {userData?.isAuth ? (
          <Button onClick={logout}>logout</Button>
        ) : (
          <Button onClick={() => navigate("/login")}>login</Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
