import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { validateForm } from "../../helpers/validateForm";
import store from "../../store/store";
import { fetchLogin } from "../../store/user/thunk";

function Login() {
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="h-screen ">
      <h1 className="sm:text-3xl font-bold text-2xl text-center mt-10 tracking-wider">
        Login
      </h1>
      <Form
        method="POST"
        className="rounded-lg flex flex-col gap-5  mt-2  py-8 px-2 sm:px-8 bg-slate-500/10 backdrop-blur-sm border border-indigo-400 max-w-[90%] sm:max-w-[35%] m-auto"
      >
        <div className="space-y-1">
          <Input
            type={"text"}
            labelText={"name"}
            placeholderText={"Jhon Doe"}
            name={"name"}
          />
          {formErrors?.name && (
            <p className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg ">
              {formErrors?.name}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Input
            type={"text"}
            labelText={"email"}
            placeholderText={"abc@xyz.com"}
            name={"email"}
          />
          {formErrors?.email && (
            <p className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg ">
              {formErrors?.email}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Input
            type={"password"}
            labelText={"password"}
            name={"password"}
          />
          {formErrors?.password && (
            <p className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg ">
              {formErrors?.password}
            </p>
          )}
        </div>
        <div className="text-center mt-3">
          <Button>{isSubmitting ? "Logging in..." : "login"}</Button>
        </div>
        <div>
          <p className="text-sm text-center">
            Dont have account ?{" "}
            <Link
              className="underline hover:tracking-widest"
              to={"/registration"}
            >
              Register
            </Link>
          </p>
          {typeof formErrors === "string" && (
            <p className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg ">
              {formErrors}
            </p>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Login;

export async function action({ request }) {
  const res = await request.formData();
  const formData = Object.fromEntries(res);

  const errors = validateForm(formData);
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  store.dispatch(fetchLogin(formData));

  return redirect("/courses");
}
