(function () {
    // URLs for Three.js v128 and OrbitControls.js v128 from jsDelivr
    const THREE_JS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
    const ORBIT_CONTROLS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';

    // CSS styles injected dynamically
    const styles = `
        /* General Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            display: flex;
            height: 100vh;
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            overflow: hidden;
        }

        /* Sidebar Container */
        .sidebar {
            width: 25%;
            background-color: #ffffff;
            padding: 30px;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
            overflow-y: auto;
        }

        /* Main 3D Scene Container */
        .main {
            flex-grow: 1;
            background-color: #eaeaea;
            position: relative;
        }

        /* Headers */
        .sidebar h1, .sidebar h2 {
            color: #333333;
            margin-bottom: 20px;
        }

        .sidebar h1 {
            font-size: 28px;
        }

        .sidebar h2 {
            font-size: 20px;
            margin-top: 30px;
        }

        /* Form Elements */
        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            color: #555555;
            margin-bottom: 8px;
            font-size: 16px;
        }

        .form-group select, .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #cccccc;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        .form-group select:focus, .form-group input:focus {
            border-color: #0264D9;
            outline: none;
        }

        /* Button Styles */
        .button {
            width: 100%;
            padding: 12px;
            background-color: #0264D9;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .button:hover {
            background-color: #014a99;
        }

        /* Color Selection */
        .color-selection {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .color-square {
            width: 40px;
            height: 40px;
            border: 2px solid #dddddd;
            border-radius: 5px;
            cursor: pointer;
            position: relative;
            transition: border 0.3s ease;
        }

        .color-square.selected {
            border: 4px solid #0264D9;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .sidebar {
                width: 100%;
                height: 50vh;
                box-shadow: none;
            }

            .main {
                height: 50vh;
            }
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
     * Helper function to create DOM elements
     * @param {string} tag - The HTML tag name.
     * @param {string} className - The class name(s) for the element.
     * @param {string} textContent - The text content for the element.
     * @returns {HTMLElement} - The created DOM element.
     */
    function createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    // Shared variables for Three.js components
    let scene, camera, renderer, countertop, controls;

    /**
     * Initializes the user interface and Three.js scene
     */
    function init() {
        // Create the main container elements for layout
        const sidebar = createElement('div', 'sidebar');
        const main = createElement('div', 'main');
        document.body.appendChild(sidebar);
        document.body.appendChild(main);

        // Populate the sidebar with controls
        populateSidebar(sidebar);

        // Initialize Three.js in the main container
        initializeThreeJS(main);
    }

    /**
     * Populates the sidebar with UI controls
     * @param {HTMLElement} sidebar - The sidebar DOM element
     */
    function populateSidebar(sidebar) {
        // Header
        const header = createElement('h1', null, 'Countertop Customizer');
        sidebar.appendChild(header);

        // Base Color Selection
        const colorGroup = createElement('div', 'form-group');
        const colorLabel = createElement('label', null, 'Choose Base Color:');
        const colorSelection = createElement('div', 'color-selection');
        colorGroup.appendChild(colorLabel);
        colorGroup.appendChild(colorSelection);
        sidebar.appendChild(colorGroup);

        // Define base colors
        const baseColors = {
            'White': '#FFFFFF',
            'Black': '#000000',
            'Tornado Gray': '#4F4F4F',
            'Charcoal Gray': '#2E2E2E',
            'Toasted Almond': '#D2B48C',
            'Milk Chocolate': '#8B4513',
            'Dark Chocolate': '#5D3A1A'
        };

        // Create color squares
        for (const [name, hex] of Object.entries(baseColors)) {
            const colorDiv = createElement('div', 'color-square');
            colorDiv.style.backgroundColor = hex;
            colorDiv.title = name;
            colorDiv.dataset.color = hex; // Store hex code for later use

            colorDiv.addEventListener('click', () => {
                // Allow only one selection
                document.querySelectorAll('.color-square').forEach(div => div.classList.remove('selected'));
                colorDiv.classList.add('selected');
                updateCountertop();
            });

            colorSelection.appendChild(colorDiv);
        }

        // Select the first color by default
        const firstColor = colorSelection.querySelector('.color-square');
        if (firstColor) {
            firstColor.classList.add('selected');
        }

        // Pattern Selection
        const patternGroup = createElement('div', 'form-group');
        const patternLabel = createElement('label', null, 'Choose Pattern:');
        const patternSelect = createElement('select', null, null);
        const patterns = ['Solid', 'Marble', 'Granite', 'Quartz'];
        patterns.forEach(pattern => {
            const option = createElement('option', null, pattern);
            option.value = pattern.toLowerCase();
            patternSelect.appendChild(option);
        });
        patternGroup.appendChild(patternLabel);
        patternGroup.appendChild(patternSelect);
        sidebar.appendChild(patternGroup);

        patternSelect.addEventListener('change', () => {
            updateCountertop();
        });

        // Finish Selection
        const finishGroup = createElement('div', 'form-group');
        const finishLabel = createElement('label', null, 'Choose Finish:');
        const finishSelect = createElement('select', null, null);
        const finishes = ['Polished', 'Matte', 'Satin'];
        finishes.forEach(finish => {
            const option = createElement('option', null, finish);
            option.value = finish.toLowerCase();
            finishSelect.appendChild(option);
        });
        finishGroup.appendChild(finishLabel);
        finishGroup.appendChild(finishSelect);
        sidebar.appendChild(finishGroup);

        finishSelect.addEventListener('change', () => {
            updateCountertop();
        });
    }

    /**
     * Initializes the Three.js scene
     * @param {HTMLElement} container - The main container for the 3D scene
     */
    function initializeThreeJS(container) {
        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        // Camera
        camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 5, 10);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.minDistance = 5;
        controls.maxDistance = 20;

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        // Countertop Mesh
        countertop = null;

        /**
         * Creates or updates the countertop mesh based on user selections
         * @param {Object} options - Customization options
         * @param {THREE.Color} options.color - Base color
         * @param {string} options.pattern - Pattern type
         * @param {string} options.finish - Finish type
         */
        function createCountertop(options = {}) {
            // Remove existing countertop if any
            if (countertop) {
                scene.remove(countertop);
                countertop.geometry.dispose();
                countertop.material.dispose();
                countertop = null;
            }

            // Default Options
            const {
                color = 0x8B4513, // Milk Chocolate
                pattern = 'solid',
                finish = 'polished'
            } = options;

            // Geometry
            const geometry = new THREE.BoxGeometry(4, 0.2, 2);

            // Material based on pattern
            let materialOptions = {};
            switch (pattern) {
                case 'marble':
                    materialOptions = {
                        color: color,
                        map: generateMarbleTexture()
                    };
                    break;
                case 'granite':
                    materialOptions = {
                        color: color,
                        map: generateGraniteTexture()
                    };
                    break;
                case 'quartz':
                    materialOptions = {
                        color: color,
                        map: generateQuartzTexture()
                    };
                    break;
                default:
                    materialOptions = {
                        color: color
                    };
            }

            // Finish based on selection
            if (finish === 'polished') {
                materialOptions.shininess = 100;
            } else if (finish === 'matte') {
                materialOptions.shininess = 10;
            } else if (finish === 'satin') {
                materialOptions.shininess = 50;
            }

            const material = new THREE.MeshStandardMaterial(materialOptions);

            // Mesh
            countertop = new THREE.Mesh(geometry, material);
            countertop.castShadow = true;
            countertop.receiveShadow = true;

            scene.add(countertop);
        }

        /**
         * Generates a simple marble-like texture using Canvas
         * @returns {THREE.CanvasTexture} - The generated texture
         */
        function generateMarbleTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            // Draw base
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw veins
            ctx.strokeStyle = '#CCCCCC';
            ctx.lineWidth = 2;
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.bezierCurveTo(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                );
                ctx.stroke();
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            return texture;
        }

        /**
         * Generates a simple granite-like texture using Canvas
         * @returns {THREE.CanvasTexture} - The generated texture
         */
        function generateGraniteTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            // Draw base
            ctx.fillStyle = '#5D3A1A';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add speckles
            ctx.fillStyle = '#8B4513';
            for (let i = 0; i < 100; i++) {
                ctx.beginPath();
                const radius = Math.random() * 2;
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);
            return texture;
        }

        /**
         * Generates a simple quartz-like texture using Canvas
         * @returns {THREE.CanvasTexture} - The generated texture
         */
        function generateQuartzTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            // Draw base
            ctx.fillStyle = '#F8F8FF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw patterns
            ctx.strokeStyle = '#C0C0C0';
            ctx.lineWidth = 1;
            for (let i = 0; i < 30; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
            return texture;
        }

        /**
         * Updates the countertop based on user selections
         */
        function updateCountertop() {
            // Get selected color
            const selectedColorDiv = document.querySelector('.color-square.selected');
            if (!selectedColorDiv) {
                console.warn('No color selected.');
                return;
            }
            const colorHex = selectedColorDiv.dataset.color;

            // Get selected pattern
            const patternSelect = document.querySelector('#patternSelect');
            if (!patternSelect) {
                console.warn('Pattern select element not found.');
                return;
            }
            const selectedPattern = patternSelect.value;

            // Get selected finish
            const finishSelect = document.querySelector('#finishSelect');
            if (!finishSelect) {
                console.warn('Finish select element not found.');
                return;
            }
            const selectedFinish = finishSelect.value;

            // Update the countertop
            createCountertop({
                color: new THREE.Color(colorHex),
                pattern: selectedPattern,
                finish: selectedFinish
            });
        }

        // Expose updateCountertop to the global scope within the IIFE
        window.updateCountertop = updateCountertop;

        // Initial Countertop Creation
        updateCountertop();

        // Handle Window Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }, false);

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();
    }

    /**
     * Loads necessary scripts and initializes the application
     */
    function loadAndInitialize() {
        injectStyles(); // Inject CSS styles dynamically
        loadScript(THREE_JS_URL)
            .then(() => loadScript(ORBIT_CONTROLS_URL))
            .then(() => {
                // Initialize the interface after all scripts are loaded
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
