class BaseElement {
  constructor() {
    this.element = null; // jQuery object
  }
  appendToElement(el) {
    this.createElement();
    el.append(this.element);
  }
  createElement() {
    let s = this.getElementString();
    this.element = this.createElementFromHTML(s);
  }
  getElementString() {
    throw "Please override getElementString() in BaseElement";
  }
  createElementFromHTML(htmlString) {
    let div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
}
module.exports = { BaseElement };
