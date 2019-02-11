"use strict";
import { LitElement, html, css } from "lit-element";
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
import {
  updateMetadata,
  getMetaDescriptionFromQuillObject
} from "@01ht/ht-client-helper-functions/metadata.js";

import { styles } from "@01ht/ht-theme/styles";

class HTElementsItem extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        ht-elements-item-author {
          margin-top: 32px;
        }

        ht-elements-item-preview {
          margin-top: 32px;
          position: relative;
        }

        ht-elements-item-sales {
          margin-top: 32px;
        }

        ht-elements-item-data-section {
          margin-top: 32px;
        }

        ht-elements-item-copyright {
          margin-top: 32px;
        }

        #layout {
          display: grid;
          grid-template-columns: 1fr 386px;
          grid-template-rows: auto 1fr;
          grid-gap: 64px;
        }

        #preview {
          grid-row: 1;
        }

        #sidebar {
          grid-row: 1 / 3;
          margin-top: 32px;
        }

        #description {
          grid-row: 2;
          margin-top: -32px;
          overflow: auto;
        }

        #layout[hidden] {
          display: none;
        }

        @media (max-width: 1000px) {
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
      `
    ];
  }

  render() {
    const {
      itemData,
      loading,
      cartChangeInProcess,
      orderCreating,
      signedIn
    } = this;
    return html`
    <div id="container">
        ${loading ? html`<ht-spinner page></ht-spinner>` : ""}
        <section id="layout" ?hidden="${loading}">
            <section id="preview">
                <h1 class="mdc-typography--headline4">${itemData.name}</h1>
                <ht-elements-item-preview .data="${itemData}"></ht-elements-item-preview>
            </section>
            <section id="sidebar">
                <ht-elements-item-buy .signedIn="${signedIn}" .cartChangeInProcess="${cartChangeInProcess}" .orderCreating=${orderCreating} .data="${JSON.stringify(
      {
        itemId: itemData.itemId,
        license: itemData.license
      }
    )}"></ht-elements-item-buy>
                <ht-elements-item-author .data="${
                  itemData.authorData
                }"></ht-elements-item-author>

                <ht-elements-item-sales .data="${
                  itemData.sales
                }" ?hidden="${itemData.sales === 0}"></ht-elements-item-sales>

                <ht-elements-item-data-section name="Последнее обновление">
                  <ht-elements-item-date .data="${
                    itemData.updated
                  }"></ht-elements-item-date>
                </ht-elements-item-data-section>
                
                <ht-elements-item-data-section name="Дата создания">
                  <ht-elements-item-date .data="${
                    itemData.created
                  }"></ht-elements-item-date>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Категория">
                  <ht-elements-item-category .data="${
                    itemData.categories
                  }"></ht-elements-item-category>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Платформа">
                  <ht-elements-item-block-platform .data="${
                    itemData.attributes
                  }"></ht-elements-item-block-platform>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Совместимые браузеры">
                  <ht-elements-item-block-browsers .data="${
                    itemData.attributes
                  }"></ht-elements-item-block-browsers>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Инструменты">
                  <ht-elements-item-block-tools .data="${
                    itemData.attributes
                  }"></ht-elements-item-block-tools>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Теги">
                  <ht-elements-item-block-tags .data="${
                    itemData.tags
                  }"></ht-elements-item-block-tags>
                </ht-elements-item-data-section>

                <ht-elements-item-copyright .data="${
                  itemData.copyright
                }"></ht-elements-item-copyright>
            </section>
            <section id="description">
                <ht-elements-item-description .data="${
                  itemData.description
                }"></ht-elements-item-description>
            </section>
        </section>
    </div>
`;
  }

  static get properties() {
    return {
      itemNumber: { type: Number },
      nameInURL: { type: String },
      loading: { type: Boolean },
      itemData: { type: Object },
      data: { type: String },
      cartChangeInProcess: { type: Boolean },
      orderCreating: { type: Boolean },
      signedIn: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.itemData = {};
  }

  updated() {
    if (this.itemData.name === undefined) return;
    let description = this.itemData.metaDescription;
    if (description == "") {
      try {
        description = getMetaDescriptionFromQuillObject(
          JSON.parse(this.itemData.description)
        );
      } catch (err) {
        description = "";
      }
    }
    if (description == "") {
      description = `${this.itemData.name} | ${
        this.itemData.authorData.displayName
      }`;
    }
    updateMetadata({
      title: `${this.itemData.name} | ${this.itemData.authorData.displayName}`,
      image: `${window.cloudinaryURL}/image/upload/c_scale,f_auto,w_512/v${
        this.itemData.image.version
      }/${this.itemData.image.public_id}.jpg`,
      imageAlt: `${this.itemData.name}`,
      canonical: `https://elements.01.ht/item/${this.itemData.nameInURL}/${
        this.itemData.itemNumber
      }`,
      description: description
    });
  }

  set data(itemNumber) {
    if (itemNumber === this.itemNumber) return;
    this.itemNumber = itemNumber;
    this._getItemData(itemNumber);
  }

  async _getItemData(itemNumber) {
    try {
      this.loading = true;
      let snapshot = await firebase
        .firestore()
        .collection("items")
        .where("itemNumber", "==", itemNumber)
        .get();
      this.loading = false;
      if (snapshot.empty) {
        this.dispatchEvent(
          new CustomEvent("page-not-found", {
            bubbles: true,
            composed: true
          })
        );
        return;
      }
      let itemData = {};
      snapshot.forEach(doc => {
        itemData = doc.data();
        itemData.itemId = doc.id;
      });
      this.itemData = itemData;
      if (this.itemData.nameInURL !== this.nameInURL) {
        this.dispatchEvent(
          new CustomEvent("page-not-found", {
            bubbles: true,
            composed: true
          })
        );
      }
    } catch (error) {
      console.log("_getItemData: " + error.message);
    }
  }
}

customElements.define("ht-elements-item", HTElementsItem);
