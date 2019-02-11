"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-icon";
import "@01ht/ht-chip";

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

        #empty {
          color: var(--secondary-text-color);
        }

        [hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    const { items } = this;
    return html`
      <div id="container">
        <div id="empty" ?hidden="${items.length > 0}">Не указано</div>
        ${repeat(
          items,
          item => html`<a class="item" href="/catalog?tags=${item.name}"> 
            <ht-chip .label="${item.name}" shadow></ht-chip>
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
  }

  set data(tags) {
    let items = [];
    for (let tagId in tags) {
      items.push(tags[tagId]);
    }
    this.items = items;
  }
}

customElements.define("ht-elements-item-block-tags", HTElementsItemBlockTags);
