(function () {
    // URLs for Three.js, OrbitControls, and FBXLoader
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

    const THREE_JS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
    const ORBIT_CONTROLS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
    const FBX_LOADER_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FBXLoader.js';
    const FULL_URL = CORS_PROXY + FBX_MODEL_URL;


    // URL for the FBX model file
const FBX_MODEL_URL = 'https://github.com/ChrolloAce/MyWidget/raw/main/countermain.fbx';

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
     * Initializes the Three.js scene with an FBX model and color customization for its parts.
     */
    function init() {
        let scene, camera, renderer, controls;
        let countertop, cabinets, fbxModel;

        // Create the container elements for layout
        const container = document.createElement('div');
        container.classList.add('container');
        document.body.appendChild(container);

        const editor = document.createElement('div');
        editor.classList.add('editor');
        editor.innerHTML = `
            <h2>Countertop Colors</h2>
            <div class="top-container"></div>
            <h2>Cabinet Colors</h2>
            <div class="cabinet-container"></div>
        `;
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
        camera.position.set(0, 3, 5); // Adjust camera position as needed

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

        // Initialize OrbitControls for manual rotation
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Enable smooth damping
        controls.dampingFactor = 0.05;
        controls.enablePan = false; // Disable panning
        controls.minDistance = 2; // Minimum zoom distance
        controls.maxDistance = 10; // Maximum zoom distance

        // Load the FBX model
            loadFBXModel(FULL_URL)
            .then(loadedModel => {
                fbxModel = loadedModel;

                // Traverse the FBX model and identify specific parts (countertop, cabinets)
                fbxModel.traverse(function (child) {
                    if (child.isMesh) {
                        if (child.name.includes("Countertop")) {
                            countertop = child; // Assuming the part name contains "Countertop"
                        } else if (child.name.includes("Cabinet")) {
                            cabinets = child; // Assuming the part name contains "Cabinet"
                        }
                    }
                });

                scene.add(fbxModel); // Add the entire FBX model to the scene
            })
            .catch(error => {
                console.error('Error loading FBX model:', error);
            });

        // Create color buttons for both the countertop and cabinets
        createColorButtons('top-container', changeTopColor);
        createColorButtons('cabinet-container', changeCabinetColor);

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
         * Function to load the FBX model.
         * @param {string} url - The URL of the FBX model to load.
         * @returns {Promise} - Resolves with the loaded model.
         */
        function loadFBXModel(url) {
            return new Promise((resolve, reject) => {
                const loader = new THREE.FBXLoader();
                loader.load(
                    url,
                    (object) => {
                        console.log('FBX model loaded successfully.');
                        object.scale.set(0.01, 0.01, 0.01); // Scale down if necessary
                        resolve(object);
                    },
                    (xhr) => {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    (error) => {
                        console.error('An error happened while loading the FBX model:', error);
                        reject(error);
                    }
                );
            });
        }

        /**
         * Function to create interactive color buttons for either the countertop or cabinets.
         */
        function createColorButtons(containerClass, changeColorCallback) {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#000000'];
            const buttonContainer = document.querySelector(`.${containerClass}`);

            // Create a button for each color
            colors.forEach((color) => {
                const button = document.createElement('button');
                button.style.backgroundColor = color;
                button.title = `Change color to ${color}`;
                button.addEventListener('click', () => {
                    changeColorCallback(color);
                });
                buttonContainer.appendChild(button);
            });
        }

        /**
         * Function to change the color of the countertop.
         * @param {string} color - The hexadecimal color code to apply.
         */
        function changeTopColor(color) {
            if (!countertop) {
                console.warn('Countertop not loaded yet.');
                return;
            }
            countertop.material.color.set(color);
            countertop.material.needsUpdate = true;
        }

        /**
         * Function to change the color of the cabinets.
         * @param {string} color - The hexadecimal color code to apply.
         */
        function changeCabinetColor(color) {
            if (!cabinets) {
                console.warn('Cabinets not loaded yet.');
                return;
            }
            cabinets.material.color.set(color);
            cabinets.material.needsUpdate = true;
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
     * Ensures that Three.js, OrbitControls.js, and FBXLoader.js are loaded before initializing the scene.
     */
    function loadAndInitialize() {
        injectStyles(); // Inject CSS styles dynamically
        loadScript(THREE_JS_URL)
            .then(() => loadScript(ORBIT_CONTROLS_URL))
            .then(() => loadScript(FBX_LOADER_URL))
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
