
var camera, scene, renderer, mesh, mouse, controls,
	width = window.innerWidth, 
	height = window.innerHeight;

var clock = new THREE.Clock();
var mouse = new THREE.Vector2();
	
init();
animate();

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
	renderer.setSize( width, height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setViewport( 0,0,width, height );
	renderer.getMaxAnisotropy();

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 10000000 );
	camera.position.set( 1000, 100, 800 );

	mouse = new THREE.Vector2();

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.target.set( 0,0,0 );

	buildShape();

	var directionalLight = new THREE.SpotLight(0xeeeeee, 1.5);
		directionalLight.position.set(2000, 3500,2500);
		//directionalLight.target.position.set( 0, 0, 0 );
		//directionalLight.shadowCameraVisible = true;
		directionalLight.castShadow = true;
		directionalLight.shadowCameraFar = 10000;
		directionalLight.shadowDarkness = 0.5;
		directionalLight.shadowMapWidth = 2048;
		directionalLight.shadowMapHeight = 2048;
		directionalLight.name = 'luzDireccional'

	scene.add( directionalLight );

	// var directionalLight = new THREE.SpotLight(0xeeeeee, 1.0);
	// 	directionalLight.position.set(-2000, 0,-2500);
	// 	//directionalLight.target.position.set( 0, 0, 0 );
	// 	//directionalLight.shadowCameraVisible = true;
	// 	directionalLight.castShadow = true;
	// 	directionalLight.shadowCameraFar = 10000;
	// 	directionalLight.shadowDarkness = 0.5;
	// 	directionalLight.shadowMapWidth = 2048;
	// 	directionalLight.shadowMapHeight = 2048;
	// 	directionalLight.name = 'luzDireccional'

	// scene.add( directionalLight );
	//
	window.addEventListener( 'resize', onWindowResize, false );

	

}


