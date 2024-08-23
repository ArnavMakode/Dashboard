import { GrAdd } from "react-icons/gr";
import { Category } from "../shared/types";
import WidgetCard from "./WidgetCard";
import AddOrEditWidget from "./AddOrEditWidget";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const DashboardList = ({
  selectedWidgets,
}: {
  selectedWidgets: Category[];
}) => {
  const { isEditable, switchEditable } = useAppContext();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const setId = (id: string) => {
    setCategoryId(id);
    switchEditable();
  };
  const removeId = () => {
    setCategoryId(null);
    switchEditable();
  };

  return (
    <div className="p-2">
      {selectedWidgets.map((category) => (
        <div key={category.id} className="w-full mb-4">
          <div className="font-bold text-lg relative z-10 text-black my-1">
            {category.name}
          </div>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-sm:flex max-sm:overflow-x-auto max-sm:h-[200px] max-sm:relative">
            {category.widgets && category.widgets?.length > 0
              ? category.widgets.map(
                  (widget) =>
                    widget.isChecked && (
                      <WidgetCard
                        key={widget.id + widget.name}
                        widget={widget}
                        categoryId={category.id}
                      />
                    )
                )
              : "No widgets in this category"}
            <div className="h-[240px] max-sm:hidden bg-gray-50 rounded-xl sm:flex justify-center items-center sm:outline sm:outline-8 sm:outline-offset-[20px] sm:outline-gray-200/30 sm:ring-[16px] sm:ring-gray-200/20">
              {categoryId === category.id ? (
                <AddOrEditWidget
                  categoryId={category.id}
                  toggleEdit={removeId}
                />
              ) : (
                <button
                  title="add widget"
                  disabled={!isEditable}
                  className="bg-white px-3 py-1 rounded-xl max-sm:rounded-full border-2 max-sm:bg-black/30 max-sm:border-none max-sm:text-white border-gray-300 text-gray-500 disabled:hidden"
                  onClick={() => setId(category.id)}
                >
                  <GrAdd className="inline mr-2 align-middle mb-1 max-sm:m-0 max-sm:rounded-full max-sm:h-6 max-sm:text-xs" />{" "}
                  <span className="max-sm:hidden">Add widget</span>
                </button>
              )}
            </div>
          </div>
          <div className="h-fit w-fit sm:hidden bg-gray-50 rounded-xl justify-center items-center sm:outline sm:outline-8 sm:outline-offset-[20px] sm:outline-gray-200/30 sm:ring-[16px] sm:ring-gray-200/20">
            {categoryId === category.id ? (
              <AddOrEditWidget categoryId={category.id} toggleEdit={removeId} />
            ) : (
              <button
                title="add widget"
                disabled={!isEditable}
                className="bg-white px-3 py-1 rounded-xl max-sm:rounded-full border-2 max-sm:bg-black/30 max-sm:border-none max-sm:text-white border-gray-300 text-gray-500 disabled:hidden"
                onClick={() => setId(category.id)}
              >
                <GrAdd className="inline mr-2 align-middle mb-1 max-sm:m-0 max-sm:rounded-full max-sm:h-6 max-sm:text-xs" />{" "}
                <span>Add widget</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default DashboardList;
