let container;
let scene;
let camera;
let renderer;

let objArry = [];
let ADD = 0.01;

function init() {
  container = document.querySelector("#scene-container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  const light = new THREE.DirectionalLight(0xffffff, 5.0);
  light.position.set(10, 10, 10);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  container.appendChild(renderer.domElement);

  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function update() {
  let x = Math.random();
  if (x < 0.1) createObj();
  let speed = randomSpeed();
  objArry.forEach((mesh) => {
    (mesh.position.x += speed), (mesh.rotation.x += 0.01);
    mesh.rotation.y += 0.01;
  });
}

function render() {
  renderer.render(scene, camera);
}

function randomRange(to, from) {
  let x = Math.random() * (to - from);
  return x + from;
}

function randomSpeed() {
  const speed = Math.random() * (0.03 - 0.01) + 0.01;
  return speed;
}

function createObj() {
  let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff,
  });
  let mesh = new THREE.Mesh(geometry, material);

  mesh.position.y = randomRange(-15, 15);
  mesh.position.z = randomRange(-15, 15);
  mesh.position.x = -15;
  scene.add(mesh);
  objArry.push(mesh);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
