(function () {
  window.Block = function (config) {
    var newPimp, result, i, j,
      material = new THREE.MeshLambertMaterial( { color: config.color } ),
      block = new THREE.BoxGeometry( 400, 200, 200),
      pimp = new THREE.BoxGeometry( 80, 60, 80);
    result = new THREE.Mesh( block, material);
    for (i = 0; i < 2; i += 1) {
      for ( j = 0; j < 4; j += 1) {
      newPimp = new THREE.Mesh( pimp, material);
      newPimp.position.y = 100;
      newPimp.position.z = 50 - i * 100;
      newPimp.position.x = 150 - j * 100;
      result.add(newPimp);
      }
    }
    return result;
  }
})();