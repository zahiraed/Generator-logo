class LogoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create container for the logo
        const container = document.createElement('div');
        container.setAttribute('id', 'logoContainer');

        // Create canvas for rendering text/logo
        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'logoCanvas');
        container.appendChild(canvas);

        this.shadowRoot.append(container);
        this.logoText = 'zahira';
        this.fontSize = 85;
        this.fontFamily = "'Roboto', sans-serif";
        this.color = '#0313ff';
        this.primaryShadowColor = '#0313ff';
        this.primaryShadowIntensity = 0.2;

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.initCanvas();
    }

    static get observedAttributes() {
        return ['text', 'font-size', 'font-family', 'color', 'primary-shadow-color', 'primary-shadow-intensity'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'text':
                this.logoText = newValue;
                break;
            case 'font-size':
                this.fontSize = newValue;
                break;
            case 'font-family':
                this.fontFamily = newValue;
                break;
            case 'color':
                this.color = newValue;
                break;
            case 'primary-shadow-color':
                this.primaryShadowColor = newValue;
                break;
            case 'primary-shadow-intensity':
                this.primaryShadowIntensity = parseFloat(newValue);
                break;
        }
        this.renderLogo();
    }

    initCanvas() {
        this.canvas.width = 512;
        this.canvas.height = 512;
        this.renderLogo();
    }

    renderLogo() {
        const ctx = this.context;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Apply text shadow
        ctx.shadowColor = this.primaryShadowColor;
        ctx.shadowBlur = this.primaryShadowIntensity * 50;

        // Draw text
        ctx.fillText(this.logoText, this.canvas.width / 2, this.canvas.height / 2);
    }

    addShape() {
        // Add a geometric shape (example: circle)
        const ctx = this.context;
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
        ctx.fill();
    }

    addImage(imagePath) {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            this.context.drawImage(img, 150, 150, 200, 200);
        };
    }
}

customElements.define('logo-generator', LogoGenerator);
