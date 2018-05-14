"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "ht-date";

class HTElementsItemDate extends LitElement {
  _render({ data }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

        ht-date {
            color:var(--secondary-text-color);
            font-size:14px;
        }
    </style>
    <div id="container">
        <ht-date data=${this.data}></ht-date>
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-date";
  }

  static get properties() {
    return {
      data: String
    };
  }
}

customElements.define(HTElementsItemDate.is, HTElementsItemDate);
