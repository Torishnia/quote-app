const template = `
<style>
@import url('quote-fetcher.css');
</style>
<h1 data-character>Author</h1>
<blockquote data-quote>The quote</blockquote>
`

class QuoteFetcher extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
    }

    connectedCallback () {
        this.refresh();

        document.body.addEventListener('click', () => {
            this.refresh();
        })
    }

    refresh () {
        fetch('https://animechan.xyz/api/random')
        .then(res => res.json())
        .then(json => {
            Object.assign(this.dataset, json);
        });
    }

    static get observedAttributes () {
        return [
            'data-character',
            'data-quote'
        ]
    }

    attributeChangedCallback (attr, prev, value) {
        this[attr](value, this.shadowRoot.querySelector(`[${attr}]`));
    }

    ['data-character'] (value, el) { el.textContent = value; }
    ['data-quote'] (value, el) { el.textContent = value; }
}

customElements.define('quote-fetcher', QuoteFetcher);