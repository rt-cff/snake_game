import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, isDOMComponent, renderIntoDocument, findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import pretty from "pretty";

import Cell from "./Cell";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Render Cell", () => {
    it("should render a div with classname cell", () => {
        act(() => {
            render(<Cell />, container);
        });

        expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
            `"<div class=\\"cell   \\"></div>"`
        ); /* ... gets filled automatically by jest ... */
    });

    it("shoudl render a div with classname active", () => {
        let tree = null
        act(() => {
            render(<Cell active={true} />, container);
            tree = renderIntoDocument(<div><Cell active={true} /></div>)

        });

        // console.log(tree) 

findRenderedDOMComponentWithClass(tree, 'cell active')
expect(isDOMComponent(tree)).toBe(true);

        // expect(container.className).toMatch("active");
        // expect(container).toMatchSnapshot();
    })  

    it("shoudl render a div with classname head", () => {
        act(() => {
            render(<Cell head={true} />, container);
        });

        expect(container).toMatchSnapshot();
    })  

    it("shoudl render a div with classname food", () => {
        act(() => {
            render(<Cell food={true} />, container);
        });

        expect(container).toMatchSnapshot();
    })  
}); 
