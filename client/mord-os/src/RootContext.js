import { createContext, useContext, useReducer } from "react";
import {
  Camera,
  CreateText,
  Images,
  Documents,
} from "./components/menu/menu-items";

const INITIAL_STATE = {
  isMenuOpen: false,
  itemSelected: null,
  isLoggedIn: false,
};

const ACTIONS = {
  APPLY_CHAGES: 1,
};

export const MENU_ITEM_ENUM = {
  CAMERA: 1,
  CREATE_TEXT: 2,
  IMAGES: 3,
  DOCUMENTS: 4,
};

export const MenuItems = [
  { id: MENU_ITEM_ENUM.CAMERA, component: Camera, title: "Camera" },
  {
    id: MENU_ITEM_ENUM.CREATE_TEXT,
    component: CreateText,
    title: "Create Text",
  },
  { id: MENU_ITEM_ENUM.IMAGES, component: Images, title: "Images" },
  { id: MENU_ITEM_ENUM.DOCUMENTS, component: Documents, title: "Documents" },
];

const RootContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.APPLY_CHAGES:
      const newState = {
        ...state,
        ...action.payload,
      };
      return newState;
    default:
      return state;
  }
};

export const RootProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const toggleMenu = () => {
    dispatch({
      type: ACTIONS.APPLY_CHAGES,
      payload: { isMenuOpen: !state.isMenuOpen },
    });
  };

  const openMenuItem = (menuItemId) => {
    if (state.itemSelected !== menuItemId) {
      dispatch({
        type: ACTIONS.APPLY_CHAGES,
        payload: { itemSelected: menuItemId, isMenuOpen: false },
      });
    }
  };

  const closeCurrentMenuItem = () => {
    if (state.itemSelected) {
      dispatch({
        type: ACTIONS.APPLY_CHAGES,
        payload: { itemSelected: null },
      });
    }
  };

  const authenticate = () => {
    //since I decided to go with the simplest implementation(without token)
    //I will keep this info in context, if I wanted to do it for a real project
    //would definitely keep a access token in local storage so user does not lose session on full page reload
    dispatch({
      type: ACTIONS.APPLY_CHAGES,
      payload: { isLoggedIn: true },
    });
  };

  return (
    <RootContext.Provider
      value={{
        data: state,
        toggleMenu,
        openMenuItem,
        closeCurrentMenuItem,
        authenticate,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export function useRoot() {
  var context = useContext(RootContext);

  if (!context) {
    throw new Error("useRoot must be used within a RootProvider");
  }

  return context;
}
