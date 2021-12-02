/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ref, createRef} from 'lit/directives/ref.js';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('cdtr-iframe-input')
export class MyElement extends LitElement {
  input: HTMLInputElement;
  styleTag: HTMLStyleElement;
  inputEvent: UIEvent;
  changeEvent: UIEvent;
  static override styles = css`
    iframe {
      overflow: hidden;
      border: none;
    }
  `;
  constructor() {
    super();
    this.value = '';
    this.placeholder = '';
    this.inputEvent = new UIEvent('input', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    this.changeEvent = new UIEvent('change', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    this.styleTag = document.createElement('style');
    this.input = document.createElement('input');
    this.input.addEventListener('input', (event: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value: string = (event.target as any)?.value;
      this.value = value;
      this.dispatchEvent(this.inputEvent);
      this.dispatchEvent(this.changeEvent);
    });
  }
  inputRef = createRef<HTMLInputElement>();

  callback(iframeElement: HTMLIFrameElement) {
    if (iframeElement) {
      iframeElement.addEventListener(
        'load',
        () => {
          this.input.setAttribute('style', this.inputStyle);
          this.input.placeholder = this.placeholder;
          this.input.value = this.value;
          this.styleTag.innerHTML = styles;
          iframeElement.contentWindow?.document.body.appendChild(this.styleTag);
          iframeElement.contentWindow?.document.body.appendChild(this.input);
        },
        {once: true}
      );
    }
  }
  @property({reflect: true})
  value = '';
  @property({reflect: true})
  placeholder = '';
  @property({reflect: true})
  inputStyle = '';
  override render() {
    this.input.value = typeof this.value === 'string' ? this.value : '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const asAny: any = this.callback;
    return html`<iframe ${ref(asAny)}></iframe> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cdtr-iframe-input': MyElement;
  }
}
const styles = `

input {
  display: inline-block;
  width: 100%;
  padding: 0.105rem 0.45rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  border-color:#9EADBD;
  outline:#9EADBD;
  box-sizing: border-box;
  }
  input:hover {
  box-shadow: 0 0 0 0.15rem rgb(13 110 253 / 10%);
  }
  input::placeholder {
  font-family: Arial, Helvetica, sans-serif;
  }
  input:focus {
  border-color: #0088ff;
  box-shadow: 0 0 0 0.15rem rgb(13 110 253 / 25%);
  }
  input[type="number"] {
  padding-right: 0px;
  padding-left: 4px;
  }

  input[type="number"] {
  -moz-appearance: textfield;
  }
`;
