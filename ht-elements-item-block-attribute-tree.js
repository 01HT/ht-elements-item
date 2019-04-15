"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-icon";
import "@01ht/ht-chip";
import "./ht-elements-item-data-section.js";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTElementsItemBlockAttributeTree extends LitElement {
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
    const { name, items } = this;
    return html`
    ${
      items.length > 0
        ? html`<ht-elements-item-data-section .name="${name}">
        <div id="container">
            ${repeat(
              items,
              item => html`<a class="item" href="${item.href}">
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
    </ht-elements-item-data-section>`
        : null
    }
`;
  }

  static get properties() {
    return {
      name: { type: String },
      items: { type: Array },
      data: { type: Object },
      rootId: { type: String },
      type: { type: String }
    };
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has("items")) return true;
    this._setData();
    return false;
  }

  async getHref(attributeId, attributes, type, href, rootId) {
    let attribute = attributes[attributeId];
    let parentId = attribute.parentId;
    if (parentId === rootId) {
      return `/catalog?${type}=${attribute.name}${
        href === "" ? "" : `,${href}`
      }`;
    } else {
      href = `${attribute.name}${href === "" ? "" : `,${href}`}`;
      let newHref = await this.getHref(
        parentId,
        attributes,
        type,
        href,
        rootId
      );
      return newHref;
    }
  }

  async isCurrentTypeAttribute(
    attributeId,
    attributes,
    currentAttribute,
    rootId,
    type
  ) {
    let attribute = attributes[attributeId];
    if (attribute === undefined || attribute.parentId === "root") {
      return false;
    }
    if (attribute.parentId === rootId) {
      currentAttribute.href = await this.getHref(
        currentAttribute.attributeId,
        attributes,
        type,
        "",
        rootId
      );
      return currentAttribute;
    } else {
      let isCurrentTypeAttribute = await this.isCurrentTypeAttribute(
        attribute.parentId,
        attributes,
        currentAttribute,
        rootId,
        type
      );
      return isCurrentTypeAttribute;
    }
  }

  async _setData() {
    let attributes = this.data;
    let rootId = this.rootId;
    let type = this.type;
    if (!attributes || !rootId || !type) return;
    try {
      let items = [];
      let promises = [];
      for (let attributeId in attributes) {
        let currentAttribute = attributes[attributeId];
        promises.push(
          this.isCurrentTypeAttribute(
            attributeId,
            attributes,
            currentAttribute,
            rootId,
            type
          )
        );
      }
      let results = await Promise.all(promises);
      for (let result of results) {
        if (result) items.push(result);
      }
      items.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      });
      this.items = items;
    } catch (error) {
      console.log("_setData: " + error.message);
    }
  }
}

customElements.define(
  "ht-elements-item-block-attribute-tree",
  HTElementsItemBlockAttributeTree
);
