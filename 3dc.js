(function () {
    // URLs for Three.js v128 and OrbitControls.js v128 from jsDelivr
    const THREE_JS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
    const ORBIT_CONTROLS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';

    /**
     * Dynamically loads a script.
     * @param {string} url - The URL of the script to load.
     * @returns {Promise} - Resolves when the script is loaded successfully.
     */
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = false; // Ensure scripts are executed in order
            script.onload = () => {
                console.log(`Successfully loaded script: ${url}`);
                resolve();
            };
            script.onerror = () => {
                console.error(`Failed to load script: ${url}`);
                reject(new Error(`Failed to load script: ${url}`));
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Initializes the Three.js scene with a rotating cube and color buttons.
     */
    function init() {
        let scene, camera, renderer, cube, controls;

        // Create the scene with a white background
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); // White background

        // Set up the camera
        camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        camera.position.z = 5;

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement); // Add renderer to the DOM

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Create a cube geometry and material
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Initial color: green
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube); // Add cube to the scene

        // Initialize OrbitControls for manual rotation
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Enable smooth damping
        controls.dampingFactor = 0.05;
        controls.enablePan = false; // Disable panning
        controls.minDistance = 2; // Minimum zoom distance
        controls.maxDistance = 10; // Maximum zoom distance

        // Create color buttons
        createColorButtons(cube);

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);

        // Start the animation loop
        animate();

        /**
         * Animation loop to render the scene and update controls.
         */
        function animate() {
            requestAnimationFrame(animate);

            controls.update(); // Update controls (required if enableDamping is true)

            renderer.render(scene, camera); // Render the scene
        }

        /**
         * Function to create interactive color buttons arranged side by side.
         * @param {THREE.Mesh} cube - The cube mesh to change colors.
         */
        function createColorButtons(cube) {
            // Define desired colors
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#000000'];

            // Create a container for the buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.style.position = 'absolute';
            buttonContainer.style.top = '20px';
            buttonContainer.style.left = '20px';
            buttonContainer.style.zIndex = '10';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.flexDirection = 'row';
            buttonContainer.style.gap = '10px';
            document.body.appendChild(buttonContainer);

            // Create a button for each color
            colors.forEach((color) => {
                const button = document.createElement('button');
                button.style.backgroundColor = color;
                button.style.width = '40px';
                button.style.height = '40px';
                button.style.border = '2px solid #000';
                button.style.borderRadius = '50%';
                button.style.cursor = 'pointer';
                button.title = `Change color to ${color}`;
                button.addEventListener('click', () => {
                    cube.material.color.set(color);
                });
                buttonContainer.appendChild(button);
            });
        }

        /**
         * Function to handle window resizing.
         */
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix(); // Update the camera's projection matrix
            renderer.setSize(window.innerWidth, window.innerHeight); // Update renderer size
        }
    }

    /**
     * Ensures that Three.js is loaded before initializing the scene.
     * Also ensures that OrbitControls.js is loaded after Three.js.
     */
    function loadAndInitialize() {
        if (typeof THREE === 'undefined') {
            // Load Three.js first
            loadScript(THREE_JS_URL)
                .then(() => {
                    // After Three.js is loaded, load OrbitControls.js
                    return loadScript(ORBIT_CONTROLS_URL);
                })
                .then(() => {
                    // Initialize the scene after both scripts are loaded
                    init();
                })
                .catch((error) => {
                    console.error(error.message);
                    alert('Failed to load necessary scripts. Please check your internet connection or try again later.');
                });
        } else {
            // THREE is already loaded
            // Check if OrbitControls is defined
            if (typeof THREE.OrbitControls === 'undefined') {
                // Load OrbitControls.js
                loadScript(ORBIT_CONTROLS_URL)
                    .then(() => {
                        // Initialize the scene after OrbitControls.js is loaded
                        init();
                    })
                    .catch((error) => {
                        console.error(error.message);
                        alert('Failed to load OrbitControls.js. Please check your internet connection or try again later.');
                    });
            } else {
                // Both THREE and OrbitControls are already loaded
                init();
            }
        }
    }

    // Execute the load and initialize process
    loadAndInitialize();
})();
