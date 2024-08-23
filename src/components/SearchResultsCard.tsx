import { Widget } from "../shared/types";

const SearchResultsCard = ({ widget }: { widget: Widget }) => {
  return (
    <div className="w-full h-[240px] flex flex-col bg-white rounded-xl px-3 py-4 ring-[14px] ring-gray-200/20">
      <div className="font-bold">{widget.name}</div>
      <div className="h-fit w-full text-center align-middle m-auto">
        {widget.text || "No text available"}
      </div>
    </div>
  );
};
export default SearchResultsCard;
