"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/lib/repeat.js";
import "@polymer/iron-icon";
import "ht-chip";
class HTElementsItemBlockTools extends LitElement {
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
            item => html`<a class="item" href="/catalog?tools=${item.name}"> 
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
    return "ht-elements-item-block-tools";
  }

  static get properties() {
    return {
      items: Array
    };
  }

  constructor() {
    super();
    this.items = [];
    this.toolsId = "ryLeJ8fi7qP43Us3F3iF";
  }

  set data(attributes) {
    let items = [];
    for (let attributeId in attributes) {
      let attribute = attributes[attributeId];
      if (attribute.parentId === this.toolsId) items.push(attribute);
    }
    this.items = items;
  }
}

customElements.define(HTElementsItemBlockTools.is, HTElementsItemBlockTools);
