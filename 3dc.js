// Include THREE.js and OrbitControls at the top of your file
// Add this script tag in your HTML file or the JS file if needed

(function () {
    let scene, camera, renderer, model;

    function init() {
        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        // Camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Orbit Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Lights
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);

        // Load 3D model
        const loader = new THREE.GLTFLoader();
        loader.load('https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf', function (gltf) {
            model = gltf.scene;
            scene.add(model);
            animate(); // Start animation loop once the model is loaded
        }, undefined, function (error) {
            console.error('An error happened while loading the model', error);
        });

        // Color change controls
        const colorButtons = createColorButtons();
        document.body.appendChild(colorButtons);
    }

    // Function to apply color to the model's material
    function applyColorToModel(color) {
        if (model) {
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(color); // Apply color to the model
                }
            });
        }
    }

    // Function to create color buttons
    function createColorButtons() {
        const colorContainer = document.createElement('div');
        colorContainer.style.position = 'absolute';
        colorContainer.style.top = '10px';
        colorContainer.style.left = '10px';
        colorContainer.style.display = 'flex';
        colorContainer.style.gap = '10px';

        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
        colors.forEach((color) => {
            const button = document.createElement('button');
            button.style.width = '50px';
            button.style.height = '50px';
            button.style.backgroundColor = color;
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            button.addEventListener('click', () => applyColorToModel(color));
            colorContainer.appendChild(button);
        });

        return colorContainer;
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    // Load THREE.js and other dependencies before calling init
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
        const gltfLoaderScript = document.createElement('script');
        gltfLoaderScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
        document.head.appendChild(gltfLoaderScript);

        const orbitControlsScript = document.createElement('script');
        orbitControlsScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
        document.head.appendChild(orbitControlsScript);

        // Ensure all scripts are loaded before calling init
        gltfLoaderScript.onload = () => {
            orbitControlsScript.onload = init; // Call init once both GLTFLoader and OrbitControls are loaded
        };
    };
    document.head.appendChild(script);
})();
