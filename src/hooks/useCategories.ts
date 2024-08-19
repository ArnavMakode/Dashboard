import { useState, useEffect } from "react";
import { Category, Widget } from "../shared/types";
import { v4 as uuid4 } from "uuid";
import data from "../assets/data.json";

export type addWidgetProps = {
  id: string;
  name: string;
  text: string;
};

export type deleteWidgetProps = {
  categoryId: string;
  widgetId: string;
};

export type updateWidgetProps = {
  categoryId: string;
  widgetId: string;
  name: string;
  text: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const storedCategories = sessionStorage.getItem("categories");
      return storedCategories
        ? (JSON.parse(storedCategories) as Category[])
        : data.categories.map((category) => ({
            ...category,
            id: uuid4(),
            widgets: category.widgets.map((widget) => ({
              ...widget,
              id: uuid4(),
            })),
          }));
    } catch (error) {
      console.log("Error parsing stored data");
      return data.categories.map((category) => ({
        ...category,
        id: uuid4(),
        widgets: category.widgets.map((widget) => ({
          ...widget,
          id: uuid4(),
        })),
      }));
    }
  });

  useEffect(() => {
    sessionStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addWidget = ({ id, name, text }: addWidgetProps) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              widgets: [
                ...(category.widgets ?? []),
                { id: uuid4(), name, text },
              ],
            }
          : category
      )
    );
  };

  const deleteWidget = ({ categoryId, widgetId }: deleteWidgetProps) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets?.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      )
    );
  };

  const updateWidget = ({
    categoryId,
    widgetId,
    name,
    text,
  }: updateWidgetProps) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets?.map((widget) =>
                widget.id === widgetId ? { ...widget, name, text } : widget
              ),
            }
          : category
      )
    );
  };

  const findWidgets = (query: string): Widget[] =>
    categories.flatMap(
      (category) =>
        category.widgets?.filter((widget) =>
          widget.name.toLowerCase().includes(query.trim().toLowerCase())
        ) || []
    );

  return { categories, addWidget, deleteWidget, updateWidget, findWidgets };
}
