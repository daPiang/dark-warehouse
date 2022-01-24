import * as THREE from '/lib/three.module.js';
import { OrbitControls } from '/lib/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1, 1000
    );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.antialias = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCSoftShadowMap;
document.body.appendChild( renderer.domElement );

//Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

camera.position.set(130,70,130);

let cube = new THREE.Mesh();

make_geo();
lighting();

function lighting() {
    const ambi_light = new THREE.AmbientLight( 0xffffff );
    // scene.add( ambi_light );

    const hem_light = new THREE.HemisphereLight(0x0078e8, 0x004585, 0.3);
    hem_light.position.y = 60;
    scene.add(hem_light);

    const h_hem = new THREE.HemisphereLightHelper(hem_light, 5);
    // scene.add(h_hem);

    const spot_light = new THREE.SpotLight(
        0xffc800,//color
        0.8,//intensity
        100,//distance
        0.5,//angle
        1,//penumbra
        0//decay
    );
    spot_light.position.set(0,45,0);
    spot_light.castShadow = true;
    spot_light.shadow.mapSize.set(2056,2056);
    scene.add(spot_light);

    const h_spot = new THREE.SpotLightHelper(spot_light);
    // scene.add(h_spot);

    const tv_light = new THREE.SpotLight(
        0xffffff,//color
        0.5,//intensity
        25,//distance
        1.35,//angle
        0,//penumbra
        6//decay
    );
    tv_light.position.set(-12,16.5,-40);
    tv_light.castShadow = true;
    tv_light.shadow.mapSize.set(2056,2056);

    tv_light.target.position.set(0,16.5,-19);
    tv_light.target.updateMatrixWorld();

    scene.add(tv_light);

    const h_tv = new THREE.SpotLightHelper(tv_light);
    // scene.add(h_tv);

    const point_light = new THREE.PointLight(
        0xc40000,//color
        0.7,//intensity
        100,//distance
        2//decay
    );
    point_light.castShadow=true;
    point_light.position.set(27,25,-48);
    scene.add(point_light);

    const h_point = new THREE.PointLightHelper(point_light);
    // scene.add(h_point);
}

