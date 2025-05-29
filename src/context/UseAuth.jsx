import { useContext } from "react";
import { UserContext } from "./UserProvider";

export const useAuth = () => useContext(UserContext);
