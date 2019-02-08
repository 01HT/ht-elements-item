"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-icon";
import "@01ht/ht-chip";

class HTElementsItemBlockPlatform extends LitElement {
  static styles = css`<style>
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

    #empty {
      color: var(--secondary-text-color);
    }

    [hidden] {
      display: none;
    }
  </style>`;

  render() {
    const { items } = this;
    return html`
      <div id="container">
        <div id="empty" ?hidden="${items.length > 0}">Не указано</div>
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
      
`;
  }

  static get properties() {
    return {
      items: { type: Array }
    };
  }

  constructor() {
    super();
    this.items = [];
    this.platformId = "wmGspVTvzR5p6XVsL8Fd";
  }

  async isPlatformAttribute(attributeId, attributes, currentAttribute) {
    let attribute = attributes[attributeId];
    if (attribute === undefined || attribute.parentId === "root") return false;
    if (attribute.parentId === this.platformId) {
      currentAttribute.href = `/catalog?platform=${currentAttribute.name}`;
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

  async _setData(attributes) {
    try {
      let items = [];
      let promises = [];
      for (let attributeId in attributes) {
        let currentAttribute = attributes[attributeId];
        promises.push(
          this.isPlatformAttribute(attributeId, attributes, currentAttribute)
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

  set data(attributes) {
    this._setData(attributes);
  }
}

customElements.define(
  "ht-elements-item-block-platform",
  HTElementsItemBlockPlatform
);
