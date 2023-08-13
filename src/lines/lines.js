import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const createScene = () => {
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
  return {
    renderer,
    controls,
    camera,
    scene,
  };
};

const { renderer, controls, camera, scene } = createScene();

//line shit

// const material = new THREE.LineBasicMaterial({
//   color: 0xffffff,
//   linewidth: 10,
// });

// const points = [];
// const first = new THREE.Vector3(-10, 0, 0);
// const firstNormalized = first.clone().normalize();
// const desiredLength = 5; // Adjust this value as needed
// const fistParalel = firstNormalized.clone().multiplyScalar(desiredLength);

// const second = new THREE.Vector3(0, 10, 0);
// const secondNormalized = second.clone().normalize();
// const secondParalel = secondNormalized.clone().multiplyScalar(desiredLength);
// points.push(first, second);

// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const geometryParalel = new THREE.BufferGeometry().setFromPoints([
//   fistParalel,
//   secondParalel,
// ]);
// const line = new THREE.Line(geometry, material);
// const lineParalel = new THREE.Line(geometryParalel, material);

// scene.add(line);
// scene.add(lineParalel);

const extrudeSettings = {
  steps: 2,
  depth: 16,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 1,
  bevelOffset: 0,
  bevelSegments: 1,
};

const firstWall = new THREE.Shape();

firstWall.moveTo(0, 0);
firstWall.lineTo(1, 0);
firstWall.lineTo(1, 0.75);
firstWall.lineTo(0, 1);
firstWall.lineTo(0, 0);

const wallGeomatry = new THREE.ExtrudeGeometry(firstWall, extrudeSettings);
const tiltWallA = new THREE.Mesh(
  wallGeomatry,
  new THREE.MeshStandardMaterial({ color: 0xff9999 }),
);

const secondWall = tiltWallA.clone();
secondWall.rotateY(Math.PI / 2);
const thridWall = secondWall.clone();
thridWall.translateX(-15);
thridWall.translateZ(15);
thridWall.rotateY(-Math.PI);

const fourthWall = thridWall.clone();
fourthWall.rotateY(Math.PI / 2);
fourthWall.translateZ(-15);

scene.add(tiltWallA);
scene.add(secondWall);
scene.add(thridWall);
scene.add(fourthWall);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  scene.background = new THREE.Color("#FDD835");
  renderer.render(scene, camera);
}
if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
