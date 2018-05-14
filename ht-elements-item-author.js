"use strict";
import { LitElement, html } from "@polymer/lit-element";
// import "@polymer/paper-button";
// import "ht-user-avatar";

class HTElementsItemAuthor extends LitElement {
  _render({ usersData }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

        a {
          display:block;
          color:inherit;
          text-decoration: none;
        }

        ht-user-avatar {
          margin-right:8px;
        }

        paper-button {
            margin:0;
            width:100%;
        }

        #container {
            display:flex;
        }

        #author {
          display:flex; 
          flex-wrap: wrap;
          align-items:center;
          margin:0;
          color: var(--secondary-text-color);
        }

        #author a#name:hover {
            text-decoration:underline;
        }

        #name {
          font-size: 14px;
          margin-right:16px;
        }

        #portfolio {
            text-decoration: none;;
        }
    </style>
    <div id="container">
        <div id="author">
            <ht-user-avatar data=${usersData} size="42" verified-size="16"></ht-user-avatar>
            <a id="name" href="/user/${usersData.nickname}/${
      usersData.userId
    }">${usersData.displayName}</a>
          <a id="portfolio" href="/portfolio/${usersData.nickname}/${
      usersData.userId
    }">
          <paper-button raised>Портфолио</paper-button>
          </a>
        </div>
        
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-author";
  }

  static get properties() {
    return {
      usersData: Object
    };
  }

  constructor() {
    super();
    this.usersData = {};
  }

  set data(usersData) {
    this.usersData = usersData;
  }
}

customElements.define(HTElementsItemAuthor.is, HTElementsItemAuthor);
