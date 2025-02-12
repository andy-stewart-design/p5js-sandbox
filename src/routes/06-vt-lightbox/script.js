class LightBoxImage extends HTMLElement {
  get target() {
    const attr = this.getAttribute("target-id");
    return document.getElementById(attr);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.setupToggle();
    this.toggle = this.shadowRoot.querySelector("button");
    this.image = this.querySelector("img");
    this.setContainerAspectRatio();
    this.toggle.addEventListener("click", this);
    this.target.addEventListener("click", this);
    this.target.addEventListener("cancel", this);
  }

  setupToggle() {
    return `
        <style>
          button {
            all: unset;
            outline: revert;
          }
        </style>
        <button aria-label="Open lightbox">
          <slot></slot>
        </button>
      `;
  }

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  onclick(e) {
    if (e.currentTarget === this.toggle) {
      this.moveImage(() => this.moveImageToTarget());
    }

    if (e.currentTarget === this.target) {
      this.targetCallback(e);
    }
  }

  // Handle "escape" key dialog event
  oncancel(e) {
    this.targetCallback(e);
  }

  targetCallback(e) {
    if (this.target.contains(this.image)) {
      e.preventDefault();
      this.moveImage(() => this.moveImageBack());
    }
  }

  moveImage(fn) {
    if (!document.startViewTransition) {
      fn();
    } else {
      this.handleViewTransition(fn);
    }
  }

  async handleViewTransition(fn) {
    this.image.style.viewTransitionName = "active-lightbox-image";

    const transition = document.startViewTransition(() => fn());

    try {
      await transition.finished;
    } finally {
      this.image.style.removeProperty("view-transition-name");
    }
  }

  moveImageToTarget() {
    this.target.append(this.image);
    this.target.showModal();
  }

  moveImageBack(e) {
    this.append(this.image);
    this.target.close();
  }

  setContainerAspectRatio() {
    const { width, height } = this.image;
    this.style.aspectRatio = `${width} / ${height}`;
  }
}

customElements.define("lightbox-image", LightBoxImage);
