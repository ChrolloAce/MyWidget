(function () {
    let scene, camera, renderer, model, controls;

    // Initialize the interface and 3D scene
    function init() {
        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); // Set background color

        // Camera setup
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 5); // Set camera position

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Orbit controls setup
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Enable smooth movement
        controls.update();

        // Lighting setup
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);

        // Load the 3D model
        const loader = new THREE.GLTFLoader();
        loader.load('https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf', function (gltf) {
            model = gltf.scene;
            model.scale.set(0.01, 0.01, 0.01); // Adjust scale if needed
            scene.add(model); // Add the model to the scene
            animate(); // Start the animation loop
        }, undefined, function (error) {
            console.error('An error occurred while loading the model:', error);
        });

        // Create color-changing buttons and add them to the interface
        const colorButtons = createColorButtons();
        document.body.appendChild(colorButtons);

        // Add window resize event listener
        window.addEventListener('resize', onWindowResize, false);
    }

    // Handle window resizing
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Apply color to the model's material
    function applyColorToModel(color) {
        if (model) {
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: color }); // Apply the color to the mesh material
                }
            });
        }
    }

    // Create buttons to select colors for the 3D model
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

    // Main animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Update controls on each frame
        renderer.render(scene, camera); // Render the scene from the perspective of the camera
    }

    // Load THREE.js and additional dependencies
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
        const gltfLoaderScript = document.createElement('script');
        gltfLoaderScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
        document.head.appendChild(gltfLoaderScript);

        const orbitControlsScript = document.createElement('script');
        orbitControlsScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
        document.head.appendChild(orbitControlsScript);

        // Initialize the interface after both GLTFLoader and OrbitControls are loaded
        gltfLoaderScript.onload = () => {
            orbitControlsScript.onload = init;
        };
    };
    document.head.appendChild(script);

    // Existing button setup (if you had other UI elements/buttons)
    function styleButton(button) {
        button.style.padding = '14px';
        button.style.backgroundColor = '#0264D9'; // Blue color for contrast
        button.style.color = '#ffffff'; // White text
        button.style.border = 'none'; // Remove borders
        button.style.borderRadius = '10px'; // Rounded corners for modern look
        button.style.cursor = 'pointer';
        button.style.fontSize = '18px';
        button.style.fontWeight = 'bold';
        button.style.margin = '20px 0'; // More spacing around buttons
        button.style.transition = 'all 0.3s ease';
        button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'; // Slight shadow for depth

        button.addEventListener('mouseenter', function () {
            button.style.backgroundColor = '#004C99'; // Darker blue on hover
        });

        button.addEventListener('mouseleave', function () {
            button.style.backgroundColor = '#0264D9'; // Return to original color
        });
    }

    // Initialize other parts of the interface here...
})();
