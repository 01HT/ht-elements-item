"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-icon";
import "@01ht/ht-chip";

class HTElementsItemBlockTags extends LitElement {
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
