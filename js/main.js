(function (document, window) {
  var scene, camera, renderer, block, pointLight, ground, gMaterial, objects = [];

  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.x = 500;
    pointLight.position.y = 2000;
    pointLight.position.z = 500;
    scene.add(pointLight);

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );

    hemiLight.position.y = 2000;
    scene.add( hemiLight );


    gMaterial = new THREE.MeshDepthMaterial( { color: 0x2c3e50} );
    ground = new THREE.BoxGeometry(  100000, 1, 100000 );
    ground = new THREE.Mesh( ground, gMaterial );
    ground.position.y = 0;


    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    camera.position.y = 500;

    block = new Block({ color: 0x98BABA });
    block.position.y = 100;
    objects.push(block);
    scene.add(ground);
    scene.add(block);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    document.body.appendChild( renderer.domElement );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  }

  function onDocumentMouseDown( event ) {
    var mouse, raycaster;

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
    mouse.y = -( event.clientY / renderer.domElement.height ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects( objects );
    if (intersects[0] && intersects[0].object == block) {
      block.material.color = new THREE.Color(0x98AAAA);
      block.isActive = true;
    } else {
      block.isActive = false;
      block.material.color = new THREE.Color(0x98BABA);
    }
  }

  window.scene = scene;
  window.block = block;
  window.camera = camera;
  function animate() {

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

  }

})(document, window);