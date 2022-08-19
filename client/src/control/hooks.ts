import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../model/store";
import { useState, useEffect } from "react";
import { User } from "../model/userModelC";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useIsLogged() {
  // const [isLogged, setIsLogged] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  try {
    if (user === null) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function useGetUser():User|false {
  // const [isLogged, setIsLogged] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  try {
    if (user === null) return false;
    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
}
