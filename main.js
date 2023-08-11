import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
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
  stats.begin();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * 0.1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  stats.end();
}
if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
