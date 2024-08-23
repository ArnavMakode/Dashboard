type SuggestionListProps = {
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
};

const SuggestionList = ({
  suggestions,
  handleSuggestionClick,
}: SuggestionListProps) => {
  return (
    <ul className="absolute top-full sm:left-0 max-h-40 overflow-y-auto w-full bg-white max-sm:w-[50vw] max-sm:right-0">
      {[...new Set(suggestions)].map((suggestion) => (
        <li
          key={suggestion}
          className="border-b py-2 pl-2 hover:bg-gray-100 cursor-pointer"
        >
          <button
            onClick={() => handleSuggestionClick(suggestion)}
            className="w-full"
          >
            {suggestion}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default SuggestionList;
