/*

Question 3

Google

Build a search autocomplete input that fetches suggestions as the user types.
Suggestions should be cached to prevent repeated network calls for the same query.
Support keyboard navigation using Arrow keys, Enter, and Escape,
highlight the active option, and close the dropdown on blur or selection.

Example: Typing “rea” shows suggestions, Arrow Down selects one,
Enter confirms it without another API call.
*/

import { useRef, useState } from "react";
import "./search-autocomplete.css";

export default function SearchAutoComplete() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [fetching, setFetching] = useState(false);
  //   const [error, setError]
  const resultsCache = useRef(new Map());
  const timerIdRef = useRef(null);
  const suggestionsRef = useRef();
  const inputRef = useRef();

  /* useEffect(() => {
    window.addEventListener("click");
  }, []); */

  const deferredSearch = (searchValue) => {
    clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(async () => {
      await fetchProducts(searchValue);
    }, 450);
  };

  const handleSearchText = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    deferredSearch(searchValue);
  };

  const fetchProducts = async (searchValue) => {
    try {
      setFetching(true);
      if (!searchValue.trim()) {
        setSuggestions([]);
        return;
      }
      if (resultsCache.current.has(searchValue)) {
        setSuggestions(resultsCache.current.get(searchValue));
        return;
      }
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchValue}`,
      );
      const data = await response.json();
      const products = data.products.map((item) => ({
        title: item.title,
        id: item.id,
      }));
      resultsCache.current.set(searchValue, products);
      setSuggestions(products);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      setFetching(false);
    }
  };

  const handleInputKeyPress = (e) => {
    console.log(e);
    if (e.key === "ArrowDown") {
      e.target.blur();
      suggestionsRef.current.firstElementChild.focus();
      requestAnimationFrame(() => {
        suggestionsRef.current.firstElementChild.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
    if (e.key === "ArrowUp") {
      e.target.blur();
      suggestionsRef.current.lastElementChild.focus();
      requestAnimationFrame(() => {
        suggestionsRef.current.lastElementChild.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
  };

  const handleSuggestionKeyPress = (e) => {
    e.stopPropagation();
    if (e.key === "ArrowDown") {
      const nextSibling = e.target.nextElementSibling;
      if (nextSibling) {
        nextSibling.focus();
      } else {
        inputRef.current.focus();
      }
    }
    if (e.key === "ArrowUp") {
      const previousSibling = e.target.previousElementSibling;
      if (previousSibling) {
        previousSibling.focus();
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          suggestions.length === 0 && setShowSuggestions(false);
        }}
        onKeyDown={handleInputKeyPress}
        style={{ position: "relative" }}
      >
        <input
          id="autocomplete"
          list="suggestions"
          placeholder="Type to search products"
          value={searchText}
          onChange={handleSearchText}
          style={{ padding: "0.5rem", marginBottom: "0.5rem" }}
          tabIndex={0}
          ref={inputRef}
        />
        <ul
          className={`suggestions-container ${showSuggestions ? "suggestions-container__show" : ""}`}
          ref={suggestionsRef}
          tabIndex="1"
          role="menu"
        >
          {fetching ? (
            <li
              style={{
                justifySelf: "center",
                margin: "auto",
              }}
              role="menuitem"
              tabIndex="-1"
            >
              Fetching...
            </li>
          ) : suggestions.length > 0 ? (
            suggestions.map(({ title, id }) => (
              <li
                key={id}
                onKeyDown={handleSuggestionKeyPress}
                tabIndex="-1"
                role="menuitem"
                style={{
                  padding: "0.5rem",
                  flexGrow: 1,
                }}
              >
                {title}
              </li>
            ))
          ) : (
            <li
              style={{
                justifySelf: "center",
                margin: "auto",
              }}
              tabIndex="-1"
              role="menuitem"
            >
              No suggestions
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

/*
1st Attempt - Took 2hr 30mins

Wasted time in exploring how to fix the first and last list items
not correctly present in the view. Tried with AI, Google and finally
found the solution

Apart from that referred internet for firstElementChild, lastElementChild
nextElementSibling & previousElementSibling
*/
