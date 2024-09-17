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
            // Check if the script is already loaded
            if (document.querySelector(`script[src="${url}"]`)) {
                console.log(`Script already loaded: ${url}`);
                resolve();
                return;
            }

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
     * Initializes the Three.js scene with a cube and color buttons.
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
        camera.position.set(0, 2, 5); // Adjust camera position as needed

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement); // Add renderer to the DOM

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // Create a cube (square in 3D)
        const geometry = new THREE.BoxGeometry(1, 1, 1); // A 1x1x1 cube
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Default green color
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Initialize OrbitControls for manual rotation
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Enable smooth damping
        controls.dampingFactor = 0.05;
        controls.enablePan = false; // Disable panning
        controls.minDistance = 2; // Minimum zoom distance
        controls.maxDistance = 10; // Maximum zoom distance

        // Create color buttons
        createColorButtons();

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
         */
        function createColorButtons() {
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
                    changeCubeColor(color);
                });
                buttonContainer.appendChild(button);
            });
        }

        /**
         * Function to change the color of the cube.
         * @param {string} color - The hexadecimal color code to apply.
         */
        function changeCubeColor(color) {
            if (!cube) {
                console.warn('Cube not loaded yet.');
                return;
            }
            cube.material.color.set(color);
            cube.material.needsUpdate = true;
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
     * Ensures that Three.js and OrbitControls.js are loaded before initializing the scene.
     */
    function loadAndInitialize() {
        loadScript(THREE_JS_URL)
            .then(() => loadScript(ORBIT_CONTROLS_URL))
            .then(() => {
                // Initialize the scene after all scripts are loaded
                init();
            })
            .catch((error) => {
                console.error(error.message);
                alert('Failed to load necessary scripts. Please check your internet connection or try again later.');
            });
    }

    // Execute the load and initialize process
    loadAndInitialize();
})();
