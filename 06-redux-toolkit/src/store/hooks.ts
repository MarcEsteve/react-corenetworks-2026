import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// A partir de React-Redux 9.1+ / Redux Toolkit 2.0+ se usa .withTypes()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
