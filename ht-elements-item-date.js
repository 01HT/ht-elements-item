"use strict";
import { LitElement, html, css } from "lit-element";
import "@01ht/ht-date";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTElementsItemDate extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
      css`
        ht-date {
          display: block;
          color: var(--secondary-text-color);
          margin-top: 8px;
        }
      `
    ];
  }

  render() {
    const { data } = this;
    return html`
    <div id="container">
        <ht-date .data="${data}"></ht-date>
    </div>
`;
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }
}

customElements.define("ht-elements-item-date", HTElementsItemDate);
