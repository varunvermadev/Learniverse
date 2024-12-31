import { useNavigate, useRouteError } from "react-router";
import Button from "../Button/Button";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-3">
      <p className="text-3xl p-5 border-red-700 text-red-700 border bg-red-200 rounded-md">
        {error.data || error.message}
      </p>
      <Button onClick={() => navigate("/", { replace: true })}>Back</Button>
    </div>
  );
}

export default Error;
