import { createContext, ReactNode, useContext, useState } from "react";
import { Category, Widget } from "../shared/types";
import {
  useCategories,
  addWidgetProps,
  deleteWidgetProps,
  updateWidgetProps,
} from "../hooks/useCategories";

type AppContextProviderProps = {
  children: ReactNode;
};

interface AppContext {
  isEditable: boolean;
  categories: Category[];
  switchEditable: () => void;
  addWidget: ({ id, name, text }: addWidgetProps) => void;
  deleteWidget: ({ categoryId, widgetId }: deleteWidgetProps) => void;
  updateWidget: ({
    categoryId,
    widgetId,
    name,
    text,
  }: updateWidgetProps) => void;
  findWidgets: (query: string) => Widget[];
}

const Appcontext = createContext<AppContext | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const { categories, addWidget, deleteWidget, updateWidget, findWidgets } =
    useCategories();
  const switchEditable = () => setIsEditable((prevEditable) => !prevEditable);
  return (
    <Appcontext.Provider
      value={{
        isEditable,
        categories,
        switchEditable,
        addWidget,
        deleteWidget,
        updateWidget,
        findWidgets,
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
