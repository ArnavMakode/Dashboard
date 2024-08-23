import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Category } from "../shared/types";
import { v4 as uuid4 } from "uuid";
import data from "../assets/data.json";

type AppContextProviderProps = {
  children: ReactNode;
};

interface AppContext {
  isEditable: boolean;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  switchEditable: () => void;
}

const Appcontext = createContext<AppContext | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const storedCategories = sessionStorage.getItem("categories");
      if (storedCategories) {
        return JSON.parse(storedCategories) as Category[];
      } else {
        return data.categories.map((category) => ({
          ...category,
          id: uuid4(),
          widgets: category.widgets.map((widget) => ({
            ...widget,
            id: uuid4(),
            isChecked: true,
          })),
        }));
      }
    } catch (error) {
      console.log("Error parsing stored data");
      return data.categories.map((category) => ({
        ...category,
        id: uuid4(),
        widgets: category.widgets.map((widget) => ({
          ...widget,
          id: uuid4(),
          isChecked: true,
        })),
      }));
    }
  });

  useEffect(() => {
    sessionStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const switchEditable = () => setIsEditable((prevEditable) => !prevEditable);
  return (
    <Appcontext.Provider
      value={{
        isEditable,
        categories,
        setCategories,
        switchEditable,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = (): AppContext => {
  const context = useContext(Appcontext);
  return context as AppContext;
};

export default AppContextProvider;
