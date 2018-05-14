"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/lib/repeat.js";
// import "@polymer/iron-icon";
// import "ht-chip";
class HTElementsItemBlockPlatform extends LitElement {
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
            margin-top:16px;
        }

        a {
            margin-right: 8px;
            margin-bottom: 8px;
          }
      </style>
      <div id="container">
          ${repeat(
            items,
            item => html`<a class="item" href=${item.href}> 
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
    return "ht-elements-item-block-platform";
  }

  static get properties() {
    return {
      items: Array
    };
  }

  constructor() {
    super();
    this.items = [];
    this.platformId = "wmGspVTvzR5p6XVsL8Fd";
  }

  async isPlatformAttribute(attributeId, attributes, currentAttribute) {
    for (let attribute of attributes) {
      if (attribute.categoryId === attributeId) {
        if (attribute.parentId === "root") return false;
        if (attribute.parentId === this.platformId) {
          currentAttribute.href = `/catalog?platform=${currentAttribute.name.toLowerCase()}`;
          return currentAttribute;
        } else {
          let isPlatformAttribute = await this.isPlatformAttribute(
            attribute.parentId,
            attributes,
            currentAttribute
          );
          return isPlatformAttribute;
        }
      }
    }
    return false;
  }

  async setItems(attributes) {
    let items = [];
    let promises = [];
    for (let attribute of attributes) {
      promises.push(
        this.isPlatformAttribute(attribute.categoryId, attributes, attribute)
      );
    }
    let results = await Promise.all(promises);
    for (let result of results) {
      if (result) items.push(result);
    }
    this.items = items;
  }

  set data(attributes) {
    this.setItems(attributes);
  }
}

customElements.define(
  HTElementsItemBlockPlatform.is,
  HTElementsItemBlockPlatform
);
