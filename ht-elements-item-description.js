"use strict";
import { LitElement, html, css } from "lit-element";
import "@01ht/ht-wysiwyg/ht-wysiwyg-viewer.js";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTElementsItemDescription extends LitElement {
  static get styles() {
    return [stylesBasicWebcomponents, css``];
  }

  render() {
    if (this.data === undefined) return;
    const { data } = this;
    return html`
    <div id="container">
        <ht-wysiwyg-viewer .data="${data}"></ht-wysiwyg-viewer>
    </div>
`;
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }
}

customElements.define(
  "ht-elements-item-description",
  HTElementsItemDescription
);
