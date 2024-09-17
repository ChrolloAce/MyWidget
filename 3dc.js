(function () {
    // URLs for Three.js v128 and OrbitControls.js v128 from jsDelivr
    const THREE_JS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
    const ORBIT_CONTROLS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';

    // CSS styles injected dynamically
    const styles = `
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        .container {
            display: flex;
            width: 100%;
            height: 100%;
        }

        .editor {
            width: 20%;
            background-color: #f4f4f4;
            padding: 20px;
            box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
        }

        .editor h2 {
            font-size: 18px;
            margin-bottom: 20px;
            color: #333;
        }

        .editor .button-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .editor .button-container button {
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s ease-in-out;
        }

        .editor .button-container button:hover {
            transform: scale(1.1);
        }

        .scene {
            flex-grow: 1;
            background-color: #ffffff;
        }

        canvas {
            display: block;
            width: 100%;
            height: 100%;
        }
    `;

    /**
     * Injects the CSS styles into the document
     */
    function injectStyles() {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

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

        // Create the container elements for layout
        const container = document.createElement('div');
        container.classList.add('container');
        document.body.appendChild(container);

        const editor = document.createElement('div');
        editor.classList.add('editor');
        editor.innerHTML = '<h2>Color Editor</h2><div class="button-container"></div>';
        container.appendChild(editor);

        const sceneContainer = document.createElement('div');
        sceneContainer.classList.add('scene');
        container.appendChild(sceneContainer);

        // Create the scene with a white background
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); // White background

        // Set up the camera
        camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth * 0.8 / window.innerHeight, // Aspect ratio (adjusted for layout)
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        camera.position.set(0, 2, 5); // Adjust camera position as needed

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth * 0.8, window.innerHeight); // Renderer only takes 80% of width for the 3D scene
        sceneContainer.appendChild(renderer.domElement); // Add renderer to the DOM

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
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#000000'];
            const buttonContainer = document.querySelector('.button-container');

            // Create a button for each color
            colors.forEach((color) => {
                const button = document.createElement('button');
                button.style.backgroundColor = color;
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
            camera.aspect = (window.innerWidth * 0.8) / window.innerHeight;
            camera.updateProjectionMatrix(); // Update the camera's projection matrix
            renderer.setSize(window.innerWidth * 0.8, window.innerHeight); // Update renderer size
        }
    }

    /**
     * Ensures that Three.js and OrbitControls.js are loaded before initializing the scene.
     */
    function loadAndInitialize() {
        injectStyles(); // Inject CSS styles dynamically
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
