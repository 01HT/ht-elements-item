"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/lib/repeat.js";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "ht-chip";

class HTElementsItemCategory extends LitElement {
  _render({ items }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

        iron-icon { 
            color: var(--secondary-text-color); 
            margin-bottom: 8px;
        }
    
        #container {
            display: flex;
            flex-wrap: wrap;
            align-items:center;
            margin-top: 16px;
        }
    
        a {
            margin-bottom: 8px;
        }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-item-category">
        <svg>
            <defs>
                <g id="chevron-right">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </g>
            </defs>
        </svg>
    </iron-iconset-svg>
    <div id="container">
      <a class="item" href="/catalog">
        <ht-chip label="Все категории" shadow></ht-chip>
      </a>
        ${repeat(
          items,
          item => html`<iron-icon icon="ht-elements-item-category:chevron-right"></iron-icon>
      <a class="item" href=${item.href}>
              <ht-chip label=${item.name} shadow></ht-chip>
            </a>`
        )}
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-category";
  }

  static get properties() {
    return {
      items: Array
    };
  }

  constructor() {
    super();
    this.items = [];
  }

  set data(categories) {
    let items = [];
    for (let item of categories) {
      item.href = this._getHref(categories, item.name);
      items.push(item);
    }
    this.items = items;
  }

  _getHref(categories, categoryName) {
    let href = "/catalog";
    for (let category of categories) {
      href += `/${category.name}`;
      if (category.name === categoryName) return href.toLowerCase();
    }
  }
}

customElements.define(HTElementsItemCategory.is, HTElementsItemCategory);
