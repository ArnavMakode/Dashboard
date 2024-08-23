import { CiEdit } from "react-icons/ci";
import { Widget } from "../shared/types";
import { MdDeleteOutline } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import AddOrEditWidget from "./AddOrEditWidget";
import useCategories from "../hooks/useCategories";
import { CgClose } from "react-icons/cg";

const WidgetCard = ({
  widget,
  categoryId,
}: {
  widget: Widget;
  categoryId: string;
}) => {
  const { isEditable, switchEditable } = useAppContext();
  const { deleteWidget, checkWidget } = useCategories();
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const toggleEdit = () => {
    setEdit((prev) => !prev);
    switchEditable();
  };
  return edit ? (
    <AddOrEditWidget
      widget={widget}
      categoryId={categoryId}
      toggleEdit={toggleEdit}
    />
  ) : (
    <div className="w-full h-[240px] max-sm:h-[200px] flex flex-col bg-white rounded-xl px-3 py-4 ring-[14px] ring-gray-200/20 relative max-sm:shrink-0">
      <div className="absolute top-2 right-2 gap-2 text-xl flex flex-col">
        <button
          disabled={!isEditable}
          title="close"
          onClick={() => checkWidget({ categoryId, widgetId: widget.id })}
          className="hover:bg-red-500 bg-black/30 text-white rounded-full h-7 w-7 disabled:hidden pl-1 font-bold"
        >
          <CgClose />
        </button>
        <button
          title="edit"
          disabled={!isEditable}
          className="hover:bg-gray-200 bg-black/30 text-white rounded-full h-7 w-7 disabled:hidden pl-1 font-bold hover:text-black hover:border border-black"
          onClick={toggleEdit}
        >
          <CiEdit />
        </button>
        <button
          title="delete"
          disabled={!isEditable}
          onClick={() => {
            setConfirmDelete(true);
          }}
          className="hover:bg-gray-200 rounded-full h-7 w-7 bg-black/30 text-white disabled:hidden pl-1 font-bold hover:text-black hover:border border-black"
        >
          <MdDeleteOutline />
        </button>
      </div>
      <div className="font-bold">{widget.name}</div>
      <div className="h-fit w-full text-center align-middle m-auto">
        {widget.text || "No text available"}
      </div>
      {confirmDelete && (
        <div className="text-xs text-white tracking-tight bg-black/60 absolute bottom-0 w-full left-0 text-center pb-1 rounded-b-xl">
          Are you shure you want to delete {widget.name}?
          <div className="flex justify-center gap-6">
            <button
              onClick={() => setConfirmDelete(false)}
              className="bg-white text-xs font-bold border border-blue-900 text-blue-900 hover:bg-gray-200 rounded-md px-4 py-1"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteWidget({ categoryId, widgetId: widget.id })}
              className="bg-red-500 text-xs font-bold hover:bg-red-400 text-white rounded-md px-4 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default WidgetCard;
