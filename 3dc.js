(function () {
    // Array of Three.js CDN URLs (updated to a currently available version)
    const THREE_JS_URLS = [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r153/three.min.js', // Updated version
        'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.min.js',
        'https://unpkg.com/three@0.153.0/build/three.min.js'
    ];

    // Array of OrbitControls.js CDN URLs corresponding to Three.js version
    const ORBIT_CONTROLS_URLS = [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r153/examples/js/controls/OrbitControls.js', // Updated version
        'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/js/controls/OrbitControls.js',
        'https://unpkg.com/three@0.153.0/examples/js/controls/OrbitControls.js'
    ];

    /**
     * Function to dynamically load a script with fallback URLs.
     * @param {Array} urls - Array of script URLs to try loading in order.
     * @param {number} index - Current index in the URLs array.
     * @returns {Promise} - Resolves when a script is successfully loaded.
     */
    function loadScriptsWithFallback(urls, index = 0) {
        return new Promise((resolve, reject) => {
            if (index >= urls.length) {
                reject(new Error('All attempts to load the script failed.'));
                return;
            }

            const script = document.createElement('script');
            script.src = urls[index];
            script.onload = () => {
                console.log(`Successfully loaded script from: ${urls[index]}`);
                resolve();
            };
            script.onerror = () => {
                console.warn(`Failed to load script from: ${urls[index]}`);
                // Attempt to load the next URL in the array
                loadScriptsWithFallback(urls, index + 1).then(resolve).catch(reject);
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Initializes the Three.js scene with a rotating cube and color buttons.
     */
    function init() {
        let scene, camera, renderer, cube, controls;

        // Create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Black background

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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
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
         * Animation loop to render the scene and rotate the cube.
         */
        function animate() {
            requestAnimationFrame(animate);

            // Optional: Rotate the cube automatically
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            controls.update(); // Update controls (required if enableDamping is true)

            renderer.render(scene, camera); // Render the scene
        }

        /**
         * Function to create interactive color buttons.
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
            buttonContainer.style.zIndex = '1';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.flexWrap = 'wrap';
            buttonContainer.style.gap = '10px';
            document.body.appendChild(buttonContainer);

            // Create a button for each color
            colors.forEach((color) => {
                const button = document.createElement('button');
                button.style.backgroundColor = color;
                button.style.width = '40px';
                button.style.height = '40px';
                button.style.border = 'none';
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

    // Load Three.js from multiple CDNs with fallback
    loadScriptsWithFallback(THREE_JS_URLS)
        .then(() => {
            // After Three.js is loaded, load OrbitControls.js
            return loadScriptsWithFallback(ORBIT_CONTROLS_URLS);
        })
        .then(() => {
            // Initialize the scene after both Three.js and OrbitControls.js are loaded
            init();
        })
        .catch((error) => {
            console.error(error.message);
            alert('Failed to load necessary scripts. Please check your internet connection or try again later.');
        });
})();
