(function () {
    // Dynamically load Three.js library
    const loadThreeJS = function (callback) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    };

    // Load the GLTFLoader and OrbitControls after Three.js is loaded
    const loadAdditionalLibraries = function (callback) {
        const gltfLoaderScript = document.createElement('script');
        gltfLoaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/loaders/GLTFLoader.js';

        const orbitControlsScript = document.createElement('script');
        orbitControlsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/controls/OrbitControls.js';

        let scriptsLoaded = 0;

        function onLoad() {
            scriptsLoaded++;
            if (scriptsLoaded === 2) {
                callback();
            }
        }

        gltfLoaderScript.onload = onLoad;
        orbitControlsScript.onload = onLoad;

        document.head.appendChild(gltfLoaderScript);
        document.head.appendChild(orbitControlsScript);
    };

    // Initialize the Three.js scene, camera, and renderer
    function init() {
        let scene, camera, renderer, model, controls;

        // Set up the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0); // Light grey background

        // Set up the camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 5); // Positioned the camera

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        // Load the 3D model
        const loader = new THREE.GLTFLoader();
        loader.load('https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf', function (gltf) {
            model = gltf.scene;
            model.position.set(0, 0, 0);
            scene.add(model);
            animate(); // Start rendering loop
        }, undefined, function (error) {
            console.error('An error occurred loading the model:', error);
        });

        // Set up OrbitControls for the camera
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.update();

        // Handle window resizing
        window.addEventListener('resize', onWindowResize);

        // Update camera and renderer when window is resized
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Function to apply color to the model
        function applyColorToCountertop(color) {
            if (model) {
                model.traverse(function (child) {
                    if (child.isMesh) {
                        child.material.color.set(color);
                        child.material.needsUpdate = true; // Ensure the material updates
                    }
                });
            }
        }

        // Create color selection buttons
        function createColorButtons() {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000']; // Color choices
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.top = '10px';
            container.style.left = '10px';
            document.body.appendChild(container);

            colors.forEach(color => {
                const button = document.createElement('button');
                button.style.backgroundColor = color;
                button.style.width = '50px';
                button.style.height = '50px';
                button.style.margin = '5px';
                button.addEventListener('click', () => applyColorToCountertop(color));
                container.appendChild(button);
            });
        }

        // Animate and render the scene
        function animate() {
            requestAnimationFrame(animate);
            if (model) {
                model.rotation.y += 0.01; // Slowly rotate the model
            }
            controls.update();
            renderer.render(scene, camera);
        }

        // Start the color buttons and 3D scene
        createColorButtons();
    }

    // Load Three.js, then additional libraries, then run init
    loadThreeJS(function () {
        loadAdditionalLibraries(init);
    });
})();
