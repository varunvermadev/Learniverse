import Button from "../../common/Button/Button";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";
import Input from "../../common/Input/Input";
import { getRegister } from "../../services/services";
import { validateForm } from "../../helpers/validateForm";

function Registration() {
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isRegistering = navigation.state === "submitting";

  return (
    <div className="h-screen ">
      <h1 className="font-bold text-2xl sm:text-3xl text-center mt-10 tracking-wider">
        Registration
      </h1>
      <Form
        method="POST"
        className="rounded-lg flex flex-col gap-5  mt-2  py-8 px-2 sm:px-8 backdrop-blur-sm bg-slate-500/10 border border-indigo-400 max-w-[90%] sm:max-w-[35%] m-auto"
      >
        <div className="space-y-1">
          <Input
            type={"text"}
            labelText={"name"}
            placeholderText={"Jhone Doe"}
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
            name="email"
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
            name="password"
          />
          {formErrors?.password && (
            <p className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg ">
              {formErrors?.password}
            </p>
          )}
        </div>
        <div className="text-center mt-3">
          <Button>{isRegistering ? "Registering User..." : "Register"}</Button>
        </div>
        <div>
          <p className="text-sm text-center">
            Already have an account ?{" "}
            <Link
              className=" underline hover:tracking-widest"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
        {typeof formErrors === "string" && (
          <p className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg ">
            {formErrors}
          </p>
        )}
      </Form>
    </div>
  );
}

export default Registration;

export async function action({ request }) {
  const res = await request.formData();
  const formData = Object.fromEntries(res);
  const errors = validateForm(formData);

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  // making register request to the server
  const newUser = await getRegister(formData);
  if (!newUser.successful) {
    return "🥲 User already exist with this email! Please log in";
  }

  return redirect("/login");
}
