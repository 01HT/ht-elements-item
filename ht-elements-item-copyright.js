"use strict";
import { LitElement, html, css } from "lit-element";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTElementsItemCopyright extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
      css`
        #container {
          color: var(--secondary-text-color);
        }
      `
    ];
  }

  render() {
    const { copyright } = this;
    return html`
    <div id="container">
        ${copyright}
    </div>
`;
  }

  static get properties() {
    return { copyright: { type: String } };
  }

  constructor() {
    super();
    // this.copyright = "";
  }

  set data(copyright) {
    this.copyright = copyright;
  }
}

customElements.define("ht-elements-item-copyright", HTElementsItemCopyright);
