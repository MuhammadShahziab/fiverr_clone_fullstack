import React from "react";
import "./SearchSuggestions.scss";

const SearchSuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="suggestions">
      {suggestions.map((suggestion, index) => (
        <>
          <div
            key={index}
            className="suggestion"
            onClick={() => onSuggestionClick(suggestion.cat)}
          >
            {suggestion.shortTitle || suggestion.cat}
            {/* Display the top tags for better suggestion context */}
          </div>
          {suggestion.tags && (
            <div className="tags">
              {suggestion.tags.map((tag, i) => (
                <span
                  key={i}
                  className="tag"
                  onClick={() => onSuggestionClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default SearchSuggestions;
