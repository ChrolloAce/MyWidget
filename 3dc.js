(function () {
  let scene, camera, renderer, model, colorButtons;

  // Initialize scene, camera, and renderer
  function init() {
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);

    // Load 3D model
    const loader = new THREE.GLTFLoader();
    loader.load(
      'https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf',
      function (gltf) {
        model = gltf.scene;
        scene.add(model);

        // Adjust model scale and position
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -1, 0);

        animate(); // Start the animation loop
      },
      undefined,
      function (error) {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Create color buttons
    createColorButtons();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
  }

  // Function to create color picker buttons
  function createColorButtons() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000'];
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.top = '20px';
    buttonContainer.style.left = '20px';
    document.body.appendChild(buttonContainer);

    colors.forEach((color) => {
      const button = document.createElement('button');
      button.style.backgroundColor = color;
      button.style.width = '40px';
      button.style.height = '40px';
      button.style.marginRight = '10px';
      button.style.borderRadius = '50%';
      button.style.cursor = 'pointer';
      button.addEventListener('click', () => {
        changeModelColor(color);
      });
      buttonContainer.appendChild(button);
    });
  }

  // Function to change the model color
  function changeModelColor(hexColor) {
    if (model) {
      model.traverse(function (child) {
        if (child.isMesh) {
          child.material.color.setHex(hexColor);
        }
      });
    }
  }

  // Function to handle window resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate the model for better viewing
    if (model) {
      model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  }

  // Load necessary scripts dynamically
  function loadScripts(callback) {
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/loaders/GLTFLoader.js';
      script2.onload = callback;
      document.body.appendChild(script2);
    };
    document.body.appendChild(script1);
  }

  // Start the app
  loadScripts(init);
})();
