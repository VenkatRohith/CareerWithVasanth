/*
Amazon

Build an infinite-scrolling product results page where products load as the
user scrolls.

The page must support search by product name and category-based filtering.
When search text or filters change, results should reset correctly.
Avoid duplicate API calls for the same query and page by caching responses.

Handle loading, empty, and error states gracefully while ensuring smooth scrolling
 without UI jank.

 Example: Searching “Shoes” with category “Men” should load page 1,
 then page 2 on scroll, and reuse cached results if the same query is repeated.
*/

import { useCallback, useEffect, useRef, useState } from "react";
import "./product-results-page.css";

function StickySearch({
  selectedCategory,
  setSelectedCategory,
  setSearchedValue,
  searchedValue,
}) {
  const [categories, setCategories] = useState([]);
  const [localSearchValue, setLocalSearchValue] = useState(() => searchedValue);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list",
        );
        const categoryList = await response.json();
        setCategories(categoryList);
      } catch (error) {
        console.log(error);
      } finally {
        isFetchingRef.current = false;
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    setLocalSearchValue(e.target.value);
  };

  return (
    <section className="search-container">
      <select
        id="category"
        defaultValue="all"
        onChange={(e) => setSelectedCategory(e.target.value)}
        disabled={searchedValue?.trim()}
        value={selectedCategory}
        className="search-container__category"
      >
        <option value="all">All</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        id="search"
        placeholder="Search Products and Press Enter or search button"
        className="search-container__searchInput"
        onChange={handleSearch}
        value={localSearchValue ?? ""}
        disabled={selectedCategory}
        onKeyUp={(e) => {
          if (e.key !== "Enter") return;
          setSearchedValue(localSearchValue);
        }}
      />
      <button
        name="searchButton"
        className="search-container__searchButton"
        onClick={() => setSearchedValue(localSearchValue)}
      >
        🔍
      </button>
    </section>
  );
}

function Product({ images, title, brand, price }) {
  return (
    <div className="product-container">
      <img src={images[0]} className="product-container__image" />
      <div className="product-container__details">
        <b>{brand}</b>
        <p className="product-container__title">{title}</p>
        <span className="product-container__price">{price}</span>
      </div>
    </div>
  );
}

function Products({ selectedCategory, searchedValue }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const paginationRef = useRef({ limit: 15, skip: 0, total: 0 });
  const containerRef = useRef(null);
  const cacheDataRef = useRef(new Map());
  const isFetchingRef = useRef(false);

  const fetchProducts = useCallback(
    async ({ resetPagination = false }) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      try {
        if (resetPagination) {
          paginationRef.current = { limit: 15, skip: 0, total: 0 };
        }
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append("limit", paginationRef.current.limit);
        urlSearchParams.append("skip", paginationRef.current.skip);
        if (searchedValue?.trim()) {
          urlSearchParams.append("q", searchedValue);
        }
        const url = `https://dummyjson.com/products${selectedCategory && selectedCategory !== "all" ? `/category/${selectedCategory}` : ""}${searchedValue?.trim() ? "/search" : ""}?${urlSearchParams.toString()}`;
        if (cacheDataRef.current.has(url)) {
          setProducts(cacheDataRef.current.get(url));
          return;
        }
        const response = await fetch(url);
        const productResult = await response.json();
        const { products, limit, skip, total } = productResult;
        setProducts((oldProducts) => {
          if (resetPagination) {
            cacheDataRef.current.set(url, structuredClone(products));
            return products;
          }
          const updatedProducts = oldProducts.concat(products);
          cacheDataRef.current.set(url, structuredClone(updatedProducts));
          return updatedProducts;
        });
        if (error) setError("");

        paginationRef.current = {
          limit,
          skip: skip + products.length,
          total,
        };
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Some error occured");
        }
      } finally {
        isFetchingRef.current = false;
      }
    },
    [selectedCategory, searchedValue, error],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const checkIfReachedBottom = () => {
      /* console.log(
        containerRef.current.scrollTop,
        containerRef.current.clientHeight,
        containerRef.current.scrollHeight,
      ); */
      if (
        containerRef.current.scrollTop + containerRef.current.clientHeight >=
          containerRef.current.scrollHeight &&
        paginationRef.current.skip < paginationRef.current.total
      ) {
        fetchProducts({ nextPage: true });
      }
    };
    const containerElem = containerRef.current;
    containerElem.addEventListener("scroll", checkIfReachedBottom);

    return () => {
      containerElem.removeEventListener("scroll", checkIfReachedBottom);
    };
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts({ resetPagination: true });
  }, [searchedValue, selectedCategory, fetchProducts]);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <section className="products-container" ref={containerRef}>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </section>
  );
}

export default function ProductResultsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  return (
    <div className="page-container">
      <StickySearch
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSearchedValue={setSearchedValue}
        searchedValue={searchedValue}
      />
      <Products
        searchedValue={searchedValue}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

/*
Time taken - 4hours 10min :(

Referred on how to know if a scrollbar has reached bottom of a container <- VVIMP
Also referred how to stop two API calls in dev mode using useRef
*/
