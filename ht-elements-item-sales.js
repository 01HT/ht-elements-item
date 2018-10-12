"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";

class HTElementsItemSales extends LitElement {
  render() {
    const { sales } = this;
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

        iron-icon {
            --iron-icon-height: 32px;
            --iron-icon-width: 32px;
        }

        #container {
            display:flex;
            flex-wrap:wrap;
            align-items:center;
            color:var(--secondary-text-color);
        }

        #number {
            font-weight:500;
            margin:0 4px;
        }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-item-sales">
    <svg>
        <defs>
            <g id="shopping-cart">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
            </g>
        </defs>
    </svg>
    </iron-iconset-svg>
    <div id="container">
        <iron-icon icon="ht-elements-item-sales:shopping-cart"></iron-icon>
        <div id="number">${sales}</div>
        <div id="text">продажи</div>
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-sales";
  }

  static get properties() {
    return {
      sales: { type: Number }
    };
  }

  constructor() {
    super();
  }

  set data(sales) {
    this.sales = sales;
  }
}

customElements.define(HTElementsItemSales.is, HTElementsItemSales);
