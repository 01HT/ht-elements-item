"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-icon";
import "@01ht/ht-chip";
import "./ht-elements-item-data-section.js";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTElementsItemBlockAttributeFlat extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
      css`
        #container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        a {
          margin-right: 8px;
          margin-bottom: 8px;
          text-decoration: none;
          outline: none;
        }
      `
    ];
  }

  render() {
    const { name, items, type } = this;
    return html`
    ${
      items && items.length > 0
        ? html`<ht-elements-item-data-section .name="${name}">
        <div id="container">
            ${repeat(
              items,
              item => html`<a class="item" href="/catalog?${type}=${
                item.name
              }"> 
                <ht-chip .label="${item.name}" shadow ?image="${
                item.imageURL ? true : false
              }">
                    ${
                      item.imageURL
                        ? html`<div slot="avatar">
                    <iron-icon src="${
                      item.imageURL
                    }" aria-hidden="true"></iron-icon>
                    </div>`
                        : ``
                    }
                </ht-chip>
                </a>`
            )}
        </div>
    </ht-elements-item-data-section> `
        : null
    }
`;
  }

  static get properties() {
    return {
      name: { type: String },
      items: { type: Array },
      data: { type: Object },
      type: { type: String }
    };
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has("items")) {
      return true;
    }
    this._setData();
    return true;
  }

  _setData() {
    let attributes = this.data;
    let rootId = this.rootId;
    let type = this.type;
    if (!attributes || !rootId || !type) return;
    let items = [];
    for (let attributeId in attributes) {
      let attribute = attributes[attributeId];
      if (attribute.parentId === rootId) items.push(attribute);
    }
    this.items = items;
  }
}

customElements.define(
  "ht-elements-item-block-attribute-flat",
  HTElementsItemBlockAttributeFlat
);
