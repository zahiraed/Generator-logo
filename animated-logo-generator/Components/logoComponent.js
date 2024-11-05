class LogoGenerator extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
     

      // Création de la structure HTML du logo
      const container = document.createElement('div');
      container.setAttribute('id', 'logoContainer');

      // Ajout d'un canvas pour l'animation Three.js
      const canvas = document.createElement('canvas');
      canvas.setAttribute('id', 'logoCanvas');
      container.appendChild(canvas);

      this.shadowRoot.append(container);

      // Initialisation Three.js
      this.initThree(canvas);
      this.addListeners();
  }
  connectedCallback() {
        
    
    this.shadowRoot.getElementById("downloadButton").onclick = () =>
      this.downloadLogo();
    this.shadowRoot.getElementById("generateCodeButton").onclick = () =>
      this.generateCode();
  }
  downloadLogo() {
    const containerElement = this.shadowRoot.querySelector("#logoContainer");
    html2canvas(containerElement, { useCORS: true }).then(canvas => {
      const link = document.createElement("a");
      link.download = "logo.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  generateCode() {
    const text = this.getAttribute("text") || "Logo";
    const color = this.getAttribute("color") || "black";
    const font = this.getAttribute("font") || "Arial";
    const animation = this.getAttribute("animation") || "";
    const size = this.getAttribute("size") || "100";
    const background = this.getAttribute("background") || "";
    const width = this.getAttribute("width") || "200";
    const height = this.getAttribute("height") || "200";

    const code = `
<logo-generator
  text="${text}"
  color="${color}"
  font="${font}"
  animation="${animation}"
  size="${size}"
  background="${background}"
  width="${width}"
  height="${height}"
></logo-generator>`;

    alert(code); // Display the code in an alert for simplicity
  }

  addListeners() {
      const textInput = document.querySelector("#textInput");
      const colorPicker = document.querySelector("#colorPicker");
      const addShapeButton = document.querySelector("#addShape");
      const addImageButton = document.querySelector("#addImage");

      textInput.addEventListener("input", (e) => {
          this.updateText(e.target.value);
      });

      colorPicker.addEventListener("input", (e) => {
          this.updateColor(e.target.value);
      });

      addShapeButton.addEventListener("click", () => {
          this.addShape();
      });

      addImageButton.addEventListener("click", () => {
          this.addImage();
      });
  }

  initThree(canvas) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const logo = new THREE.Mesh(geometry, material);
      scene.add(logo);
      camera.position.z = 5;

      // Animations avec Tween.js
      let tweenRotation, tweenScale;

      function createTweens() {
          tweenRotation = new TWEEN.Tween(logo.rotation)
              .to({ x: Math.PI * 2, y: Math.PI * 2 }, 4000)
              .repeat(Infinity)
              .easing(TWEEN.Easing.Quadratic.InOut);

          tweenScale = new TWEEN.Tween(logo.scale)
              .to({ x: 2, y: 2, z: 2 }, 2000)
              .yoyo(true)
              .repeat(Infinity)
              .easing(TWEEN.Easing.Elastic.InOut);
      }

      createTweens();

      // Fonction d'animation
      function animate() {
          requestAnimationFrame(animate);
          TWEEN.update();
          renderer.render(scene, camera);
      }
      animate();
  }

  updateText(text) {
      const ctx = this.shadowRoot.querySelector('#logoCanvas').getContext('2d');
      ctx.clearRect(0, 0, 512, 512);
      ctx.font = "40px Lobster";
      ctx.fillText(text, 50, 200);
  }

  updateColor(color) {
      const material = this.logo.material;
      material.color.set(color);
  }

  addShape() {
      // Ajouter une forme géométrique
      const shape = document.createElement('div');
      shape.className = 'circle';
      shape.style.width = '100px';
      shape.style.height = '100px';
      this.shadowRoot.appendChild(shape);
  }

  addImage() {
      // Ajouter une image
      const image = new Image();
      image.src = 'image.png';
      image.className = 'added-image';
      image.style.width = '100px';
      image.style.height = '100px';
      this.shadowRoot.appendChild(image);
  }
}

customElements.define('logo-generator', LogoGenerator);
