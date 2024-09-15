// Dynamically load the Three.js library
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
document.head.appendChild(script);

// Load the GLTFLoader after Three.js is loaded
script.onload = function() {
    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/loaders/GLTFLoader.js';
    document.head.appendChild(loaderScript);

    loaderScript.onload = function() {
        init(); // Initialize after all scripts are loaded
    };
};

// Initialization function for THREE.js setup
function init() {
    let scene, camera, renderer, model;

    function setupScene() {
        // Setup the scene, camera, and renderer
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xdddddd);

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 2);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add light to the scene
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, 10);
        scene.add(light);

        // Load your GLTF model
        const loader = new THREE.GLTFLoader();
        loader.load('https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf', function(gltf) {
            model = gltf.scene;
            scene.add(model);
        }, undefined, function(error) {
            console.error('An error occurred while loading the model:', error);
        });

        // Setup window resizing listener
        window.addEventListener('resize', onWindowResize);
        animate();
    }

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Animation loop to render the scene
    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y += 0.01; // Rotate the model for visualization
        }
        renderer.render(scene, camera);
    }

    setupScene();

    // Function to apply color to the 3D model (you can attach this to color buttons)
    function applyColorToCountertop(color) {
        if (model) {
            model.traverse(function(child) {
                if (child.isMesh) {
                    child.material.color.set(color); // Apply the selected color
                }
            });
        }
    }

    // Example of creating color buttons dynamically
    function createColorButtons() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000']; // List of colors
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '10px';
        container.style.left = '10px';
        document.body.appendChild(container);

        colors.forEach(color => {
            const button = document.createElement('button');
            button.style.backgroundColor = color;
            button.style.width = '50px';
            button.style.height = '50px';
            button.style.margin = '5px';
            button.addEventListener('click', () => applyColorToCountertop(color));
            container.appendChild(button);
        });
    }

    createColorButtons(); // Call function to create color buttons
}
