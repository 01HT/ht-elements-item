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

        iron-icon:first-child {
          display:none;
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
      <!--<a class="item" href="/catalog">
        <ht-chip label="Все категории" shadow></ht-chip>
      </a>-->
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

  async _addCategoryToItems(parentId, categories, items) {
    for (let categoryId in categories) {
      let category = categories[categoryId];
      if (category.parentId === parentId) {
        if (category.parentId === parentId) {
          items.push(category);
          let nextAdd = await this._addCategoryToItems(
            categoryId,
            categories,
            items
          );
          return nextAdd;
        }
      }
    }
    return;
  }

  _addHrefToItems(items) {
    try {
      for (let index in items) {
        let item = items[index];
        if (index === "0") {
          item.href = `/catalog/${item.name.toLowerCase()}`;
        } else {
          item.href = `${items[+index - 1].href}/${item.name.toLowerCase()}`;
        }
      }
      return items;
    } catch (error) {
      console.log("_addHrefToItems: " + error.message);
    }
  }

  async _setData(categories) {
    try {
      let items = [];
      await this._addCategoryToItems("root", categories, items);
      this.items = this._addHrefToItems(items);
    } catch (error) {
      console.log("_setData: " + error.message);
    }
  }

  set data(categories) {
    this._setData(categories);
  }
}

customElements.define(HTElementsItemCategory.is, HTElementsItemCategory);
