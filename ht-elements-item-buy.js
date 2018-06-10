"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { render } from "lit-html";
import { repeat } from "lit-html/lib/repeat.js";
import "@polymer/paper-button";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox";
import "@polymer/paper-spinner/paper-spinner.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-tooltip";

class HTElementsItemBuy extends LitElement {
  _render({ license, selected, cartChangeInProcess, signedIn }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }
    
        a {
            display: block;
            color: inherit;
            text-decoration: none;
        }

        #actions > * {
            width: calc(50% - 8px);
        }

        paper-button{
            margin:0;
        }

        paper-button iron-icon {
            padding-right: 4px;
        }
        
        paper-listbox {
            width: 100%;
            --paper-listbox-background-color: #fff;
        }

        paper-item {
            cursor:pointer;
        }

        paper-tooltip {
            --paper-tooltip: {
                font-size:13px;
                line-height:1.3;
                padding:8px;
            }
        }

        paper-spinner {
            width: 24px;
            height: 24px;
            --paper-spinner-stroke-width: 2px;
        }

        #container {
            display:flex;
            flex-direction:column;
            position:relative;
            padding: 24px;
            border-radius:3px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        #changer {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
        }

        #info {
            color: var(--accent-color);
            margin-right: 8px;
        }

        #changer paper-dropdown-menu {
            margin-right: 16px;
            flex: 1;
        }

        #price {
            font-size: 28px;
            font-weight: 400;
            display: flex;
            align-items:center;
        }
        
        #suffix {
            font-size: 18px;
            margin-left: 2px;
            color: var(--secondary-text-color);
        }

        #description {
            display:flex;
            flex-direction:column;
            margin-top:8px;
        }

        #description > div {
            margin-bottom: 4px;
            float:left;
        }

        .description-item {
            display: flex;
            position:relative;
            align-items:center;
            cursor: default;
            float:left;
        }
        
        .description-item iron-icon {
            margin-right: 8px;
        }
        
        iron-icon[icon="ht-elements-item-buy:check"] {
            color: var(--accent-color);
        }
        
        iron-icon[icon="ht-elements-item-buy:clear"] {
            color: #d22f2f;
        }

        #licenses-details {
            margin-top: 12px;
            color: var(--accent-color);
            font-size:14px;
        }

        #licenses-details > a {
            float:left;
        }

        #actions {
            display:flex;
            justify-content: space-between;
            margin-top: 16px;
        }
        
        #buy-now {
            position:relative;
        }

        #buy-now:not([disabled]) {
            background: var(--accent-color);
            color: #fff;
        }

        [hidden], #actions[hidden] {
            display:none;
        }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-item-buy">
        <svg>
            <defs>
                <g id="info-outline">
                    <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path>
                </g>
                <g id="add-shopping-cart">
                    <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path>
                </g>
                <g id="flash-on">
                    <path d="M7 2v11h3v9l7-12h-4l4-8z"></path>
                </g>
                <g id="check">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                </g>
                <g id="clear">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </g>
            </defs>
        </svg>
    </iron-iconset-svg>
    <div id="container">
        <section id="changer">
            <div>
                <iron-icon id="info" icon="ht-elements-item-buy:info-outline"></iron-icon>
                <paper-tooltip>${selected.description}</paper-tooltip>
            </div>
            <paper-dropdown-menu no-label-float disabled?=${
              license && license[0] && license[0].openSource ? true : false
            } no-animations on-iron-select=${e => {
      this._licenseChanged();
    }}>
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
                    ${repeat(
                      license,
                      item =>
                        html`<paper-item data=${item}>${item.name}</paper-item>`
                    )}
                </paper-listbox>
            </paper-dropdown-menu>
            <div id="price">
                <span hidden?=${!selected.free ? true : false}>Free</span>
                <span id="number" hidden?=${selected.free ? true : false}>${
      selected.price
    }</span><span id="suffix" hidden?=${selected.free ? true : false}>$</span>
            </div>
        </section>
        <section id="description">
            ${repeat(
              selected.buyDescription,
              item => html`<div><div class="description-item">
                <iron-icon icon$="ht-elements-item-buy:${
                  item.permission ? "check" : "clear"
                }"></iron-icon>
                ${(_ => {
                  let div = document.createElement("div");
                  div.innerHTML = `${item.title}`;
                  return html`${div}`;
                })()}
                </div> <paper-tooltip role="tooltip">${html`${
                  item.tooltipText
                }`}</paper-tooltip></div>`
            )}
        </section>
        <section id="licenses-details">
            <a href="/license">Подробнее о лицензиях</a>
        </section>
        <div id="actions" hidden?=${selected.free ? true : false}>
            <paper-button id="add-in-basket" raised on-click=${e => {
              this._addToCart();
            }}>
            ${
              cartChangeInProcess
                ? html`<paper-spinner active></paper-spinner>`
                : html`<iron-icon icon="ht-elements-item-buy:add-shopping-cart"></iron-icon>В корзину`
            }
                </paper-button>
                <div>
                    <paper-button id="buy-now" raised disabled?=${!signedIn} on-click=${e => {
      console.log(cartChangeInProcess);
      this._buyNow();
    }}>
                    <iron-icon icon="ht-elements-item-buy:flash-on"></iron-icon>Купить Сейчас
                    </paper-button>
                    <paper-tooltip>Для быстрой покупки надо войти в приложение.</paper-tooltip>
                </div>
            
        </div>
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-buy";
  }

  static get properties() {
    return {
      itemId: String,
      license: Array,
      selected: Object,
      cartChangeInProcess: Boolean,
      signedIn: Boolean
    };
  }

  constructor() {
    super();
    this.license = [];
    this.selected = {
      buyDescription: []
    };
  }

  get listbox() {
    return this.shadowRoot.querySelector("paper-listbox");
  }

  set data(data) {
    let license = data.license;
    this.cartChangeInProcess = data.cartChangeInProcess;
    if (
      this.cartChangeInProcess ||
      license === undefined ||
      this.itemId === data.itemId
    )
      return;
    this.itemId = data.itemId;
    let result = [];
    for (let licensetypeId in license) {
      result.push(license[licensetypeId]);
    }
    this.license = result.reverse();
    this.listbox.selected = 0;
  }

  _licenseChanged() {
    let selected = this.listbox.selectedItem.data;
    let buyDescription = [];
    for (let index in selected.buyDescription) {
      buyDescription.push(selected.buyDescription[index]);
    }
    selected.buyDescription = buyDescription;
    this.selected = selected;
  }

  _addToCart() {
    if (this.cartChangeInProcess) return;
    this.dispatchEvent(
      new CustomEvent("add-to-cart", {
        bubbles: true,
        composed: true,
        detail: {
          itemId: this.itemId,
          licensetypeId: this.selected.licensetypeId
        }
      })
    );
  }

  _buyNow() {
    console.log("_buyNow");
  }
}

customElements.define(HTElementsItemBuy.is, HTElementsItemBuy);
