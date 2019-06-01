"use strict";
import { LitElement, html, css } from "lit-element";
import "@polymer/paper-button";

import { styles } from "@01ht/ht-theme/styles";

class HTElementsItemDonation extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        a,
        a:hover {
          display: block;
          text-decoration: none;
        }

        svg {
          margin-right: 8px;
          width: 18px;
          height: 18px;
        }

        paper-button {
          margin: 0;
          padding: 8px 16px;
          min-height: 52px;
          background: #ff9f00;
          position: relative;
          width: 100%;
        }

        #container {
          display: flex;
          flex-direction: column;
          max-width: 386px;
          margin: auto;
          position: relative;
          padding: 24px;
          border-radius: 3px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        #title {
          font-size: 18px;
          font-weight: 400;
        }

        #text {
          margin: 16px 0 24px 0;
          font-size: 14px;
        }

        #actions {
          display: flex;
          flex-direction: column;
        }
      `
    ];
  }

  render() {
    const { data } = this;
    return html`
    <div id="container">
        <div id="title">Поддержать автора</div>
            <div id="text">
              Поддержите автора, если элемент оказался вам полезен. Ваши пожертвования - отличный мотиватор для поддержки существующих и реализации новых проектов автора.
            </div>
            <div id="actions">
              <a href="${data}" target="_blank" rel="noopener nofollow">
                <paper-button raised>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 401.601 401.6" style="enable-background:new 0 0 401.601 401.6;" xml:space="preserve" class=""><g><g>
                    <g>
                      <path d="M116.682,229.329c11.286,0,22.195-0.729,32.518-2.086V114.094c-10.322-1.356-21.232-2.085-32.518-2.085    c-64.441,0-116.681,23.693-116.681,52.921v11.477C0.001,205.634,52.241,229.329,116.682,229.329z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                      <path d="M116.682,288.411c11.286,0,22.195-0.729,32.518-2.084v-33.166c-10.325,1.356-21.229,2.095-32.518,2.095    c-56.25,0-103.199-18.054-114.227-42.082c-1.606,3.5-2.454,7.124-2.454,10.839v11.477    C0.001,264.718,52.241,288.411,116.682,288.411z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                      <path d="M149.199,314.823v-2.578c-10.325,1.356-21.229,2.095-32.518,2.095c-56.25,0-103.199-18.054-114.227-42.082    C0.848,275.757,0,279.381,0,283.096v11.477c0,29.229,52.24,52.922,116.681,52.922c12.887,0,25.282-0.95,36.873-2.7    c-2.873-5.877-4.355-12.075-4.355-18.496V314.823z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                      <path d="M284.92,22.379c-64.441,0-116.681,23.693-116.681,52.921v11.477c0,29.228,52.24,52.921,116.681,52.921    c64.44,0,116.681-23.693,116.681-52.921V75.3C401.601,46.072,349.36,22.379,284.92,22.379z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                      <path d="M284.92,165.626c-56.25,0-103.199-18.053-114.227-42.082c-1.606,3.499-2.454,7.123-2.454,10.839v11.477    c0,29.228,52.24,52.921,116.681,52.921c64.44,0,116.681-23.693,116.681-52.921v-11.477c0-3.716-0.848-7.34-2.454-10.839    C388.119,147.573,341.17,165.626,284.92,165.626z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                      <path d="M284.92,224.71c-56.25,0-103.199-18.054-114.227-42.082c-1.606,3.499-2.454,7.123-2.454,10.839v11.477    c0,29.229,52.24,52.922,116.681,52.922c64.44,0,116.681-23.693,116.681-52.922v-11.477c0-3.716-0.848-7.34-2.454-10.839    C388.119,206.657,341.17,224.71,284.92,224.71z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                      <path d="M284.92,286.983c-56.25,0-103.199-18.054-114.227-42.082c-1.606,3.5-2.454,7.123-2.454,10.838v11.478    c0,29.228,52.24,52.921,116.681,52.921c64.44,0,116.681-23.693,116.681-52.921v-11.478c0-3.715-0.848-7.34-2.454-10.838    C388.119,268.928,341.17,286.983,284.92,286.983z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                      <path d="M284.92,346.066c-56.25,0-103.199-18.053-114.227-42.081c-1.606,3.5-2.454,7.125-2.454,10.838V326.3    c0,29.228,52.24,52.921,116.681,52.921c64.44,0,116.681-23.693,116.681-52.921v-11.478c0-3.715-0.848-7.34-2.454-10.838    C388.119,328.012,341.17,346.066,284.92,346.066z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                    </g>
                  </svg>
                      Поддержать
                  </paper-button>
              </a>
            <div>
        </div>
    </div>
`;
  }

  static get properties() {
    return {
      data: { type: String }
    };
  }
}

customElements.define("ht-elements-item-donation", HTElementsItemDonation);
