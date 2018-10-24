"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@01ht/ht-spinner";
import "./ht-elements-item-preview.js";
import "./ht-elements-item-description.js";
import "./ht-elements-item-buy.js";
import "./ht-elements-item-author.js";
import "./ht-elements-item-sales.js";
import "./ht-elements-item-data-section.js";
import "./ht-elements-item-date.js";
import "./ht-elements-item-category.js";
import "./ht-elements-item-block-platform.js";
import "./ht-elements-item-block-browsers.js";
import "./ht-elements-item-block-tools.js";
import "./ht-elements-item-block-tags.js";
import "./ht-elements-item-copyright.js";

class HTElementsItem extends LitElement {
  render() {
    const { itemData, loading, cartChangeInProcess, itemId, signedIn } = this;
    return html`
    ${SharedStyles}
    <style>
      ht-elements-item-author {
        margin-top: 32px;
      }

      ht-elements-item-preview {
        margin-top: 32px;
        position:relative;
      }
      
      ht-elements-item-sales {
        margin-top:32px;
      }

      ht-elements-item-data-section  {
        margin-top:32px;
      }

      ht-elements-item-copyright {
        margin-top:32px;
      }

      #layout {
        display:grid;
        grid-template-columns: 1fr 386px;
        grid-template-rows: auto 1fr;
        grid-gap: 64px;
      }

      #preview {
        grid-row: 1;
      }

      #sidebar {
        grid-row: 1 / 3;
        margin-top:32px;
      }

      #description {
        grid-row: 2;
        margin-top:-32px;
        overflow: auto;
      }

      #layout[hidden] {
          display: none;
      }

      @media (max-width:1000px) {
        #layout {
          grid-template-columns: 1fr;
          grid-gap: 32px;
        }

        #sidebar {
          grid-row: 2;
          margin-top: 0;
        }

        #description {
          grid-row: 3;
        }
      }

      [hidden] {
        display: none;
      }
    </style>
    <div id="container">
        ${loading ? html`<ht-spinner page></ht-spinner>` : ""}
        <section id="layout" ?hidden=${loading}>
            <section id="preview">
                <h1 class="mdc-typography--headline4">${itemData.name}</h1>
                <ht-elements-item-preview .data=${itemData}></ht-elements-item-preview>
            </section>
            <section id="sidebar">
                <ht-elements-item-buy .signedIn=${signedIn} .cartChangeInProcess=${cartChangeInProcess} data=${JSON.stringify(
      {
        itemId: itemId,
        license: itemData.license
      }
    )}></ht-elements-item-buy>
                <ht-elements-item-author .data=${
                  itemData.authorData
                }></ht-elements-item-author>

                <ht-elements-item-sales .data=${
                  itemData.sales
                } ?hidden=${itemData.sales === 0}></ht-elements-item-sales>

                <ht-elements-item-data-section name="Последнее обновление">
                  <ht-elements-item-date .data=${
                    itemData.updated
                  }></ht-elements-item-date>
                </ht-elements-item-data-section>
                
                <ht-elements-item-data-section name="Дата создания">
                  <ht-elements-item-date .data=${
                    itemData.created
                  }></ht-elements-item-date>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Категория">
                  <ht-elements-item-category .data=${
                    itemData.categories
                  }></ht-elements-item-category>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Платформа">
                  <ht-elements-item-block-platform .data=${
                    itemData.attributes
                  }></ht-elements-item-block-platform>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Совместимые браузеры">
                  <ht-elements-item-block-browsers .data=${
                    itemData.attributes
                  }></ht-elements-item-block-browsers>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Инструменты">
                  <ht-elements-item-block-tools .data=${
                    itemData.attributes
                  }></ht-elements-item-block-tools>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Теги">
                  <ht-elements-item-block-tags .data=${
                    itemData.tags
                  }></ht-elements-item-block-tags>
                </ht-elements-item-data-section>

                <ht-elements-item-copyright .data=${
                  itemData.copyright
                }></ht-elements-item-copyright>
            </section>
            <section id="description">
                <ht-elements-item-description .data=${
                  itemData.description
                }></ht-elements-item-description>
            </section>
        </section>
    </div>
`;
  }

  static get is() {
    return "ht-elements-item";
  }

  static get properties() {
    return {
      itemId: { type: String },
      loading: { type: Boolean },
      itemData: { type: Object },
      data: { type: String },
      cartChangeInProcess: { type: Boolean },
      signedIn: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.itemData = {};
  }

  set data(itemId) {
    if (itemId === this.itemId) return;
    this.itemId = itemId;
    this._getItemData(itemId);
  }

  async _getItemData(itemId) {
    try {
      this.loading = true;
      let snapshot = await firebase
        .firestore()
        .collection("items")
        .doc(itemId)
        .get();
      if (!snapshot.exists) {
        this.dispatchEvent(
          new CustomEvent("item-not-found", {
            bubbles: true,
            composed: true
          })
        );
      }
      this.itemData = snapshot.data();
      this.loading = false;
    } catch (error) {
      console.log("_getItemData: " + error.message);
    }
  }
}

customElements.define(HTElementsItem.is, HTElementsItem);
