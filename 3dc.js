(function () {
    // Load Three.js dynamically
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        document.head.appendChild(script);

        script.onload = function () {
            loadGLTFLoader();
        };
    } else {
        loadGLTFLoader();
    }

    // Function to load GLTFLoader
    function loadGLTFLoader() {
        const loaderScript = document.createElement('script');
        loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/loaders/GLTFLoader.js';
        document.head.appendChild(loaderScript);

        loaderScript.onload = function () {
            init(); // Initialize everything after the scripts load
        };
    }

    // Initialization function
    function init() {
        let scene, camera, renderer, model;

        function setupScene() {
            // Create scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff); // White background

            // Setup camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 2, 5); // Position camera further back

            // Create renderer and add to document
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // Add basic ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 1);
            scene.add(ambientLight);

            // Load the GLTF model
            const loader = new THREE.GLTFLoader();
            loader.load('https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf', function (gltf) {
                model = gltf.scene;
                scene.add(model); // Add model to scene
                animate(); // Start rendering loop
            }, undefined, function (error) {
                console.error('An error occurred loading the model:', error);
            });

            // Add orbit controls for interaction
            const controlsScript = document.createElement('script');
            controlsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/controls/OrbitControls.js';
            document.head.appendChild(controlsScript);

            controlsScript.onload = function () {
                const controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.update();
                animate();
            };

            // Handle window resize
            window.addEventListener('resize', onWindowResize);
        }

        // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Animate the scene
        function animate() {
            requestAnimationFrame(animate);
            if (model) {
                model.rotation.y += 0.01; // Rotate the model slowly
            }
            renderer.render(scene, camera);
        }

        // Apply color to model's material
        function applyColorToCountertop(color) {
            if (model) {
                model.traverse(function (child) {
                    if (child.isMesh) {
                        child.material.color.set(color);
                        child.material.needsUpdate = true; // Ensure the material updates
                    }
                });
            }
        }

        // Create color selection buttons
        function createColorButtons() {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000']; // Some colors to choose from
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

        setupScene(); // Set up the scene
        createColorButtons(); // Create color buttons
    }
})();
