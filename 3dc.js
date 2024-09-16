(function () {
    // URLs for Three.js and GLTFLoader (if needed in future)
    const THREE_JS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r148/three.min.js';
    // const GLTF_LOADER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r148/examples/js/loaders/GLTFLoader.js';

    // Function to dynamically load a script
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                console.log(`Successfully loaded script: ${url}`);
                resolve();
            };
            script.onerror = () => {
                reject(new Error(`Failed to load script: ${url}`));
            };
            document.head.appendChild(script);
        });
    }

    // Function to initialize the Three.js scene
    function init() {
        let scene, camera, renderer, cube;

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
        document.body.appendChild(renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Create a cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Create color buttons
        createColorButtons(cube);

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate the cube for a dynamic effect
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        animate();
    }

    // Function to create color picker buttons
    function createColorButtons(cube) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#000000'];
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.top = '20px';
        buttonContainer.style.left = '20px';
        buttonContainer.style.zIndex = '1';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexWrap = 'wrap';
        buttonContainer.style.gap = '10px';
        document.body.appendChild(buttonContainer);

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

    // Load Three.js and initialize
    loadScript(THREE_JS_URL)
        .then(() => {
            init();
        })
        .catch((error) => {
            console.error(error.message);
            alert('Failed to load Three.js. Please check the console for more details.');
        });

    // If you need GLTFLoader in the future, uncomment and load it after Three.js
    /*
    loadScript(GLTF_LOADER_URL)
        .then(() => {
            // Initialize GLTFLoader-dependent features here
        })
        .catch((error) => {
            console.error(error.message);
            alert('Failed to load GLTFLoader. Please check the console for more details.');
        });
    */
})();
