(function () {
    // URLs for Three.js, OrbitControls, FBXLoader, and fflate
    const THREE_JS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
    const ORBIT_CONTROLS_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
    const FBX_LOADER_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FBXLoader.js';
    const FFLATE_URL = 'https://cdn.jsdelivr.net/npm/fflate/umd/fflate.min.js';  // fflate library URL

    // URL for the FBX model file hosted on Vercel
    const FBX_MODEL_URL = 'https://my-widget-nu.vercel.app/countermain.fbx';

    // CSS styles dynamically injected into the page
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

    // Function to inject CSS styles into the document
    function injectStyles() {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // Function to dynamically load external scripts
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${url}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = url;
            script.async = false;  // Ensure scripts are loaded in order
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
            document.head.appendChild(script);
        });
    }

    // Function to initialize the Three.js scene with an FBX model
    function init() {
        let scene, camera, renderer, controls;

        // Create a container for layout
        const container = document.createElement('div');
        container.classList.add('container');
        document.body.appendChild(container);

        const sceneContainer = document.createElement('div');
        sceneContainer.classList.add('scene');
        container.appendChild(sceneContainer);

        // Create a Three.js scene with a white background
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        // Set up the camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 3, 5);

        // Set up the renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneContainer.appendChild(renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // Initialize OrbitControls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.minDistance = 2;
        controls.maxDistance = 10;

        // Load the FBX model
        loadFBXModel(FBX_MODEL_URL)
            .then(loadedModel => {
                scene.add(loadedModel);  // Add the FBX model to the scene
            })
            .catch(error => {
                console.error('Error loading FBX model:', error);
            });

        // Handle window resizing
        window.addEventListener('resize', onWindowResize, false);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        // Function to handle window resizing
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    // Function to load the FBX model
    function loadFBXModel(url) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.FBXLoader();
            loader.load(
                url,
                object => {
                    object.scale.set(0.01, 0.01, 0.01);  // Scale down the model if necessary
                    resolve(object);
                },
                xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
                error => reject(error)
            );
        });
    }

    // Function to load scripts and initialize the scene
    function loadAndInitialize() {
        injectStyles();  // Inject CSS styles dynamically
        loadScript(THREE_JS_URL)
            .then(() => loadScript(ORBIT_CONTROLS_URL))
            .then(() => loadScript(FFLATE_URL))  // Load fflate.min.js
            .then(() => loadScript(FBX_LOADER_URL))
            .then(() => init())  // Initialize the scene after scripts are loaded
            .catch(error => {
                console.error(error.message);
                alert('Failed to load necessary scripts.');
            });
    }

    // Start the script
    loadAndInitialize();
})();
