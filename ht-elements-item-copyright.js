"use strict";
import { LitElement, html, css } from "lit-element";

class HTElementsItemCopyright extends LitElement {
  static styles = css`<style>
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
    }

    #container {
        color: var(--secondary-text-color);
    }
</style>`;

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
