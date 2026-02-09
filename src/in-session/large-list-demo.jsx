/*

Week 4

Given a large list, render onlygiven k number of items by generating those many number of buttons

EEg: 500 items and 10 items at once, so 50 buttons should be generated

*/

import { useState } from "react";

const totalItems = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  description: `This is the description for item ${i + 1}`,
}));

const limit = 10;

export default function LargeListDemo() {
  const [items, setItems] = useState(totalItems.slice(0, limit));
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.floor(totalItems.length / limit);

  const handleButtonClick = (pageNumber) => {
    setActivePage(pageNumber);
    const whereToStart = pageNumber * limit;
    const itemsToRender = [];
    for (let idx = whereToStart; idx < whereToStart + limit; idx++) {
      itemsToRender.push(totalItems[idx]);
    }
    setItems(itemsToRender);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            style={{
              padding: "0.5rem",
              border: activePage === idx ? "1px solid red" : "none",
              outline: "none",
            }}
            onClick={() => handleButtonClick(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          margin: "auto",
        }}
      >
        {items.map(({ id, title, description }) => (
          <div key={id} style={{ border: "1px solid grey", padding: "0.5rem" }}>
            <b>{title}</b>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
