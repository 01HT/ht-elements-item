"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-icon";
import "@01ht/ht-chip";

class HTElementsItemBlockBrowsers extends LitElement {
  render() {
    const { items } = this;
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

        #empty {
          color: var(--secondary-text-color);
        }

        [hidden] {
          display: none;
        }
    </style>
    <div id="container">
          <div id="empty" ?hidden=${items.length > 0}>Не указано</div>
          ${repeat(
            items,
            item => html`<a class="item" href="/catalog?browsers=${item.name}"> 
              <ht-chip label=${item.name} shadow ?image=${
              item.imageURL ? true : false
            }>
                ${
                  item.imageURL
                    ? html`<div slot="avatar">
                  <iron-icon src=${
                    item.imageURL
                  } aria-hidden="true"></iron-icon>
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
      items: { type: Array }
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
