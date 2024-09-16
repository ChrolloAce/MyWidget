(function () {
    // Variables for Three.js components
    let scene, camera, renderer, cube;

    // Initialize the scene
    function init() {
        // Create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Set background to black

        // Set up the camera
        camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        camera.position.z = 5; // Move the camera away from the origin

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

        // Create color buttons
        createColorButtons();

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);

        // Start the animation loop
        animate();
    }

    // Function to create color picker buttons
    function createColorButtons() {
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
                changeCubeColor(color);
            });
            buttonContainer.appendChild(button);
        });
    }

    // Function to change the cube's color
    function changeCubeColor(hexColor) {
        if (cube && cube.material) {
            cube.material.color.set(hexColor);
        }
    }

    // Function to handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix(); // Update the camera's projection matrix
        renderer.setSize(window.innerWidth, window.innerHeight); // Update renderer size
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube for a dynamic effect
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera); // Render the scene
    }

    // Function to load Three.js from CDN and initialize the scene
    function loadThreeJS(callback) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r148/three.min.js';
        script.onload = () => {
            console.log('Three.js loaded successfully.');
            callback();
        };
        script.onerror = () => {
            console.error('Failed to load Three.js.');
        };
        document.head.appendChild(script);
    }

    // Start by loading Three.js and then initialize
    loadThreeJS(init);
})();
