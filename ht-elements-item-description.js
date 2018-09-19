"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@01ht/ht-wysiwyg/ht-wysiwyg-viewer.js";

class HTElementsItemDescription extends LitElement {
  render() {
    if (this.data === undefined) return;
    const { data } = this;
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }
    </style>
   
    <div id="container">
        <ht-wysiwyg-viewer .data=${data}></ht-wysiwyg-viewer>
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-description";
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }
}

customElements.define(HTElementsItemDescription.is, HTElementsItemDescription);
