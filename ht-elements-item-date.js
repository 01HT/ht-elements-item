"use strict";
import { LitElement, html, css } from "lit-element";
import "@01ht/ht-date";

class HTElementsItemDate extends LitElement {
  static styles = css`<style>
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
    }

    ht-date {
        display:block;
        color:var(--secondary-text-color);
        margin-top: 8px;
    }
</style>`;

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
