"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { quillStyles } from "./ht-elements-item-description-quill-styles.js";

class HTElementsItemDescription extends LitElement {
  _render() {
    return html`
    ${quillStyles}
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }
    </style>
   
    <div id="container">
        <div id="quill"></div>
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-description";
  }

  static get properties() {
    return {
      description: Object,
      quillReady: Boolean
    };
  }

  constructor() {
    super();
    this.description = {};
    this.quillReady = false;
  }

  _initQuill() {
    this.quill = new Quill(this.shadowRoot.querySelector("#quill"));
    this.quill.enable(false);
    this.quillReady = true;
    this.quill.setContents(this.description);
  }

  _firstRendered() {
    if (!window.Quill) {
      let script = document.createElement("script");
      script.src = "/node_modules/quill/dist/quill.min.js";
      script.onload = _ => {
        this._initQuill();
      };
      this.shadowRoot.appendChild(script);
    } else {
      this._initQuill();
    }
  }

  set data(data) {
    this.description = JSON.parse(data);
    if (this.quillReady) this.quill.setContents(this.description);
  }
}

customElements.define(HTElementsItemDescription.is, HTElementsItemDescription);
