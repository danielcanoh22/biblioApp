import { useNavigate } from "react-router";

export const useMoveToHome = () => {
  const navigate = useNavigate();
  return () => navigate("/");
};
