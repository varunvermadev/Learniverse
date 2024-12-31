import { createBrowserRouter, RouterProvider } from "react-router";

import Courses from "./components/Courses/Courses";
import AppLayout from "./components/AppLayout/AppLayout";
import Home from "./pages/Home";
import Login, { action as loginAction } from "./components/Login/Login";
import Registration, {
  action as registrationAction,
} from "./components/Registration/Registration";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Error from "./common/Error/Error";
import CreateCourse, {
  action as createCourseAction,
} from "./components/CreateCourse/CreateCourse";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/registration",
        element: <Registration />,
        action: registrationAction,
      },
      {
        path: "/courses/:courseId",
        element: <CourseInfo />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/add",
        action: createCourseAction,
        element: (
          <ProtectedRoute>
            <CreateCourse formAction={"create"} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/courses/update/:courseId",
        element: (
          <ProtectedRoute>
            <CreateCourse formAction={"update"} />
          </ProtectedRoute>
        ),
        action: createCourseAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
