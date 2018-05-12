"use strict";
import { LitElement, html } from "@polymer/lit-element";
// import "@polymer/paper-spinner/paper-spinner.js";
import "./ht-elements-item-breadcrumbs.js";
import "./ht-elements-item-preview.js";
// import "./ht-elements-catalog-filter.js";
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
            font-size: 28px; 
            font-weight: 400;
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
            display:flex;
            flex-wrap:wrap;
        }

        #preview {
            width:100%;
            max-width:800px;
        }


    
        #spinner-container[hidden], #layout[hidden] {
            display: none;
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
            <section>
            <section id="sidebar">
                <ht-elements-item-buy data=${
                  itemData.license
                }></ht-elements-item-buy>
                <ht-elements-item-author data=${
                  itemData.usersData
                }></ht-elements-item-author>
                <ht-elements-item-date data=${
                  itemData.created
                }></ht-elements-item-date>
                <ht-elements-item-date data=${
                  itemData.updated
                }></ht-elements-item-date>
                <ht-elements-item-attributes data=${
                  itemData.attributes
                }></ht-elements-item-attributes>
            <section>
            <section id="description">
                <ht-elements-item-description data=${
                  itemData.description
                }></ht-elements-item-description>
            <section>
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
    //   this.firstLoading = true;
    //   this.loading = false;
    //   // view
    //   let view = localStorage.getItem("catalog-list-view-mode");
    //   view === null ? (this.view = "grid") : (this.view = view);
  }

  // ready() {
  //     super.ready();
  //     this.shadowRoot.addEventListener("parameters-changed", e => {
  //         e.stopPropagation();
  //         const parameters = e.detail;
  //         this._updateLocation(parameters);
  //     });
  //     this.shadowRoot.addEventListener("view-changed", e => {
  //         e.stopPropagation();
  //         const view = e.detail;
  //         this._changeView(view);
  //     });
  //     this.shadowRoot.addEventListener("close-chip", e => {
  //         e.stopPropagation();
  //     });
  // }

  // get search() {
  //     return this.shadowRoot.querySelector("ht-elements-catalog-search");
  // }

  // get filter() {
  //     return this.shadowRoot.querySelector("#main ht-elements-catalog-filter");
  // }

  // get filterInSearch() {
  //     return this.shadowRoot.querySelector(
  //         "ht-elements-catalog-search ht-elements-catalog-filter"
  //     );
  // }

  // get list() {
  //     return this.shadowRoot.querySelector("ht-elements-catalog-list");
  // }

  // get selectedFilters() {
  //     return this.shadowRoot.querySelector(
  //         "ht-elements-catalog-selected-filters"
  //     );
  // }

  // async _setParameters(path) {
  //     let parameters = await getParametersFromPath(path);
  //     this.parameters = parameters;
  //     this._getItems(parameters);
  // }

  // async _getItems(parameters) {
  //     try {
  //         this.loading = true;
  //         // let response = await window.firebase
  //         //   .functions()
  //         //   .httpsCallable("dbItemsGetCatalogItems")({
  //         //   path: path
  //         // });
  //         // let data = await callFirebaseHTTPFunction({
  //         //   name: "httpsGetCatalogPageDataIndex",
  //         //   options: {
  //         //     method: "POST",
  //         //     headers: new Headers({
  //         //       "Content-Type": "application/json"
  //         //     }),
  //         //     body: JSON.stringify(parameters)
  //         //   }
  //         // });
  //         let data = await callTestHTTPFunction(
  //             "httpsGetCatalogPageDataIndex",
  //             parameters
  //         );
  //         await this._setData(data);
  //         if (this.firstLoading) this.firstLoading = false;
  //         this.loading = false;
  //     } catch (error) {
  //         console.log("_getItems: " + error.message);
  //     }
  // }

  // async _setData(data) {
  //     try {
  //         this.list.data = data.items;
  //         this.filter.data = data.filter;
  //         this.filterInSearch.data = data.filter;
  //         this.selectedFilters.data = data.items.length;
  //         this.loading = false;
  //     } catch (err) {
  //         console.log("_setData: " + err.message);
  //     }
  // }

  // async _updateLocation(parameters) {
  //     let path = await getPathFromParameters(parameters);
  //     if (this.path === path) return;
  //     history.pushState(null, "", path);
  //     this.dispatchEvent(
  //         new CustomEvent("change-location", {
  //             bubbles: true,
  //             composed: true,
  //             detail: path
  //         })
  //     );
  // }

  // _changeView(view) {
  //     localStorage.setItem("catalog-list-view-mode", view);
  //     this.view = view;
  // }

  // _showSelectedFilters(parameters) {
  //     if (Object.keys(parameters).length) return true;
  //     return false;
  // }
}

customElements.define(HTElementsItem.is, HTElementsItem);
