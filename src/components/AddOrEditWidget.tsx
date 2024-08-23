import { CgClose } from "react-icons/cg";
import { AddWidgetProps, Widget } from "../shared/types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import useCategories from "../hooks/useCategories";

type AddOrEditWidgetProps = {
  widget?: Widget;
  categoryId: string;
  toggleEdit: () => void;
};

const AddOrEditWidget = ({
  widget,
  categoryId,
  toggleEdit,
}: AddOrEditWidgetProps) => {
  const { includesWidgetName, includesWidgetId, addWidget, updateWidget } =
    useCategories();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddWidgetProps>({
    defaultValues: {
      categoryId: categoryId,
      widgetId: widget?.id || "",
      name: widget?.name || "",
      text: widget?.text || "",
    },
  });

  useEffect(() => {
    if (!widget) {
      const id = uuid();
      if (includesWidgetId({ categoryId, widgetId: id })) toggleEdit();
      setValue("widgetId", id);
    }
  }, []);

  const onSubmit = ({ categoryId, widgetId, name, text }: AddWidgetProps) => {
    if (widget) updateWidget({ categoryId, widgetId, name, text });
    else addWidget({ categoryId, widgetId, name, text });

    toggleEdit();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col h-full w-full p-4 rounded-xl"
    >
      <CgClose
        className="absolute top-0 right-0 hover:bg-red-500 text-gray-500 hover:text-white rounded-xl m-2 p-1 text-xl hover:cursor-pointer"
        onClick={toggleEdit}
      />
      <div className="flex grow w-full flex-col place-content-center items-center gap-4">
        <div className="flex flex-col items-center">
          <label>
            name{" "}
            <input
              type="text"
              className="rounded-md px-2 py-1 border"
              {...register("name", {
                required: true,
                validate: (name) => {
                  if (name.trim() === "" || name === null)
                    return "name is required";
                  if (includesWidgetName({ categoryId, widgetName: name }) && !widget)
                    return "this category name already exists. try another name";
                },
              })}
            />
          </label>
          {errors.name && (
            <span className="text-red-500 text-sm">
              {errors.name.message as string}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center">
          <label>
            title{" "}
            <input
              type="text"
              className="rounded-md px-2 py-1 border"
              {...register("text")}
            />
          </label>
        </div>
      </div>
      <div className="max-sm:mt-1 w-full flex justify-center gap-6">
        <button
          className="rounded-md bg-red-500 hover:bg-red-400 px-2 py-1 text-white"
          onClick={toggleEdit}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-500 hover:bg-blue-400 px-2 py-1 text-white"
        >
          {widget ? "Edit" : "Add"}
        </button>
      </div>
    </form>
  );
};
export default AddOrEditWidget;
