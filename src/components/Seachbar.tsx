import { IoSearch } from "react-icons/io5";
import SuggestionList from "./SuggestionList";
import { useEffect, useState } from "react";
import { Widget } from "../shared/types";
import useCategories from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";

const Seachbar = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { findWidgets } = useCategories();
  const navigate = useNavigate();

  const handleSuggestions = (query: string) => {
    const searchResults: Widget[] = findWidgets(query.trim());
    if (searchResults.length < 2 && searchResults[0]?.name === searchQuery)
      return;
    setSuggestions(searchResults.map((widget) => widget.name));
    setIsOpen(true);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsOpen(false);
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsOpen(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => handleSuggestions(searchQuery), 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <div className="relative w-1/3 max-sm:w-2/3">
      <div
        title="search"
        className="w-full bg-gray-100 rounded-md border-blue-200 border-2 flex py-1 px-2 items-center text-gray-500 gap-2"
      >
        <button onClick={() => navigate(`/search?query=${searchQuery}`)}>
          <IoSearch className="text-xl" />
        </button>
        <input
          type="text"
          className="w-full bg-transparent focus:outline-none"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => handlePressEnter(e)}
        />
      </div>
      {isOpen && (
        <SuggestionList
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};
export default Seachbar;