function make_geo() {
    //Test Cube
    const cube_geo = new THREE.BoxGeometry(10,10,10);
    const cube_mat = new THREE.MeshPhongMaterial({color: 0xff0000});
    cube = new THREE.Mesh(cube_geo, cube_mat);

    cube.castShadow = true;

    cube.position.y = 20;
    // scene.add(cube);

    //Floor
    const floor_geo = new THREE.BoxGeometry(100,1,100);
    const concrete = new THREE.TextureLoader().load('../assets/textures/concrete_floor.jpg');
    const floor_mat = new THREE.MeshPhongMaterial({
        color: 0x616161,
        map: concrete
    });
    const floor = new THREE.Mesh(floor_geo, floor_mat);

    floor.receiveShadow = true;
    scene.add(floor);

    //Walls
    const wall_geo1 = new THREE.BoxGeometry(100,40,1);
    const bricks = new THREE.TextureLoader().load('../assets/textures/brick_wall.jpg');
    const wall_mat = new THREE.MeshPhysicalMaterial({
        color: 0xffb0b0,
        map: bricks
    });
    const wall1 = new THREE.Mesh(wall_geo1, wall_mat);
    wall1.receiveShadow = true;
    wall1.position.set(0,20.5,-49.5);
    scene.add(wall1);

    const wall_geo2 = new THREE.BoxGeometry(1,40,100);
    const wall2 = new THREE.Mesh(wall_geo2, wall_mat);
    wall2.receiveShadow = true;
    wall2.position.set(-49.5,20.5,0);
    scene.add(wall2);

    const wall_geo3 = new THREE.BoxGeometry(1,10,85);
    const metal = new THREE.TextureLoader().load('../assets/textures/metal.jpg');
    const wall_mat2 = new THREE.MeshPhysicalMaterial({map:metal});
    const wall3 = new THREE.Mesh(wall_geo3, wall_mat2);
    wall3.receiveShadow = true;
    wall3.position.set(-49.5,45.5,-7);
    scene.add(wall3);

    const wall_geo4 = new THREE.BoxGeometry(1,10,5);
    const wall4 = new THREE.Mesh(wall_geo4, wall_mat2);
    wall4.receiveShadow = true;
    wall4.position.set(-49.5,45.5,47.5);
    scene.add(wall4);

    const wall_geo5 = new THREE.BoxGeometry(1,5,10);
    const wall5 = new THREE.Mesh(wall_geo5, wall_mat2);
    wall5.receiveShadow = true;
    wall5.position.set(-49.5,48,40);
    scene.add(wall5);

    const wall_geo6 = new THREE.BoxGeometry(100,10,1);
    const wall6 = new THREE.Mesh(wall_geo6, wall_mat2);
    wall6.receiveShadow=true;
    wall6.position.set(0,45.5,-49.5)
    scene.add(wall6);

    //Chair
    const chair_leg_geo = new THREE.CylinderGeometry(0.3,0.3,4,32);
    const wood = new THREE.TextureLoader().load('../assets/textures/wood.jpg');
    const chair_mat = new THREE.MeshLambertMaterial({map: wood});
    const chair_leg = new THREE.Mesh(chair_leg_geo, chair_mat);
    
    chair_leg.position.set(2,9.5,2);
    chair_leg.castShadow = true;
    chair_leg.receiveShadow = true;

    const leg2 = chair_leg.clone();
    leg2.position.set(-2,9.5,2);

    const leg3 = chair_leg.clone();
    leg3.position.set(2,9.5,-2);

    const leg4 = chair_leg.clone();
    leg4.position.set(-2,9.5,-2);

    const stem1 = chair_leg.clone();
    stem1.position.set(-2,13.5,-2);
    stem1.scale.set(1,1.7,1);

    const stem2 = chair_leg.clone();
    stem2.position.set(-2,13.5,2);
    stem2.scale.set(1,1.7,1);
    
    const chair_seat_geo = new THREE.BoxGeometry(5,0.5,5);
    const chair_seat = new THREE.Mesh(chair_seat_geo, chair_mat);

    chair_seat.castShadow = true;
    chair_seat.receiveShadow = true;

    chair_seat.position.set(0,11.5,0);

    const chair_back_geo = new THREE.BoxGeometry(0.5,2.5,3.5);
    const chair_back = new THREE.Mesh(chair_back_geo, chair_mat);

    chair_back.castShadow = true;
    chair_back.receiveShadow = true;
    
    chair_back.position.set(-2,15.5,0);

    const g_chair = new THREE.Group();
    g_chair.add(chair_leg);
    g_chair.add(leg2);
    g_chair.add(leg3);
    g_chair.add(leg4);
    g_chair.add(chair_seat);
    g_chair.add(stem1);
    g_chair.add(stem2);
    g_chair.add(chair_back);

    g_chair.position.y = -7;
    g_chair.rotation.y = -0.659;
    scene.add(g_chair);

    //Crates
    const crate_geo = new THREE.BoxGeometry(10,10,10);
    const wood_crate = new THREE.TextureLoader().load('../assets/textures/crate.jpg');
    const crate_mat = new THREE.MeshPhysicalMaterial({
        // color: 0x4a4a4a,
        map: wood_crate,
        reflectivity: 0.3,
    });
    const crate = new THREE.Mesh(crate_geo, crate_mat);
    crate.castShadow = true;
    crate.receiveShadow = true;
    
    const crate2 = crate.clone();

    const crate3 = crate.clone();

    const g_crate = new THREE.Group();

    g_crate.add(crate);
    crate.scale.set(2,2,2);
    crate.rotation.y = 0.1;
    crate.position.set(-37,10.5,-37);

    g_crate.add(crate2);
    crate2.scale.set(1.7,1.7,1.7);
    crate2.rotation.y = -0.15;
    crate2.position.set(-37,29,-37);

    g_crate.add(crate3);
    crate3.scale.set(1.4,1.4,1.4);
    crate3.rotation.y = -0.4;
    crate3.position.set(-17,7.5,-37);

    scene.add(g_crate);

    //Hanging Light
    const hang_lamp_geo = new THREE.ConeGeometry(1,2.5,32,1,false);
    const rusty_metal = new THREE.TextureLoader().load('../assets/textures/rusty_metal.jpg');
    const hang_lamp_mat = new THREE.MeshLambertMaterial({map: rusty_metal});
    const hang_lamp = new THREE.Mesh(hang_lamp_geo, hang_lamp_mat);

    hang_lamp.position.set(0,45,0);
    scene.add(hang_lamp);

    const lamp_string_geo = new THREE.CylinderGeometry(0.1,0.1,5);
    const lamp_string_mat = new THREE.MeshLambertMaterial({color:0x000000});
    const lamp_string = new THREE.Mesh(lamp_string_geo, lamp_string_mat);

    lamp_string.position.y = 47.5;
    scene.add(lamp_string);

    //TV
    const tv_base_geo = new THREE.BoxGeometry(1.5,4,6);
    const wood2 = new THREE.TextureLoader().load('../assets/textures/wood2.jpg');
    const tv_base_mat = new THREE.MeshPhongMaterial({color: 0x6e4700, map:wood2});
    const tv_base = new THREE.Mesh(tv_base_geo,tv_base_mat);

    tv_base.position.set(0,30,0);

    const tv_back_geo = new THREE.BoxGeometry(1.3,3,4);
    const tv_back_mat = new THREE.MeshPhongMaterial({color: 0x3d3d3d, map:metal});
    const tv_back = new THREE.Mesh(tv_back_geo,tv_back_mat);

    tv_back.position.set(-1.3,30,0);

    const dial_geo = new THREE.CylinderGeometry(0.4,0.4,0.4,32);
    const white_plastic = new THREE.TextureLoader().load('../assets/textures/dial.jpg');
    const dial_mat = new THREE.MeshPhongMaterial({color:0xededed, map: white_plastic});
    const dial = new THREE.Mesh(dial_geo,dial_mat);

    dial.position.set(0.9,31,2.5);
    dial.rotation.set(0,0,1.59);

    const dial2 = dial.clone();
    dial2.position.set(0.9,29,2.5);

    const screen_geo = new THREE.BoxGeometry(0,3.5,4.5);
    const signal = new THREE.TextureLoader().load('../assets/textures/signal.jpg');
    const screen_mat = new THREE.MeshBasicMaterial({map: signal});
    const screen = new THREE.Mesh(screen_geo, screen_mat);

    screen.position.set(0.8,30,-0.5);
    screen.emissive=0xffffff;
    screen.emissiveIntensity=1;

    const g_tv = new THREE.Group();
    g_tv.add(tv_back);
    g_tv.add(tv_base);
    g_tv.add(dial);
    g_tv.add(dial2);
    g_tv.add(screen);

    g_tv.position.set(-13,-13.5,-40);
    g_tv.rotation.y = -1;
    scene.add(g_tv);

    //Door
    const door_geo = new THREE.BoxGeometry(10,20,0.3);
    const door_mat = new THREE.MeshPhongMaterial({color:0x3e90ed, map: rusty_metal});
    const door = new THREE.Mesh(door_geo,door_mat);

    door.receiveShadow=true;
    door.position.set(27,10,-49);
    scene.add(door);

    const door_frame_geo = new THREE.BoxGeometry(1,21,0.7);
    const door_frame_mat = new THREE.MeshPhongMaterial({color: 0xffffff,map: metal});
    const door_frame = new THREE.Mesh(door_frame_geo, door_frame_mat);

    door_frame.castShadow=true;
    door_frame.receiveShadow=true;
    door_frame.position.set(21.5,21/2,-49);
    scene.add(door_frame);

    const frame2 = door_frame.clone();
    frame2.position.set(32.5,21/2,-49);
    scene.add(frame2);

    const top_frame_geo = new THREE.BoxGeometry(10,1,0.7);
    const top_frame = new THREE.Mesh(top_frame_geo, door_frame_mat);

    top_frame.castShadow=true;
    top_frame.receiveShadow=true;
    top_frame.position.set(27,20.5,-49);
    scene.add(top_frame);

    //Bulb
    const red_bulb_geo = new THREE.SphereGeometry(1);
    const glass = new THREE.TextureLoader().load('../assets/textures/glass.jpg');
    const red_bulb_mat = new THREE.MeshBasicMaterial({color:0xc40000,map:glass});
    const red_bulb = new THREE.Mesh(red_bulb_geo, red_bulb_mat);

    red_bulb.scale.z=1.5;
    red_bulb.position.set(27,25,-48.5);
    scene.add(red_bulb);

    //Window
    const window_geo = new THREE.BoxGeometry(0.3,5,10);
    const window_mat = new THREE.MeshPhongMaterial({map:glass,transparent:true,opacity:0.5});
    const window = new THREE.Mesh(window_geo,window_mat);

    window.position.set(-49.5,43,40);
    scene.add(window);

    //Barrel
    const barrel_geo = new THREE.CylinderGeometry(4,4,10,32);
    const rusty_metal2 = new THREE.TextureLoader().load('../assets/textures/drum.jpg');
    const barrel_mat = new THREE.MeshPhysicalMaterial({map: rusty_metal2});
    const barrel = new THREE.Mesh(barrel_geo,barrel_mat);

    barrel.castShadow = true;
    barrel.receiveShadow = true;
    barrel.position.set(-45,5,38);
    scene.add(barrel);

    const barrel2 = barrel.clone();
    barrel2.position.set(-40,5,45);
    barrel2.rotation.y = -2;
    scene.add(barrel2);

    const barrel3 = barrel.clone();
    barrel3.position.set(-22,5,-26);
    barrel3.rotation.y = -2;
    scene.add(barrel3);

    const barrel4 = barrel.clone();
    barrel4.position.set(45,5,-45);
    barrel4.rotation.y = -2.5;

    barrel.rotation.y = -1;
    scene.add(barrel4);
}

function animate() {
requestAnimationFrame( animate );

controls.update();

cube.rotation.x += 0.005;
cube.rotation.y += 0.005;

renderer.render( scene, camera );
};

animate();