"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/lib/repeat.js";
import "@polymer/iron-icon";
import "@01ht/ht-chip";
class HTElementsItemBlockBrowsers extends LitElement {
  _render({ items }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }
    
        #container {
            display: flex;
            flex-wrap: wrap;
            margin-top: 16px;
        }
    
        a {
            margin-right: 8px;
            margin-bottom: 8px;
        }
    </style>
    <div id="container">
          ${repeat(
            items,
            item => html`<a class="item" href="/catalog?browsers=${item.name}"> 
              <ht-chip label=${item.name} shadow image?=${
              item.imageURL ? true : false
            }>
                ${
                  item.imageURL
                    ? html`<div slot="avatar">
                  <iron-icon src="${item.imageURL}"></iron-icon>
                </div>`
                    : ``
                }
              </ht-chip>
            </a>`
          )}
    </div>
      
`;
  }

  static get is() {
    return "ht-elements-item-block-browsers";
  }

  static get properties() {
    return {
      items: Array
    };
  }

  constructor() {
    super();
    this.items = [];
    this.browsersId = "PQ0L62DLNzaYjKkHswxz";
  }

  set data(attributes) {
    let items = [];
    for (let attributeId in attributes) {
      let attribute = attributes[attributeId];
      if (attribute.parentId === this.browsersId) items.push(attribute);
    }
    this.items = items;
  }
}

customElements.define(
  HTElementsItemBlockBrowsers.is,
  HTElementsItemBlockBrowsers
);
