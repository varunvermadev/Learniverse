import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const isAdmin = useSelector((store) => store.user.role) === "ADMIN";
  const navigate = useNavigate();

  if (!isAdmin) return <EmptyCourseList />;
  return children;
}

export default ProtectedRoute;
