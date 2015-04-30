(function (document, window) {
  var scene, camera, renderer, controls, block, plane, pointLight, INTERSECTED, SELECTED, ground, gMaterial, objects = [],
    raycaster = new THREE.Raycaster(),
    container = document.createElement('div'),
    offset = new THREE.Vector3(),
    mouse = new THREE.Vector2();

  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    pointLight = new THREE.SpotLight(0xffffff);
    pointLight.position.x = 2000;
    pointLight.position.y = 1500;
    pointLight.position.z = 2000;
    pointLight.shadowCameraVisible = true;
    scene.add(pointLight);

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );

    hemiLight.shadowCameraVisible = true;
    hemiLight.position.y = 1500;
    scene.add( hemiLight );


    plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
      new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true } )
    );
    plane.visible = false;
    scene.add( plane );

    gMaterial = new THREE.MeshDepthMaterial( { color: 0x2c3e50} );
    ground = new THREE.BoxGeometry(  100000, 1, 100000 );
    ground = new THREE.Mesh( ground, gMaterial );
    ground.reciveShadow = true;
    ground.position.y = 0;


    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    camera.position.y = 500;

    block = new Block({ color: 0x98BABA });
    block.position.y = 100;
    objects.push(block);
    scene.add(ground);
    scene.add(block);
    block.castShadow = true;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    var button = document.createElement('button');
    button.innerHTML = 'Add block';
    button.onclick = function () {
      var newBlock = new Block({ color: 0x98BABA });
      objects.push(newBlock);
      scene.add(newBlock);
    };
    container.appendChild( renderer.domElement );
    document.body.appendChild(button);
    document.body.appendChild( container );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'resize', onWindowResize, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

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

  function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    //

    raycaster.setFromCamera( mouse, camera );

    if ( SELECTED ) {

      var intersects = raycaster.intersectObject( plane );
      SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
      return;

    }

    intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {

      if ( INTERSECTED != intersects[ 0 ].object ) {

        if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

        plane.position.copy( INTERSECTED.position );
        plane.lookAt( camera.position );

      }

      container.style.cursor = 'pointer';

    } else {

      if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

      INTERSECTED = null;

      container.style.cursor = 'auto';

    }

  }

  function onDocumentMouseDown( event ) {

    event.preventDefault();

    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );

    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {

      controls.enabled = false;

      SELECTED = intersects[ 0 ].object;

      intersects = raycaster.intersectObject( plane );
      offset.copy( intersects[ 0 ].point ).sub( plane.position );

      container.style.cursor = 'move';

    }

  }

  function onDocumentMouseUp( event ) {

    event.preventDefault();

    controls.enabled = true;

    if ( INTERSECTED ) {

      plane.position.copy( INTERSECTED.position );

      SELECTED = null;

    }

    container.style.cursor = 'auto';

  }

  window.scene = scene;
  window.block = block;
  window.camera = camera;
  function animate() {

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

  }

})(document, window);