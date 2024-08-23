import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Widget } from "../shared/types";
import useCategories from "../hooks/useCategories";
import WidgetCard from "../components/WidgetCard";
import SearchResultsCard from "../components/SearchResultsCard";

const Search = () => {
  const location = useLocation();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const { findWidgets } = useCategories();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    setWidgets(findWidgets(query || ""));
  }, [location.search]);

  return (
    <div>
      <h1 className="text-xl">{widgets.length} search results found...</h1>
      <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1">
        {widgets.map((widget, index) => (
          <SearchResultsCard
            key={widget.id + widget.name + index + "search"}
            widget={widget}
          />
        ))}
      </div>
    </div>
  );
};
export default Search;
