"use strict";
import { LitElement, html } from "@polymer/lit-element";

class HTElementsItemCopyright extends LitElement {
  _render({ copyright }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }
    
        #container {
            color: var(--secondary-text-color);
        }
    </style>
    <div id="container">
        ${copyright}
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-copyright";
  }

  static get properties() {
    return { copyright: String };
  }

  constructor() {
    super();
    // this.copyright = "";
  }

  set data(copyright) {
    this.copyright = copyright;
  }
}

customElements.define(HTElementsItemCopyright.is, HTElementsItemCopyright);
