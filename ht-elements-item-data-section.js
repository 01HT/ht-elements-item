"use strict";
import { LitElement, html } from "@polymer/lit-element";

class HTElementsItemDataSection extends LitElement {
  render() {
    const { name } = this;
    return html`
    <style>
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
            font-size: 14px;
            font-weight:500;
            margin-right: 8px;
        }
    </style>    
    <div id="container">
        <div id="name">${name}</div>
        <slot></slot>
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-data-section";
  }

  static get properties() {
    return {
      name: { type: String }
    };
  }
}

customElements.define(HTElementsItemDataSection.is, HTElementsItemDataSection);
