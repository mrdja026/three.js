import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import Stats from "stats.js";
//setup renderr scene, canvas, camera stats
const stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000,
);
//controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();

const createCube = (geometry, color, posX) => {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = posX;
  return cube;
};

const createLight = () => {
  const color = 0xffffff;
  const intensity = 3;
  camera.position.z = 5;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  return light;
};

const light = createLight();
scene.add(light);
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const cubes = [
  createCube(geometry, 0x44aa88, 0),
  createCube(geometry, 0x8844aa, -2),
  createCube(geometry, 0xaa8844, 2),
];
let count = 0;
const tick = (fn, cb) => {
  return setTimeout(() => {
    fn();
    cb();
  }, 100);
};

const tickUp = () =>
  tick(() => {
    count += 1;
  }, tickUp);

tickUp();

cubes.forEach((c) => scene.add(c));

function animate(time) {
  time *= 0.001;
  // stats.begin();

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * 0.1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // stats.end();
}
if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
