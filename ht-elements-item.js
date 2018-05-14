"use strict";
import { LitElement, html } from "@polymer/lit-element";
// import "@polymer/paper-spinner/paper-spinner.js";
import "./ht-elements-item-breadcrumbs.js";
import "./ht-elements-item-preview.js";
import "./ht-elements-item-description.js";

import "./ht-elements-item-author.js";
import "./ht-elements-item-sales.js";

import "./ht-elements-item-data-section.js";
import "./ht-elements-item-date.js";

import "./ht-elements-item-block-platform.js";
import "./ht-elements-item-block-browsers.js";
import "./ht-elements-item-block-tools.js";
import "./ht-elements-item-block-tags.js";

// import "./ht-elements-catalog-list.js";
// import "./ht-elements-catalog-actions.js";
// import "./ht-elements-catalog-selected-filters.js";
// import {
//   callTestHTTPFunction,
//   callFirebaseHTTPFunction
// } from "ht-client-helper-functions";
class HTElementsItem extends LitElement {
  _render({ loading, itemData }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

        h1 {
            font-size: 36px;
            font-weight: 400;
            color:#424242;
            margin-top:0;
            margin-bottom: 16px;
        }

        paper-spinner { 
            --paper-spinner-stroke-width: 4px; 
            margin-top: 64px; 
            width: 64px; 
            height: 64px;
            }
        }

        ht-elements-item-breadcrumbs {

        }

        ht-elements-item-preview {
            margin-top: 32px;
            position:relative;
        }

        ht-elements-item-description {
        }

        ht-elements-item-sales {
          margin-top:32px;
        }

        ht-elements-item-data-section  {
          margin-top:32px;
        }
        

        #container {

        }
    
        #spinner-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            align-content: center;
        }

        #layout {
            display:grid;
            grid-gap: 32px;
            margin-top:32px;
        }

        #preview {
          grid-column: 1 / 9; 
          grid-row: 1;
        }

        #sidebar {
          grid-column: 10 / 13; 
          grid-row: 1 / 3;
        }

        #description {
          grid-column: 1 / 9;
          grid-row: 2;
        }

        #spinner-container[hidden], #layout[hidden] {
            display: none;
        }

        @media (max-width:900px) {
          h1 {
            font-size:24px;
          }

          #layout {
            grid-gap: 32px;
            margin-top:16px;
          }

          #preview {
          grid-column: 1 / 13; 
          grid-row: 1;
        }

        #sidebar {
          grid-column: 1 / 13; 
          grid-row: 2;
        }

        #description {
          grid-column: 1 / 13;
          grid-row: 3;
        }
        }
    </style>
    <div id="container">
        <div id="spinner-container" hidden?=${!loading}>
            <paper-spinner active?=${loading}></paper-spinner>
        </div>
        <section id="layout" hidden?=${loading}>
            <section id="preview">
                <h1>${itemData.name}</h1>
                <ht-elements-item-breadcrumbs data=${
                  itemData.categories
                }></ht-elements-item-breadcrumbs>
                <ht-elements-item-preview data=${itemData}></ht-elements-item-preview>
            </section>
            <section id="sidebar">
                <ht-elements-item-buy data=${
                  itemData.license
                }></ht-elements-item-buy>
                <ht-elements-item-author data=${
                  itemData.usersData
                }></ht-elements-item-author>
                <ht-elements-item-sales data=${
                  itemData.sales
                }></ht-elements-item-sales>

                <ht-elements-item-data-section name="Последнее обновление">
                  <ht-elements-item-date data=${
                    itemData.updated
                  }></ht-elements-item-date>
                </ht-elements-item-data-section>
                
                <ht-elements-item-data-section name="Дата создания">
                  <ht-elements-item-date data=${
                    itemData.created
                  }></ht-elements-item-date>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Платформа">
                  <ht-elements-item-block-platform data=${
                    itemData.attributes
                  }></ht-elements-item-block-platform>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Совместимые браузеры">
                  <ht-elements-item-block-browsers data=${
                    itemData.attributes
                  }></ht-elements-item-block-browsers>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Инструменты">
                  <ht-elements-item-block-tools data=${
                    itemData.attributes
                  }></ht-elements-item-block-tools>
                </ht-elements-item-data-section>

                <ht-elements-item-data-section name="Теги">
                  <ht-elements-item-block-tags data=${
                    itemData.tags
                  }></ht-elements-item-block-tags>
                </ht-elements-item-data-section>
            </section>
            <section id="description">
                <ht-elements-item-description data=${
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
      itemId: String,
      loading: Boolean,
      itemData: Object
    };
  }

  set itemId(itemId) {
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

  constructor() {
    super();
    this.itemData = {};
  }
}

customElements.define(HTElementsItem.is, HTElementsItem);