function buildShape(){
	
	//Cylindro R2
	var Texture = THREE.ImageUtils.loadTexture( "images/r2.jpg" );
		Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping; 
		Texture.repeat.set( 1, 1 );	
	var CYLINDERmaterial = new THREE.MeshPhongMaterial( { map: Texture,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

	var CYLINDERradiusTop = 150; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 150;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 300;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)
	var novG2 = Math.PI / 2;
	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder_cuerpo_1 = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder_cuerpo_1.castShadow = true;	//emitir sombras
		cylinder_cuerpo_1.receiveShadow = true;	//recibir sombras
		cylinder_cuerpo_1.position.set(0,0,0);	//position del objeto(x,y,z)
		cylinder_cuerpo_1.rotation.set(0,-novG2,0);	//rotacion del objeto(x,y,z)
		cylinder_cuerpo_1.scale.set(1,1,1);		//escala del objeto(x,y,z)
	// scene.add( cylinder );

	// Cabeza R2

	var Texture = THREE.ImageUtils.loadTexture( "images/r2head.jpg" );
		Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping; 
		Texture.repeat.set( 1, 1 );	
	var SPHEREmaterial = new THREE.MeshPhongMaterial( { map: Texture,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

	var SPHEREradius = 150; //dimensiones de la esfera
	var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
	var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
	var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
	var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

	var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
	var sphere_top = new THREE.Mesh( SPHEREgeometry, SPHEREmaterial );
		sphere_top.castShadow = true;	//emitir sombras
		sphere_top.receiveShadow = true;	//recibir sombras
		sphere_top.position.set(0,150,0);	//position del objeto(x,y,z)
		sphere_top.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		sphere_top.scale.set(1,1,1);	//escala del objeto(x,y,z)
	// scene.add( sphere );

	

	//Base R2

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 148; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 100;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 50;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var novG = Math.PI / 2;

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder_base = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder_base.castShadow = true;	//emitir sombras
		cylinder_base.receiveShadow = true;	//recibir sombras
		cylinder_base.position.set(0,-170,0);	//position del objeto(x,y,z)
		cylinder_base.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		cylinder_base.scale.set(1,1,1);		//escala del objeto(x,y,z)
	// scene.add( cylinder );

	group_body = new THREE.Object3D();//create an empty container
	group_body.add( cylinder_cuerpo_1 );//add a mesh with geometry to it
	group_body.add( sphere_top );//add a mesh with geometry to it
	group_body.add( cylinder_base );//add a mesh with geometry to it
	group_body.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0) );
	group_body.rotation.set(0,0,0.2);
	scene.add( group_body );//when done, add the group to the scene

	// Cilindro union cuerpo

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 50; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 50;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 340;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder.castShadow = true;	//emitir sombras
		cylinder.receiveShadow = true;	//recibir sombras
		cylinder.position.set(0,70,0);	//position del objeto(x,y,z)
		cylinder.rotation.set(novG,0,0);	//rotacion del objeto(x,y,z)
		cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( cylinder );


	//Brazo 1
	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 70; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 70;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 30;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = Math.PI; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder_hombro1 = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder_hombro1.castShadow = true;	//emitir sombras
		cylinder_hombro1.receiveShadow = true;	//recibir sombras
		cylinder_hombro1.position.set(0,70,180);	//position del objeto(x,y,z)
		cylinder_hombro1.rotation.set(novG,novG,0);	//rotacion del objeto(x,y,z)
		cylinder_hombro1.scale.set(1,1,1);		//escala del objeto(x,y,z)
	// scene.add( cylinder );

	var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var xAxis = 140;//dimensiones x
	var yAxis = 90;//dimensiones y
	var zAxis = 30;//dimensiones z

	var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
	var cube_top_brazo1 = new THREE.Mesh( cubegeometry, CUBEmaterial );
		cube_top_brazo1.castShadow = true; //emitir sombras
		cube_top_brazo1.receiveShadow = true; //recibir sombras
		cube_top_brazo1.position.set(0,30,180); //position del objeto(x,y,z)
		cube_top_brazo1.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
		cube_top_brazo1.scale.set(1,1,1); //escala del objeto(x,y,z)
	// scene.add( cube );

	var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var xAxis = 80;//dimensiones x
	var yAxis = 250;//dimensiones y
	var zAxis = 25;//dimensiones z

	var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
	var cube_brazo1 = new THREE.Mesh( cubegeometry, CUBEmaterial );
		cube_brazo1.castShadow = true; //emitir sombras
		cube_brazo1.receiveShadow = true; //recibir sombras
		cube_brazo1.position.set(0,-70,180); //position del objeto(x,y,z)
		cube_brazo1.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
		cube_brazo1.scale.set(1,1,1); //escala del objeto(x,y,z)
	// scene.add( cube );

	// Pata1

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 50; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 80;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 50;	//altura del cilindro
	var CYLINDERradioSegments = 4; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder_pata_1 = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder_pata_1.castShadow = true;	//emitir sombras
		cylinder_pata_1.receiveShadow = true;	//recibir sombras
		cylinder_pata_1.position.set(0,-220,180);	//position del objeto(x,y,z)
		cylinder_pata_1.rotation.set(0,novG/2,0);	//rotacion del objeto(x,y,z)
		cylinder_pata_1.scale.set(1,1,1);		//escala del objeto(x,y,z)
	// scene.add( cylinder );

	group2 = new THREE.Object3D();//create an empty container
	group2.add( cube_top_brazo1 );//add a mesh with geometry to it
	group2.add( cube_brazo1 );//add a mesh with geometry to it
	group2.add( cylinder_hombro1 );//add a mesh with geometry to it
	group2.add( cylinder_pata_1 );//add a mesh with geometry to it
	group2.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0) );
	group2.rotation.set(0,0,0);
	scene.add( group2 );//when done, add the group to the scene

