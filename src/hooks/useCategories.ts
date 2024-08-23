import {
  AddWidgetProps,
  DeleteWidgetProps,
  UpdateWidgetProps,
  Widget,
  IncludesWidgetIdProps,
  IncludesWidgetNameProps,
  CheckWidgetProps,
} from "../shared/types";
import { useAppContext } from "../context/AppContext";

export default function useCategories() {
  const { categories, setCategories } = useAppContext();

  const addWidget = ({ categoryId, widgetId, name, text }: AddWidgetProps) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: [
                ...(category.widgets ?? []),
                { id: widgetId, name, text, isChecked: true },
              ],
            }
          : category
      )
    );
  };

  const deleteWidget = ({ categoryId, widgetId }: DeleteWidgetProps) => {
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
  }: UpdateWidgetProps) => {
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
    query === ""
      ? []
      : categories.flatMap(
          (category) =>
            category.widgets?.filter((widget) =>
              widget.name.toLowerCase().includes(query.trim().toLowerCase())
            ) || []
        );

  const includesWidgetName = ({
    categoryId,
    widgetName,
  }: IncludesWidgetNameProps): boolean =>
    categories
      .find((category) => category.id === categoryId)
      ?.widgets?.some((widget) => widget.name === widgetName) || false;

  const includesWidgetId = ({
    categoryId,
    widgetId,
  }: IncludesWidgetIdProps): boolean =>
    categories
      .find((category) => category.id === categoryId)
      ?.widgets?.some((widget) => widget.id === widgetId) || false;

  const checkWidget = ({ categoryId, widgetId }: CheckWidgetProps) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets?.map((widget) =>
                widget.id === widgetId
                  ? { ...widget, isChecked: false }
                  : widget
              ),
            }
          : category
      )
    );
  };

  return {
    addWidget,
    deleteWidget,
    updateWidget,
    findWidgets,
    includesWidgetName,
    includesWidgetId,
    checkWidget,
  };
}
