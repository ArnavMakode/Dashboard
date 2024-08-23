import { GrClose } from "react-icons/gr";
import { useAppContext } from "../context/AppContext";
import { Category } from "../shared/types";
import { useEffect, useState } from "react";

const FilterWidgets = ({ showFilter }: { showFilter: () => void }) => {
  const { categories, setCategories } = useAppContext();
  const [selectedWidgets, setSelectedWidgets] = useState<Category[]>([
    ...categories,
  ]);
  const [currentCategory, setCurrentCategory] = useState<string>(
    selectedWidgets[0].id
  );

  useEffect(() => {
    setSelectedWidgets([...categories]);
  }, [categories]);

  const onCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    widgetId: string
  ) => {
    setSelectedWidgets((prev) =>
      prev.map((category) =>
        category.id === currentCategory
          ? {
              ...category,
              widgets: category.widgets?.map((widget) =>
                widget.id === widgetId
                  ? { ...widget, isChecked: e.target.checked }
                  : widget
              ),
            }
          : category
      )
    );
  };

  const onSubmit = () => {
    setCategories([...selectedWidgets]);
    showFilter();
  };

  return (
    <div className="fixed w-full h-screen inset-0 flex justify-end bg-black/50 z-40">
      <div className="h-screen w-[45vw] max-sm:w-full z-30 text-gray-700">
        <div className="bg-[#191970] text-white flex justify-between px-4 py-2 pb-3 items-center">
          <span className="text-sm font-semibold">Add Widget</span>
          <GrClose
            className="mt-1 hover:bg-blue-700 h-6 w-6 p-1 hover:cursor-pointer"
            onClick={showFilter}
          />
        </div>
        <div className="p-4 flex flex-col h-full bg-white">
          <div className="-mt-2 font-semibold">
            Personalize your dashboard by adding the following widgets
          </div>
          <div className="flex w-fit">
            {categories.map((category) => (
              <label
                key={category.id + category.name + "filter"}
                className={`${
                  currentCategory === category.id
                    ? "text-blue-950 border-b-blue-950"
                    : "text-gray-500 border-b-gray-200"
                } px-6 py-3 border-b-2`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  className="hidden"
                  onChange={() => setCurrentCategory(category.id)}
                />
                <span className="text-xs font-bold tracking-wide">
                  {category.name.split(" ")[0]}
                </span>
              </label>
            ))}
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {selectedWidgets
              .find((category) => category.id === currentCategory)
              ?.widgets?.map((widget) => (
                <div
                  key={widget.id + widget.name + currentCategory + "filter"}
                  className="border-2 border-gray-200 p-2 my-2 rounded"
                >
                  <label className="block">
                    <input
                      type="checkbox"
                      value={widget.id}
                      checked={widget.isChecked}
                      onChange={(e) => onCheck(e, widget.id)}
                      className="accent-blue-950 w-4 h-4"
                    />
                    <span className="ml-3 text-sm font-semibold">
                      {widget.name}
                    </span>
                  </label>
                </div>
              ))}
          </div>
          <div className="flex gap-4 justify-end mb-10">
            <button
              onClick={showFilter}
              className="text-blue-900 border border-blue-950 px-8 py-2 rounded-lg text-xs font-bold hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="bg-blue-950 text-white px-8 py-2 rounded-lg text-xs font-semibold hover:bg-blue-900"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterWidgets;
