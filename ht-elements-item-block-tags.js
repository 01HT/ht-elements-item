"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-icon";
import "@01ht/ht-chip";
import "./ht-elements-item-data-section.js";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTElementsItemBlockTags extends LitElement {
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
        <div id="container"></ht-elements-item-data-section>
        ${repeat(
          items,
          item => html`<a class="item" href="/catalog?tags=${item.name}"> 
            <ht-chip .label="${item.name}" shadow></ht-chip>
          </a>`
        )}
      </div></ht-elements-item-data-section>`
        : null
    }
`;
  }

  static get properties() {
    return {
      name: { type: String },
      items: { type: Array },
      data: { type: Object }
    };
  }

  constructor() {
    super();
    this.items = [];
  }

  set data(tags) {
    if (!tags) return;
    let items = [];
    for (let tagId in tags) {
      items.push(tags[tagId]);
    }
    this.items = items;
  }
}

customElements.define("ht-elements-item-block-tags", HTElementsItemBlockTags);
