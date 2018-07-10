"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@polymer/paper-icon-button";
import "@01ht/ht-image";

class HTElementsItemPreview extends LitElement {
  _render({ itemData, active }) {
    return html`
    <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }
    
        a {
            display: block;
            color: inherit;
            text-decoration: none;
        }

        ht-image { 
            width:100%;
        }
        
        paper-icon-button { 
            width:48px;
            height: 48px;
            border-radius:50%;
            margin:0 4px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        paper-icon-button:hover {
            //box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
    
        #container {
            display: flex;
            flex-direction:column;
        }

        #media {
            padding-bottom: 56.25%;
            position:relative;
        }

        #media > * {
            width:100%;
            display:none;
            position:absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
        }

        #media > [active] {
            display:flex;
        }

        #actions {
            display: flex;
            flex-wrap: wrap;
            justify-content:center;
            margin-top:-24px;
        }

        #demo-button {
            background: var(--accent-color);
            color:#fff;
            padding:12px;
        }

        #youtube-button {
            padding:0px;
        }

        #gif-button { 
            padding:6px;
            color:#fff;
            background: #00b0ff;
        }

        #image-button {
            background:#607d8b;
            color:#fff;
            padding:10px;
        }

        #github-button {
            background: #24292e;
            padding:12px;
            --iron-icon: {
                margin-top:1px;
               color: #fff;
            }
        }

        [hidden] {
            display:none;
        }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-item-preview">
        <svg>
            <defs>
                <g id="remove-red-eye">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                </g>
                <g id="gif">
                    <path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path>
                </g>
                <g id="youtube" viewBox="0 0 473.931 473.931">
                    <circle style="fill:#D42428;" cx="236.966" cy="236.966" r="236.966"/>
                    <path style="fill:#D42428;" d="M404.518,69.38c92.541,92.549,92.549,242.593,0,335.142c-92.541,92.541-242.593,92.545-335.142,0
                        L404.518,69.38z" />
                    <path style="fill:#D42428;" d="M469.168,284.426L351.886,167.148l-138.322,15.749l-83.669,129.532l156.342,156.338
                        C378.157,449.322,450.422,376.612,469.168,284.426z" />
                    <path style="fill:#FFFFFF;" d="M360.971,191.238c0-19.865-16.093-35.966-35.947-35.966H156.372c-19.85,0-35.94,16.105-35.94,35.966
                        v96.444c0,19.865,16.093,35.966,35.94,35.966h168.649c19.858,0,35.947-16.105,35.947-35.966v-96.444H360.971z M216.64,280.146
                        v-90.584l68.695,45.294L216.64,280.146z" />
                </g>
                <g id="image">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
                </g>
                <g id="github" viewBox="0 0 478.613 478.613">
                <path d="M427.501,200.695c1.776-11.238,2.884-23.56,3.163-37.377c-0.107-59.246-28.468-80.21-33.925-90.038 c8.037-44.89-1.331-65.309-5.688-72.299c-16.07-5.704-55.91,14.722-77.678,29.101c-35.491-10.389-110.494-9.375-138.621,2.689
                                C122.856-4.389,95.408,1.277,95.408,1.277s-17.745,31.82-4.691,78.371c-17.075,21.759-29.802,37.143-29.802,77.949 c0,9.773,0.607,19.008,1.637,27.893c14.705,77.318,75.97,110.674,136.15,116.426c-9.056,6.881-19.928,19.903-21.432,34.992
                                c-11.379,7.357-34.268,9.789-52.067,4.193c-24.939-7.88-34.486-57.266-71.833-50.221c-8.081,1.512-6.475,6.842,0.523,11.386 c11.378,7.38,22.094,16.554,30.354,36.185c6.344,15.072,19.687,41.982,61.873,41.982c16.747,0,28.477-1.979,28.477-1.979
                                s0.319,38.406,0.319,53.385c0,17.238-23.264,22.078-23.264,30.348c0,3.289,7.7,3.601,13.888,3.601 c12.229,0,37.673-10.186,37.673-28.103c0-14.237,0.227-62.081,0.227-70.46c0-18.307,9.811-24.136,9.811-24.136
                                s1.201,97.727-2.361,110.829c-4.177,15.408-11.744,13.219-11.744,20.076c0,10.233,30.589,2.502,40.735-19.897 c7.849-17.495,4.334-113.331,4.334-113.331l8.183-0.178c0,0,0.094,43.892-0.188,63.944c-0.295,20.769-2.438,47.025,9.898,59.417
                                c8.097,8.15,32.903,22.451,32.903,9.382c0-7.574-17.371-13.833-17.371-34.353V344.45c10.553,0,12.734,31.072,12.734,31.072 l3.804,57.727c0,0-2.526,21.065,22.756,29.856c8.925,3.126,28.018,3.976,28.913-1.271c0.897-5.26-22.99-13.038-23.217-29.342
                                c-0.123-9.93,0.445-15.742,0.445-58.934c0-43.168-5.799-59.137-26.007-71.863C355.669,295.681,416.536,269.51,427.501,200.695z"
                    fill="#FFFFFF" />
                </g>
            </defs>
        </svg>
    </iron-iconset-svg>
    <div id="container">
        <section id="media">
            <div id="image" active?=${active === "image"}>
                <ht-image placeholder$=${itemData.thumb_w60} image$=${
      itemData.thumb_w960
    } size="16x9"></ht-image>
            </div>
            <div id="youtube" active?=${active === "youtube"}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${
                  itemData.youtubeURL
                }" frameborder="0" allow="autoplay; encrypted-media"
                allowfullscreen></iframe>
            </div>
            <div id="gif" active?=${active === "gif"}>
                <ht-image image$=${itemData.gifURL} size="16x9"></ht-image>
            </div>
        </section>
        <section id="actions">
            <a href=${
              itemData.demoURL
            } target="_blank" hidden?=${itemData.demoURL === ""}>
                <paper-icon-button id="demo-button" icon="ht-elements-item-preview:remove-red-eye"></paper-icon-button>
            </a>
            <paper-icon-button id="youtube-button" icon="ht-elements-item-preview:youtube" on-click=${e => {
              this._changeActive(e);
            }} hidden?=${itemData.videoId === ""}></paper-icon-button>
            <paper-icon-button id="gif-button" icon="ht-elements-item-preview:gif" on-click=${e => {
              this._changeActive(e);
            }} hidden?=${itemData.gifURL === ""}></paper-icon-button>
            <paper-icon-button id="image-button" icon="ht-elements-item-preview:image" on-click=${e => {
              this._changeActive(e);
            }}></paper-icon-button>
            <a href="https://github.com/${
              itemData.repositoryURL
            }" target="_blank">
            <paper-icon-button id="github-button" icon="ht-elements-item-preview:github"></paper-icon-button>
            </a>
        </section>
    </div>
`;
  }

  static get is() {
    return "ht-elements-item-preview";
  }

  static get properties() {
    return {
      itemData: Object,
      active: String
    };
  }

  constructor() {
    super();
    this.itemData = {};
    this.active = "image";
  }

  set data(data) {
    this.active = "image";
    this.itemData = data;
  }

  _changeActive(e) {
    this.active = e.target.id.replace("-button", "");
  }
}

customElements.define(HTElementsItemPreview.is, HTElementsItemPreview);