//_________________________________________________________



	//Brazo 2
	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 70; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 70;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 30;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = Math.PI; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder_hombro2 = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder_hombro2.castShadow = true;	//emitir sombras
		cylinder_hombro2.receiveShadow = true;	//recibir sombras
		cylinder_hombro2.position.set(0,70,-180);	//position del objeto(x,y,z)
		cylinder_hombro2.rotation.set(novG,novG,0);	//rotacion del objeto(x,y,z)
		cylinder_hombro2.scale.set(1,1,1);		//escala del objeto(x,y,z)
	// scene.add( cylinder );

	var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var xAxis = 140;//dimensiones x
	var yAxis = 90;//dimensiones y
	var zAxis = 30;//dimensiones z

	var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
	var cube2 = new THREE.Mesh( cubegeometry, CUBEmaterial );
		cube2.castShadow = true; //emitir sombras
		cube2.receiveShadow = true; //recibir sombras
		cube2.position.set(0,30,-180); //position del objeto(x,y,z)
		cube2.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
		cube2.scale.set(1,1,1); //escala del objeto(x,y,z)
	// scene.add( cube2 );

	var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var xAxis = 80;//dimensiones x
	var yAxis = 250;//dimensiones y
	var zAxis = 25;//dimensiones z

	var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
	var cube3 = new THREE.Mesh( cubegeometry, CUBEmaterial );
		cube3.castShadow = true; //emitir sombras
		cube3.receiveShadow = true; //recibir sombras
		cube3.position.set(0,-70,-180); //position del objeto(x,y,z)
		cube3.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
		cube3.scale.set(1,1,1); //escala del objeto(x,y,z)
	// scene.add( cube3 );

	// Pata2

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 50; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 80;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 50;	//altura del cilindro
	var CYLINDERradioSegments = 4; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder2 = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder2.castShadow = true;	//emitir sombras
		cylinder2.receiveShadow = true;	//recibir sombras
		cylinder2.position.set(0,-220,-180);	//position del objeto(x,y,z)
		cylinder2.rotation.set(0,novG/2,0);	//rotacion del objeto(x,y,z)
		cylinder2.scale.set(1,1,1);		//escala del objeto(x,y,z)
	// scene.add( cylinder2 );


	var group = new THREE.Object3D();//create an empty container
	group.add( cube2 );//add a mesh with geometry to it
	group.add( cube3 );//add a mesh with geometry to it
	group.add( cylinder2 );//add a mesh with geometry to it
	group.add( cylinder_hombro2 );//add a mesh with geometry to it
	group.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0) );
	group.rotation.set(0,0,0);
	scene.add( group );//when done, add the group to the scene

	// Pata Central Abajo

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 30; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 80;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 80;	//altura del cilindro
	var CYLINDERradioSegments = 4; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder.castShadow = true;	//emitir sombras
		cylinder.receiveShadow = true;	//recibir sombras
		cylinder.position.set(90,-220,0);	//position del objeto(x,y,z)
		cylinder.rotation.set(0,novG/2,0);	//rotacion del objeto(x,y,z)
		cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( cylinder );



	/*SKY !!!!*/

	var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/fondo-estrellas.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

	var SKYradius = 2500; //dimensiones del cielo
	var SKYwidthSegments = 32;
	var SKYheigthSegments = 32;
	var SKYangleStart = 0;
	var SKYangleLenght = 6.3;

	var SKYgeometry = new THREE.SphereGeometry( SKYradius, SKYwidthSegments, SKYheigthSegments, SKYangleStart, SKYangleLenght );
	var sky = new THREE.Mesh( SKYgeometry, SKYmaterial );
		sky.position.set(0,0,0);
		sky.rotation.set(0,0,0);
		sky.scale.set(1,1,1);
	scene.add( sky );


	//Floor

	var planexAxis = 5000;//dimensiones x
	var planeyAxis = 5000;//dimensiones y
	var planezAxis = 5000;//dimensiones z

	var Texture = THREE.ImageUtils.loadTexture( "images/suelo_lunar.jpg" );
		Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping; 
		Texture.repeat.set( 1, 1 );
	var material = new THREE.MeshBasicMaterial( { map: Texture, color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 1  } );

	var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
	var plane = new THREE.Mesh( PLANEgeometry, material );
		plane.castShadow = true;	//emitir sombras
		plane.receiveShadow = true;	//recibir sombras
		plane.position.set(0,-250,0);	//position del objeto(x,y,z)
		plane.rotation.set(novG,0,0);	//rotacion del objeto(x,y,z)
		plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( plane );

	// Cubo base patas
	// var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	// var extrudeSettings = {
	// 	steps			: 200,
	// 	bevelEnabled	: true,
	// 	bevelThickness  : 2,
	// 	bevelSize       : 4,
	// 	bevelSegments   : 1
	// };

	// var pts = [], numPts = 5;

	// for ( var i = 0; i < numPts * 2; i ++ ) {

	// 	var l = i % 2 == 1 ? 10 : 20;

	// 	var a = i / numPts * Math.PI;

	// 	pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );

	// }

	// var shape = new THREE.Shape( pts );

	// var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	// var cube = new THREE.Mesh( geometry, CUBEmaterial );
	// 	cube.castShadow = true; //emitir sombras
	// 	cube.receiveShadow = true; //recibir sombras
	// 	cube.position.set(500,0,0); //position del objeto(x,y,z)
	// 	cube.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
	// 	cube.scale.set(1,1,1); //escala del objeto(x,y,z)
	// scene.add( cube );
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function movement(value, object, delay, duration){
          var tween = new TWEEN.Tween(object).to(
          	value
          	,duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
          	/*camera.position.x = valueX;
          	camera.position.y = valueY;
          	camera.position.z = valueZ;*/
          }).delay(delay).start();
}

function animate() {

	setTimeout( function() {
		requestAnimationFrame( animate );
	}, 1000/30 );

    TWEEN.update();

	render();

	//if(controls) controls.update( clock.getDelta() );
}

function render(){
	renderer.render(scene,camera);
}
