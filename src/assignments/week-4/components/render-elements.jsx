import { createElement } from "react";

/*

Question - 2

Meta

Given a nested JSON object that represents a UI tree,
recursively render React elements based on the node type, props, and children.
The solution should handle deeply nested structures and unknown node types gracefully.
Example input:
{
 type: "div",
 props: { className: "box" },
 children: [{ type: "button", props: { onClick: handleClick, text: "Click me" } }]
 }
 should render a div containing a clickable button.
*/
const json = {
  type: "div",
  props: { className: "box" },
  children: [
    { type: "test", children: ["hello"] },
    {
      type: "button",
      props: {
        onClick: () => console.log("test"),
        style: { marginLeft: "0.75rem" },
      },
      children: ["Click Me to console log"],
    },
    {
      type: "h1",
      children: ["Test Heading"],
    },
  ],
};

const elementsRenderer = (obj) => {
  if (typeof obj === "string") {
    return obj;
  }
  if (
    !obj.type ||
    document.createElement(obj.type).toString() ===
      "[object HTMLUnknownElement]"
  ) {
    return obj.children;
  }

  if (Array.isArray(obj.children)) {
    const children = [];
    obj.children.forEach((child) => {
      const element = elementsRenderer(child);
      children.push(element);
    });
    return createElement(obj.type, obj.props, ...children);
  }
  return createElement(obj.type, obj.props, obj.children);
};

export default function RenderElements() {
  return (
    <div
      style={{
        border: "2px solid lightgrey",
        padding: "1rem",
      }}
    >
      {elementsRenderer(json)}
    </div>
  );
}

/*

1st attempt - 1hr 30min

Refered internet on how to check if a tag is a valid html tag or not

Some questions
Different node types
1. div
2. p
etc.,

Can't maintain all these how to tackle - use
document.createElement(tagName).toString() !==
      "[object HTMLUnknownElement]"
 */
