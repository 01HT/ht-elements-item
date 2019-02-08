"use strict";
import { LitElement, html, css } from "lit-element";
import "@01ht/ht-wysiwyg/ht-wysiwyg-viewer.js";

class HTElementsItemDescription extends LitElement {
  static styles = css`<style>
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
    }
</style>`;

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
