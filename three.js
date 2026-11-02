import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

import { MeshoptDecoder } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/libs/meshopt_decoder.module.js";
// 1. Create Scene
const scene = new THREE.Scene();

// 2. Create Camera
const camera = new THREE.PerspectiveCamera(
  45,
  2,
  0.1,
  1000
);

camera.position.set(3, 3, 18);
camera.lookAt(1, 0, 0);

// 3. Create Renderer
const container = document.getElementById("three-container");

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setSize(900, 500);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

// 4. Lighting
scene.add(new THREE.AmbientLight(0xffffff, 2));

const light = new THREE.DirectionalLight(0xffffff, 3);

light.position.set(5, 5, 5);

scene.add(light);

// 5. Load animals
const loader = new GLTFLoader();

loader.setMeshoptDecoder(MeshoptDecoder);

let dog1;
let cat;
let cow;
let sparrow;
let horse;

// Function to load and position models
function loadAnimal(path, name, xPosition) {
  loader.load(
    path,

    function (gltf) {
      const animal = gltf.scene;

      // Calculate model size
      const box = new THREE.Box3().setFromObject(animal);

      const size = box.getSize(new THREE.Vector3());

      const maxSize = Math.max(size.x, size.y, size.z);

      // Set normal size
      animal.scale.setScalar(2.5 / maxSize);

      // Center model
      const newBox = new THREE.Box3().setFromObject(animal);

      const center = newBox.getCenter(new THREE.Vector3());

      animal.position.sub(center);

      // Position side by side
      // Position animals side by side
      animal.position.x += xPosition;

      // Move all animals upwards
      animal.position.y += 3.5;

scene.add(animal);

      if (name === "Dog") {
        dog1 = animal;
      } else if (name === "Cat") {
        cat = animal;
      } else if (name === "Cow") {
        cow = animal;
      } else if (name === "Sparrow") {
        sparrow = animal;
      } else if (name === "Horse") {
        horse = animal;
      }


      console.log(name + " MODEL LOADED SUCCESSFULLY!");
    },

    undefined,

    function (error) {
      console.error(name + " loading error:", error);
    },
  );
}

// Load Dog on left
loadAnimal("./models/dog1.glb", "Dog", -1.8);

// Load Cat on right
loadAnimal("./models/Cat_black_white.glb", "Cat", 1);
// Load Cow on right
loadAnimal("./models/cow.glb", "Cow", 4.4);
// Load Sparrow on right
loadAnimal("./models/Sparrow.glb", "Sparrow", 7.8);
// Load Horse on right
loadAnimal("./models/horse.glb", "Horse", 11.2);

// 6. Animation
function animate() {
  requestAnimationFrame(animate);

  if (dog1) {
    dog1.rotation.y += 0.03;
  }

  if (cat) {
    cat.rotation.y += 0.03;
  }
   if (cow) {
    cow.rotation.y += 0.03;
  }

  if (sparrow) {
    sparrow.rotation.y += 0.03;
  }

  if (horse) {
    horse.rotation.y += 0.03;
  }

  renderer.render(scene, camera);
}

animate();
