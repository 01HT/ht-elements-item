"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/paper-button";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-tooltip";
import "@01ht/ht-spinner";

import { styles } from "@01ht/ht-theme/styles";

class HTElementsItemBuy extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        a {
          display: block;
          text-decoration: none;
        }

        paper-button {
          margin: 0;
          padding: 8px 16px;
          min-height: 52px;
        }

        paper-listbox {
          width: 100%;
          --paper-listbox-background-color: #fff;
        }

        paper-item {
          cursor: pointer;
        }

        #container {
          display: flex;
          flex-direction: column;
          max-width: 386px;
          margin: auto;
          position: relative;
          padding: 24px;
          border-radius: 3px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        #title {
          font-size: 18px;
          font-weight: 400;
          margin-bottom: 16px;
        }

        #changer {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
        }

        #changer #dropdown {
          position: relative;
          margin-right: 24px;
          display: flex;
          flex: 1;
          align-items: center;
        }

        #info {
          color: var(--accent-color);
          margin-right: 8px;
        }

        #changer paper-dropdown-menu {
          flex: 1;
        }

        #price {
          font-size: 28px;
          font-weight: 400;
          display: flex;
          align-items: center;
        }

        #suffix {
          font-size: 18px;
          margin-left: 2px;
          color: var(--secondary-text-color);
        }

        #description {
          display: flex;
          flex-direction: column;
          margin-top: 8px;
        }

        .description-item {
          display: flex;
          align-items: center;
          cursor: default;
          float: left;
          margin-bottom: 4px;
          font-size: 14px;
          position: relative;
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
          font-size: 14px;
        }

        #licenses-details > a {
          float: left;
        }

        #actions {
          display: flex;
          flex-direction: column;
          margin-top: 24px;
        }

        #add-in-basket {
          background: var(--accent-color);
        }

        ht-spinner {
          display: flex;
          height: 52px;
          justify-content: center;
          align-items: center;
        }

        #buy-now {
          position: relative;
          margin-top: 16px;
          background: #737373;
          /* background:#039be5; */
          width: 100%;
        }

        #buy-now-spinner {
          margin-top: 16px;
        }

        #buy-now[disabled],
        #add-in-basket[disabled] {
          background: #ccc;
        }

        [hidden],
        #actions[hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    const {
      signedIn,
      license,
      selected,
      cartChangeInProcess,
      orderCreating
    } = this;
    return html`
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
        <div id="title">Доступные лицензии</div>
        <section id="changer">
            <div id="dropdown">
                <iron-icon id="info" icon="ht-elements-item-buy:info-outline"></iron-icon>
                <paper-dropdown-menu no-label-float ?disabled="${
                  license && license.length === 1 ? true : false
                }" no-animations @iron-select="${this._licenseChanged}">
                <paper-listbox slot="dropdown-content" class="dropdown-content">
                    ${repeat(
                      license,
                      item =>
                        html`<paper-item .data="${item}">${
                          item.name
                        }</paper-item>`
                    )}
                </paper-listbox>
            </paper-dropdown-menu>
                <paper-tooltip>${selected.description}</paper-tooltip>
            </div>
            <div id="price">
                <span ?hidden="${!selected.free}">FREE</span>
                <span id="number" ?hidden="${selected.free}">${
      selected.price
    }</span><span id="suffix" ?hidden="${selected.free}">$</span>
            </div>
        </section>
        <section id="description">
            ${repeat(
              selected.buyDescription,
              item => html`<div class="description-item">
                <iron-icon icon="ht-elements-item-buy:${
                  item.permission ? "check" : "clear"
                }"></iron-icon>
                ${(_ => {
                  let div = document.createElement("div");
                  div.innerHTML = `${item.title}`;
                  return html`${div}`;
                })()}
                <paper-tooltip role="tooltip">${html`${
                  item.tooltipText
                }`}</paper-tooltip></div>`
            )}
        </section>
        <section id="licenses-details">
            <a href="/license">Подробнее о лицензиях</a>
        </section>
        <div id="actions" ?hidden="${selected.free}">
            ${
              cartChangeInProcess
                ? html`<ht-spinner button></ht-spinner>`
                : html`<paper-button id="add-in-basket" raised ?disabled="${orderCreating}" @click="${
                    this._addToCart
                  }"><iron-icon icon="ht-elements-item-buy:add-shopping-cart"></iron-icon>В корзину</paper-button>`
            }
            <div>
            ${
              orderCreating
                ? html`<ht-spinner id="buy-now-spinner" button></ht-spinner>`
                : html`${
                    !orderCreating && signedIn && !cartChangeInProcess
                      ? html`<paper-button id="buy-now" raised @click=${
                          this._buyNow
                        }>
                    <iron-icon icon="ht-elements-item-buy:flash-on"></iron-icon>Купить Сейчас
                    </paper-button>`
                      : html`<paper-button id="buy-now" raised disabled>
                    <iron-icon icon="ht-elements-item-buy:flash-on"></iron-icon>Купить Сейчас
                    </paper-button>`
                  }`
            }
                
                    <paper-tooltip ?hidden="${signedIn}">Для быстрой покупки войдите в приложение</paper-tooltip>
                </div>
        </div>
    </div>
`;
  }

  static get properties() {
    return {
      itemId: { type: String },
      license: { type: Array },
      selected: { type: Object },
      cartChangeInProcess: { type: Boolean },
      orderCreating: { type: Boolean },
      signedIn: { type: Boolean },
      data: { type: String }
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
    data = JSON.parse(data);
    let license = data.license;
    if (license === undefined) return;
    this.itemId = data.itemId;
    let result = [];
    for (let licensetypeId in license) {
      result.push(license[licensetypeId]);
    }
    this.license = result.reverse();
    this._setSelected(this.license[0]);
    setTimeout(() => {
      this.listbox.selected = undefined;
      this.listbox.selected = 0;
    }, 500);
  }

  _setSelected(item) {
    if (!item) return;
    let buyDescription = [];
    for (let index in item.buyDescription) {
      buyDescription.push(item.buyDescription[index]);
    }
    item.buyDescription = buyDescription;
    this.selected = item;
  }

  _licenseChanged() {
    this._setSelected(this.listbox.selectedItem.data);
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

  async _buyNow() {
    this.orderCreating = true;
    this.dispatchEvent(
      new CustomEvent("create-order", {
        bubbles: true,
        composed: true,
        detail: {
          itemId: this.itemId,
          ordertypeId: "v2m2Mq3clhUhyeex5Xkp"
        }
      })
    );
  }
}

customElements.define("ht-elements-item-buy", HTElementsItemBuy);
