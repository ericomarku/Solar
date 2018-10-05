let Planeter = [];
let DPlaneter = [];
let Moon = [];
let JupiterMoons = [];
let Ring = [];
let Star = [];

let Sskale = 17*500;
let Pskale = 500;
let Dskale = 610000;
let MDskale = 17000;
let tskale = 365.256363004/360;
let bg = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  sun = new Sun(695700, 0, 255, 185, 0, PI);

  //mercury
  Planeter[0] = new StellarOjbect(2440, 69816900, 46001200, 0.01, 7.01, 0, 88, 50, 50, 50);

  //venus
  Planeter[1] = new StellarOjbect(6052, 108941850, 107476002, 177.3, 3.39, 0, 225, 240, 200, 90);

  //earth
  Planeter[2] = new StellarOjbect(6371, 152100000, 147095000, 23.26, 0, 0, 365.256363004, 0, 80, 240);
  //moon
  Moon[0] = new Moons(2, 1737, 405400, 362600, 28.7, 0, 27.321661, 200, 200, 200);

  //mars
  Planeter[3] = new StellarOjbect(3390, 249228729, 206644545, 25.19, 1.85, 0, 687, 155, 40, 40);

  //jubiter
  Planeter[4] = new StellarOjbect(71492, 816081456, 740742598, 3.13, 1.31, 0, 4330, 250, 150, 100);
  //moon
  //Metis
  JupiterMoons[0] = new Moons(4, 21.5, 128026, 127974, 0.06, 0, 0.294780, 200, 200, 200)
  //adrastea
  JupiterMoons[1] = new Moons(4, 8.2, 0, 0, 0.03, 0, 0.29826, 200, 200, 200)
  //Amalthea
  JupiterMoons[2] = new Moons(4, 83.5, 182840, 181150, 0.374, 0, 0.49817943, 200, 200, 200)
  //Thebe
  JupiterMoons[3] = new Moons(4, 49.3, 226000, 218000, 1.076, 0, 0.674536, 200, 200, 200)
  //io
  JupiterMoons[4] = new Moons(4, 1821.6, 423400, 420000, 0.05, 0, 1.769137786, 240, 200, 90)
  //Europa
  JupiterMoons[5] = new Moons(4, 1560.8, 676938, 664862, 0.470, 0, 3.551181, 155, 100, 40)
  //ganymede
  JupiterMoons[6] = new Moons(4, 2634.1, 1071600, 1069200, 0.2, 0, 7.15455296, 155, 100, 40)
  //callisto
  JupiterMoons[7] = new Moons(4, 2410.3, 1897000, 1869000, 0.192, 0, 16.6890184, 155, 100, 40)

  //saturn
  Planeter[5] = new StellarOjbect(60268, 1503983450, 1349467376, 26.73, 2.49, 0, 10759, 240, 180, 70);
  //ringe
  Ring[0] = new Rings(135000, 5, 250, 180, 70);

  //uranus
  Planeter[6] = new StellarOjbect(25559, 3006389405, 2735555035, 97.77, 0.77, 0, 30686, 0, 150, 250);
  //ringe
  Ring[1] = new Rings(51149, 6, 0, 150, 250);

  //neptun
  Planeter[7] = new StellarOjbect(24764, 4536874315, 4459631485, 28.32, 1.77, 0, 60189, 0, 0, 150);

  //dvægeplaneter
  //pluto
  DPlaneter[0] = new StellarOjbect(1188*10, 7375927931, 4436824613, 122.53, 17.16, 0, 90610.56, 200, 200, 200);

  for (var i = 0; i < 500; i++) {
    var theta = random(0, TWO_PI);
    var phi = random(0, TWO_PI);
    Star[i] = new Stars(4436824613/Dskale, theta, phi);
  }
}

function draw() {
  background(bg);

  orbitControl();

  pointLight(255, 255, 255, 0, 0, -1000);
  //ambientLight(50);


  sun.show();
  sun.move();

  for(planet of Planeter){
    planet.show();
    planet.move();
  }
  for(dplanet of DPlaneter){
    dplanet.show();
    dplanet.move();
  }
  for(moon of Moon){
    moon.show();
    moon.move();
  }
  for(jmoon of JupiterMoons){
    jmoon.show();
    jmoon.move();
  }
  for(ring of Ring){
    ring.show();
  }
  for(star of Star){
    star.show();
  }
}


class Sun {
  constructor(radius, spin, r, g, b, c) {
    this.radius = radius/Sskale;
    this.spin = spin;
    this.red = r;
    this.green = g;
    this.blue = b;
    this.colorchange = c;
  }

