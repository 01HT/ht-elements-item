"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/lib/repeat.js";
// import "@polymer/iron-iconset-svg";
// import "@polymer/iron-icon";

class HTElementsItemBreadcrumbs extends LitElement {
  _render({ items }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

        a { 
            display:block; 
            color:inherit; 
            text-decoration: none; 
            color: var(--secondary-text-color);
        } 
        
        a:hover { 
            text-decoration: underline; 
        }

        iron-icon { 
            color: var(--secondary-text-color); 
        }
    
        #container {
            display: flex;
            align-items:center;
            flex-wrap:wrap;
        }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-item-breadcrumbs">
        <svg>
            <defs>
                <g id="chevron-right">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </g>
            </defs>
        </svg>
    </iron-iconset-svg>
    <div id="container">
        <a href="/catalog">Каталог</a>
        ${repeat(
          items,
          item => html`
            <iron-icon icon="ht-elements-item-breadcrumbs:chevron-right"></iron-icon><a href=${
              item.href
            }>${item.name}</a>`
        )}
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-breadcrumbs";
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

customElements.define(HTElementsItemBreadcrumbs.is, HTElementsItemBreadcrumbs);
