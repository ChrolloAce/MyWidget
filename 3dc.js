<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Model with Texture Change</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        #color-picker {
            position: absolute;
            top: 10px;
            left: 10px;
            display: flex;
            gap: 10px;
        }
        .color-btn {
            width: 50px;
            height: 50px;
            cursor: pointer;
        }
    </style>
</head>
<body>

<div id="color-picker">
    <div class="color-btn" style="background-color: red;" data-color="red"></div>
    <div class="color-btn" style="background-color: green;" data-color="green"></div>
    <div class="color-btn" style="background-color: blue;" data-color="blue"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128/examples/js/loaders/GLTFLoader.js"></script>

<script>
    let scene, camera, renderer, model;

    // Initialize the scene
    function init() {
        // Create a scene
        scene = new THREE.Scene();

        // Create a camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add lighting to the scene
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        // Load the GLTF model
        const loader = new THREE.GLTFLoader();
        loader.load('https://raw.githubusercontent.com/ChrolloAce/MyWidget/main/Counters.gltf', function (gltf) {
            model = gltf.scene;
            model.scale.set(1, 1, 1); // Adjust scale if necessary
            scene.add(model);
            animate();
        });

        // Event listener for window resize
        window.addEventListener('resize', onWindowResize, false);
    }

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y += 0.01; // Rotate the model for a dynamic effect
        }
        renderer.render(scene, camera);
    }

    // Change the texture (color in this case) of the model
    function changeModelColor(color) {
        if (model) {
            model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.color.set(color);  // Change color dynamically
                }
            });
        }
    }

    // Add event listeners to color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const color = this.getAttribute('data-color');
            changeModelColor(color);
        });
    });

    // Initialize the scene
    init();
</script>

</body>
</html>
