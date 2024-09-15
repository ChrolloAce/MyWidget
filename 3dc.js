<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Model Viewer</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        #colorContainer {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 1;
        }
        button {
            margin: 5px;
            padding: 10px;
            background-color: #0264D9;
            color: #ffffff;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
        }
        button:hover {
            background-color: #004C99;
        }
    </style>
</head>
<body>
    <!-- Color selection buttons will appear here -->
    <div id="colorContainer"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>

    <script>
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

                const colorContainer = document.getElementById('colorContainer');

                colors.forEach((color, index) => {
                    const button = document.createElement('button');
                    button.textContent = color;
                    button.style.backgroundColor = color.toLowerCase();
                    button.onclick = () => applyColorToModel(colorValues[index]);
                    colorContainer.appendChild(button);
                });
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

            // Initialize everything when the page loads
            init();
        })();
    </script>
</body>
</html>
