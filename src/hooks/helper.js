import {ThemeContext} from "../Context/ThemeProvider";
import { useContext } from "react";
import { NotificationContext } from "../Context/NotificationProvider";
import { AuthContext } from "../Context/AuthProvider";
export const useTheme = () => useContext(ThemeContext);
export const useAuth = () => useContext(AuthContext);
export const useNotification = () => useContext(NotificationContext)