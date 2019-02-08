"use strict";
import { LitElement, html, css } from "lit-element";

class HTElementsItemDataSection extends LitElement {
  static styles = css`<style>
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
    }

    #container {
        display: flex;
        flex-direction:column;
    }

    #name {
        font-weight:500;
        margin-right: 8px;
    }
</style>`;

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