  move() {
    this.colorchange = this.colorchange + (PI/180);
  }

  show() {
    push();
      noStroke()
      translate(0, 0, 0)
      fill(this.red, this.green + 20 * sin(this.colorchange), this.blue);
      sphere(this.radius);
    pop();
  }
}

class StellarOjbect {
  constructor(radius, Aphelion, Perihelion, at, ot, spin, orbitalperiod, r, g, b) {
    this.radius = radius/Pskale;
    this.aphelion = Aphelion/Dskale;
    this.perihelion = Perihelion/Dskale;
    this.semimajoraxis = -(this.aphelion + this.perihelion) / 2 - sun.radius;
    this.orbitalperiod = orbitalperiod;
    this.axialtilt = at;
    this.orbitaltilt = ot;
    this.spin = spin;
    this.angle = 0;
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  move() {
    this.angle = this.angle + (365 * PI/180)/(this.orbitalperiod * tskale);
  }

  show() {
    this.x = this.semimajoraxis * sin(this.angle) + (this.aphelion - this.perihelion);
    this.y = this.semimajoraxis * tan(this.orbitaltilt * PI/180) * sin(this.angle) + (this.aphelion - this.perihelion) * cos(this.orbitaltilt * PI/180) * tan(this.orbitaltilt * PI/180);
    this.z = -sqrt((this.aphelion * this.perihelion)) * cos(this.angle);
    push();
    noStroke();
    translate(this.x, this.y, this.z);
    rotateZ(this.axialtilt * PI/180);
    ambientMaterial(this.red, this.green, this.blue);
    sphere(this.radius);
    pop();
    //push();
    //  noStroke();
    //  rotateX(PI/2);
    //  rotateY(this.orbitaltilt*PI/180);
    //  ambientMaterial(this.red, this.green, this.blue);
    //  torus(this.semimajoraxis, 0.5, 360, 5);
    //pop();
  }
}

class Moons {
  constructor(planet, radius, Aphelion, Perihelion, axialtilt, orbitaltilt, orbitalperiod, r, g, b) {
    this.planet = planet;
    this.radius = radius/Pskale;
    this.aphelion = Aphelion/MDskale;
    this.perihelion = Perihelion/MDskale;
    this.semimajoraxis = (this.aphelion + this.perihelion)/2;
    this.orbitalperiod = orbitalperiod;
    this.axialtilt = axialtilt;
    this.orbitaltilt = orbitaltilt;
    this.angle = 0;
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  move() {
    this.angle = this.angle + (365 * PI/180)/(this.orbitalperiod * tskale);
  }

  show() {
    this.x = this.semimajoraxis * sin(this.angle) + (this.aphelion - this.perihelion) + Planeter[this.planet].radius * sin(this.angle);
    this.y = this.semimajoraxis * tan(this.orbitaltilt * PI/180) * sin(this.angle) + (this.aphelion - this.perihelion) * cos(this.orbitaltilt * PI/180) * tan(this.orbitaltilt * PI/180);
    this.z = -sqrt((this.aphelion * this.perihelion)) * cos(this.angle) - Planeter[this.planet].radius * cos(this.angle);
    push();
    noStroke();
    translate(Planeter[this.planet].x, Planeter[this.planet].y, Planeter[this.planet].z);
    rotateZ((Planeter[this.planet].axialtilt - this.axialtilt) * PI/180);
    translate(this.x, this.y, this.z);
    ambientMaterial(this.red, this.green, this.blue);
    sphere(this.radius);
    pop();
  }
}

class Rings {
  constructor(radius, planet, r, g, b) {
    this.radius = radius/Pskale;
    this.planet = planet;
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  show() {
    push();
    noStroke();
    translate(Planeter[this.planet].x, Planeter[this.planet].y, Planeter[this.planet].z);
    rotateZ(Planeter[this.planet].axialtilt * PI/180);
    ambientMaterial(this.red, this.green, this.blue);
    cylinder(this.radius, 0.1, 200);
    pop();
  }
}

class Stars {
  constructor(distans, theta, phi) {
    this.theta = theta;
    this.phi = phi;
    this.distans = distans;
  }

  show() {
    push();
    noStroke();
    rotateX(this.theta);
    rotateY(this.theta);
    rotateZ(this.phi);
    translate(this.distans, 0, 0);
    ambientMaterial(255, 255, 255);
    sphere(5000/Pskale);
    pop();
  }
}
