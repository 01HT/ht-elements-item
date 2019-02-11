"use strict";
import { LitElement, html, css } from "lit-element";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTElementsItemDataSection extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
      css`
        #container {
          display: flex;
          flex-direction: column;
        }

        #name {
          font-weight: 500;
          margin-right: 8px;
        }
      `
    ];
  }

  render() {
    const { name } = this;
    return html` 
    <div id="container">
        <div id="name">${name}</div>
        <slot></slot>
    </div>
`;
  }

  static get properties() {
    return {
      name: { type: String }
    };
  }
}

customElements.define(
  "ht-elements-item-data-section",
  HTElementsItemDataSection
);
