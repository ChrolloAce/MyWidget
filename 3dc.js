(function () {
    let scene, camera, renderer, model;

    // Initialize the 3D scene
    function init() {
        // Create the scene
        scene = new THREE.Scene();

        // Set up the camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Set up the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add basic lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);

        // Load the GLTF model without textures
        const loader = new THREE.GLTFLoader();
        loader.load(
            'https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf',
            function (gltf) {
                model = gltf.scene;

                // Apply a basic material to the model
                model.traverse(function (child) {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa }); // Basic gray material
                    }
                });

                scene.add(model);
                animate();
            },
            undefined,
            function (error) {
                console.error('An error occurred while loading the model:', error);
            }
        );

        // Create color selection UI
        createColorButtons();
    }

    // Create color selection buttons
    function createColorButtons() {
        const colors = ['Red', 'Green', 'Blue', 'Gray', 'Yellow'];
        const colorValues = [0xff0000, 0x00ff00, 0x0000ff, 0xaaaaaa, 0xffff00];

        const colorContainer = document.createElement('div');
        colorContainer.style.position = 'absolute';
        colorContainer.style.top = '10px';
        colorContainer.style.left = '10px';

        colors.forEach((color, index) => {
            const button = document.createElement('button');
            button.textContent = color;
            button.style.margin = '5px';
            button.style.padding = '10px';
            button.style.backgroundColor = color.toLowerCase();
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            button.onclick = () => applyColorToModel(colorValues[index]);
            colorContainer.appendChild(button);
        });

        document.body.appendChild(colorContainer);
    }

    // Function to apply a color to the model
    function applyColorToModel(color) {
        if (model) {
            model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.color.set(color); // Apply the selected color
                }
            });
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Optional: Rotate the model for better visualization
        if (model) {
            model.rotation.y += 0.01;
        }

        renderer.render(scene, camera);
    }

    // Style buttons for consistency
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

    // Initialize everything when the page loads
    init();
})();
