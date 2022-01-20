/*
INFO LÄS README.txt

Källor för lite info
https://en.wikipedia.org/wiki/L-system#Types_of_L-systems
https://codesandbox.io/s/fraktal-generator-forked-g76j8?file=/sketch.js
http://paulbourke.net/fractals/lsys/
https://www.sidefx.com/docs/houdini/nodes/sop/lsystem.html
http://www1.biologie.uni-hamburg.de/b-online/e28_3/lsys.html
https://www.kevs3d.co.uk/dev/lsystems/
https://piratefsh.github.io/p5js-art/public/lsystems/

*/

//hur snabbt den animerar
let animatespeed = 100;
//hur snabbt färgen ändras på alternativ 6
let colorspeed = 300;
//random variablar
let arr = ["F", "F", "+", "-"];
let hello = ["", "", "", "", ""];
//lite variablar
let genKnapp;
//färg variabel mätare
let color_n = 0;
let generation = 0;
let maxGeneration = 5;
let längd;
let angle;

let rules1 = "";
let rules2 = "";

//göm från början
document.getElementById("göm7").style.visibility = "hidden";
document.getElementById("göminfo").style.visibility = "hidden";
document.getElementById("göminfotext").style.visibility = "hidden";

//color
let r = 255,
  g = 0,
  b = 0;
//första load
let axiom = "F+F+F+F";
let rules = [
  {
    in: "F",
    out: "F+F-F-FF+F+F-F",
  },
];

//save button för egna input på fraktaler
const spara = document.getElementById("spara");

spara.addEventListener("click", function () {
  let axiom2 = document.getElementById("axiom").value;
  let stringrules = document.getElementById("rules2").value;
  if (stringrules.includes("=")) {
    const arrules = stringrules.split("=");
    rules1 = arrules[0];
    rules2 = arrules[1];
  }
  if (axiom2.length <= 0) {
    alert("OBS: Du har ingen AXIOM");
  }
  if (!stringrules.includes("=")) {
    alert("OBS: Du måste ha ett (=) i RULES");
  }
  if (rules1.length >= 2 || rules1.length <= 0) {
    alert("OBS: Du måste ha ETT tecken före (=) i RULES");
  }
  if (rules2.length <= 0) {
    alert("OBS: Du har inga RULES efter (=)");
  }
  if (!axiom2.includes(rules1)) {
    alert(
      "OBS: Ditt tecken i RULES före (=) har inte något tecken som förekommer i AXIOMEN"
    );
  }
  confirm(
    "OBS: Tryck på DJUP för att se din fraktal\n" +
      "Axiom: " +
      axiom2 +
      "\nRules in: " +
      rules1 +
      "\nRules out: " +
      rules2
  );

  axiom = axiom2;
  rules = [
    {
      in: rules1,
      out: rules2,
    },
  ];
});

//göm UI
let hidden = false;
function action() {
  hidden = !hidden;
  if (hidden) {
    document.getElementById("göm1").style.visibility = "hidden";
    document.getElementById("göm2").style.visibility = "hidden";
    document.getElementById("göm3").style.visibility = "hidden";
    document.getElementById("göm4").style.visibility = "hidden";
    document.getElementById("göm5").style.visibility = "hidden";
    document.getElementById("göm6").style.visibility = "hidden";
    if (document.getElementById("göm7").style.visibility === "visible") {
      document.getElementById("göm7").style.visibility = "hidden";
    }
  } else {
    document.getElementById("göm1").style.visibility = "visible";
    document.getElementById("göm2").style.visibility = "visible";
    document.getElementById("göm3").style.visibility = "visible";
    document.getElementById("göm4").style.visibility = "visible";
    document.getElementById("göm5").style.visibility = "visible";
    document.getElementById("göm6").style.visibility = "visible";
    document.getElementById("göm7").style.visibility = "visible";
  }
}
let info_n = 0;
let infoknapp = document.getElementById("infoknapp");
let hiddeninfo = true;
function actioninfo() {
  hiddeninfo = !hiddeninfo;
  if (hiddeninfo) {
    document.getElementById("göminfo").style.visibility = "hidden";
    document.getElementById("göminfotext").style.visibility = "hidden";
  } else {
    document.getElementById("göminfo").style.visibility = "visible";
    document.getElementById("göminfotext").style.visibility = "visible";
  }
  info_n++;
  if (info_n === 1) {
    infoknapp.className = "knappon";
  }
  if (info_n === 2) {
    infoknapp.className = "knapp";
    info_n = 0;
  }
}

let hidden1 = true;
function example() {
  hidden1 = !hidden1;
  if (hidden1) {
    document.getElementById("göm7").style.visibility = "hidden";
  } else {
    document.getElementById("göm7").style.visibility = "visible";
  }
}

let sentence = axiom;

//start funktion
function setup() {
  createCanvas(windowWidth - 40, windowHeight - 25);
  angle = radians(vinkel.value);
  längd = segment_n * 3;
  turtle();
  drawGUI();
}

//color problem
setInterval(function () {
  if (r > 0 && b <= 0) {
    r -= 10;
    g += 10;
  }
  if (g > 0 && r <= 0) {
    g -= 10;
    b += 10;
  }
  if (b > 0 && g <= 0) {
    r += 10;
    b -= 10;
  }
  $("#color").text("rgb(" + r + "," + g + "," + b + ")");
  $("#color").css("color", "rgb(" + r + "," + g + "," + b + ")");
  turtle();
}, colorspeed);

function generate() {
  längd = segment_n * 3;

  let nextSentence = "";

  for (let i = 0; i < sentence.length; i++) {
    let found = false;
    let currentChar = sentence.charAt(i);

    for (let j = 0; j < rules.length; j++) {
      if (currentChar === rules[j].in) {
        found = true;
        nextSentence += rules[j].out;
        break;
      }
    }
    if (!found) {
      nextSentence += currentChar;
    }
  }
  sentence = nextSentence;
  turtle();
}
function turtle() {
  console.log("bruh color");
  resetMatrix();
  background(0);
  //color
  if (color_n === 0) {
    stroke(255); //white
  }
  if (color_n === 1) {
    stroke(0, 0, 255); //blue
  }
  if (color_n === 2) {
    stroke(0, 128, 0); //green
  }
  if (color_n === 3) {
    stroke(255, 0, 0); //red
  }
  if (color_n === 4) {
    stroke(255, 165, 0); //orange
  }
  if (color_n === 5) {
    stroke(r, g, b); //rgb flera färger
  }
  //mitten på skärmen
  translate(window.innerWidth / 2, window.innerHeight / 2);

  for (let i = 0; i <= sentence.length; i++) {
    let currentChar = sentence.charAt(i);

    if (currentChar === "F") {
      line(0, 0, 0, -längd);
      translate(0, -längd);
    } else if (currentChar === "+") {
      rotate(angle);
    } else if (currentChar === "-") {
      rotate(-angle);
    } else if (currentChar === "[") {
      push();
    } else if (currentChar === "]") {
      pop();
    }
  }
}

let djupknapp = document.getElementById("djupknapp");
djupknapp.onclick = function () {
  if (generation < maxGeneration) {
    generate();
  }
  generation++;
  if (generation > 5) {
    generation = 1;
    sentence = axiom;
    generate();
  }
  let generationout = document.getElementById("generation-out");
  generationout.innerHTML = generation;
  let axiomout = document.getElementById("axiom-out");
  axiomout.innerHTML = axiom;
  let rules1out = document.getElementById("rules1-out");
  rules1out.innerHTML = rules[0].in;
  let rules2out = document.getElementById("rules2-out");
  rules2out.innerHTML = rules[0].out;
};

//skriver ut värden och saker på skärmer för användaren
function drawGUI() {
  genKnapp = createButton("DJUP");
  genKnapp.size(85, 20);
  genKnapp.position(-2000, 260);
  genKnapp.mousePressed(function () {
    if (generation < maxGeneration) {
      generate();
    }
    generation++;
    if (generation > 5) {
      generation = 1;
      sentence = axiom;
      generate();
    }
    let generationout = document.getElementById("generation-out");
    generationout.innerHTML = generation;
    let axiomout = document.getElementById("axiom-out");
    axiomout.innerHTML = axiom;
    let rules1out = document.getElementById("rules1-out");
    rules1out.innerHTML = rules[0].in;
    let rules2out = document.getElementById("rules2-out");
    rules2out.innerHTML = rules[0].out;
  });
}

//!Exemepel knappar

//Andra rad
animera_n = 0;

let c1 = 0;
let t;
let timer_is_on = 0;

//Random funktion
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let fraktal = (function () {
  //js funktion
  const c = document.getElementById("canvas");
  let ctx = c.getContext("2d");

  //får bredden och höjden av hemsidan du har på din enhet
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  //!SLIDERS
  let vinkel = document.getElementById("vinkel");
  let vinkelout = document.getElementById("vinkel-out");
  vinkelout.innerHTML = vinkel.value;

  //gör saker med vinkel
  vinkel.oninput = function () {
    vinkelout.innerHTML = this.value;
    update();
  };

  //SEGMENT
  let segment = document.getElementById("längdknapp");
  segment.onclick = function () {
    segment_n++;
    if (segment_n === 6) {
      segment_n = 1;
    }
    document.getElementById("segment_n").innerHTML = segment_n;
    update();
  };
  //!RESET
  let reset = document.getElementById("resetknapp");
  reset.onclick = function () {
    sentence = axiom;
    turtle();
    vinkel.value = 90;
    segment_n = 3;
    generation = 5;
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "F+F-F-FF+F+F-F",
      },
    ];
    //stönga av animera
    clearTimeout(t);
    animera.className = "knapp";
    c1 = 0;
    animera_n = 0;
    //update this
    update();
  };

  //!RANDOM
  let random = document.getElementById("randomknapp");
  random.onclick = function () {
    for (let i = 0; i < 8; i++) {
      hello[i] = arr[Math.floor(Math.random() * arr.length)];
    }
    axiom = "F" + hello[5] + hello[6] + hello[7];
    rules = [
      {
        in: "F",
        out:
          "F" +
          hello[0] +
          hello[1] +
          hello[2] +
          hello[3] +
          hello[4] +
          hello[5] +
          hello[6] +
          hello[7],
      },
    ];
    vinkel.value = getRandomInt(0, 361);
    segment_n = 4;
    generation = 3;
    update();
  };

  //!ANIMERA

  let animera = document.getElementById("animeraknapp");
  animera.onclick = function () {
    animera_n++;
    if (animera_n === 1) {
      timedCount();
      animera.className = "knappon";
    }
    if (animera_n === 2) {
      clearTimeout(t);
      animera.className = "knapp";
      c1 = 0;
      animera_n = 0;
    }
  };
  //!COLOR

  let color = document.getElementById("colorknapp");
  color.onclick = function () {
    color_n++;
    if (color_n === 6) {
      color_n = 0;
    }
    update();
  };

  timedCount = function () {
    let v = parseInt(vinkel.value);
    v = v + 1;

    if (v === 361) {
      v = 0;
    }
    //updatera UI
    vinkel.value = v;
    vinkelout.innerHTML = vinkel.value;
    //vänta
    t = setTimeout(timedCount, animatespeed);
    update();
  };

  //!Uppdatera allt/////////////////////////////
  let update = function () {
    //skriver ut de nya väderna
    setup();

    //animeringshastighet gör det snabbare när det är närare visa värden
    if (
      (vinkel.value > 150 && vinkel.value < 220) ||
      vinkel.value > 330 ||
      vinkel.value < 30
    ) {
      animatespeed = 50;
    }
    if (
      (vinkel.value > 30 && vinkel.value < 150) ||
      (vinkel.value > 220 && vinkel.value < 330)
    ) {
      animatespeed = 100;
    }
    //Updaterar sliders och bilder/knappar
    vinkelout.innerHTML = vinkel.value;
    document.getElementById("färg_n").innerHTML = color_n + 1;
    document.getElementById("segment_n").innerHTML = segment_n;
    let generationout = document.getElementById("generation-out");
    generationout.innerHTML = generation;

    let axiomout = document.getElementById("axiom-out");
    axiomout.innerHTML = axiom;
    let rules1out = document.getElementById("rules1-out");
    rules1out.innerHTML = rules[0].in;
    let rules2out = document.getElementById("rules2-out");
    rules2out.innerHTML = rules[0].out;
    //sparar hashen för hemsidan
    save();
  };

  //!SAVE OCH LOAD
  let save = function () {
    let ruleid =
      "#" +
      vinkel.value +
      "," +
      segment_n +
      "," +
      generation +
      "," +
      axiom +
      "," +
      rules[0].in +
      "," +
      rules[0].out;
    window.location = String(window.location).replace(/\#.*$/, "") + ruleid;
  };

  let load = function () {
    let d = window.location.toString();
    if (d.includes("#")) {
      const myArr = d.split("#");
      const test = myArr[1].split(",");
      //Sliders
      vinkel.value = test[0];
      //Knappar
      segment_n = test[1];
      generation = test[2];
      axiom = test[3];
      rules[0].in = test[4];
      rules[0].out = test[5];

      if (
        vinkel.value == undefined ||
        segment_n === undefined ||
        generation === undefined ||
        axiom === undefined ||
        rules[0].in === undefined ||
        rules[0].out === undefined
      ) {
        //Sliders
        vinkel.value = 40;
        //Knappar
        segment_n = 1;
        generation = 1;
        let axiom = "F+F+F+F";
        let rules = [
          {
            in: "F",
            out: "F+F-F-FF+F+F-F",
          },
        ];
      }
    } else {
      //Sliders
      vinkel.value = 40;
      //Knappar
      segment_n = 1;
      //Knappar
      generation = 1;
      let axiom = "F+F+F+F";
      let rules = [
        {
          in: "F",
          out: "F+F-F-FF+F+F-F",
        },
      ];
    }
    save();
  };
  //!START
  load();

  //!EXEMPEL
  //Exemplerna är ifrån http://paulbourke.net/fractals/lsys/
  //save button för egna input på fraktaler
  const Kochcurve = document.getElementById("Kochcurve");
  Kochcurve.addEventListener("click", function () {
    axiom = "-F";
    rules = [
      {
        in: "F",
        out: "F+F--F+F",
      },
    ];
    vinkel.value = 60;
    segment_n = 1;
    generation = 5;
    update();
  });

  const Sierpinskisquare = document.getElementById("Sierpinskisquare");
  Sierpinskisquare.addEventListener("click", function () {
    axiom = "F+XF+F+XF";
    rules = [
      {
        in: "X",
        out: "XF-F+F-XF+F+XF-F+F-X",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });

  const LSystemBushes1 = document.getElementById("L-System Bushes 1");
  LSystemBushes1.addEventListener("click", function () {
    axiom = "F";
    rules = [
      {
        in: "F",
        out: "FF+[+F-F-F]-[-F+F+F]",
      },
    ];
    vinkel.value = 22.5;
    segment_n = 1;
    generation = 5;
    update();
  });

  const LSystemBushes2 = document.getElementById("L-System Bushes 2");
  LSystemBushes2.addEventListener("click", function () {
    axiom = "F";
    rules = [
      {
        in: "F",
        out: "F[+FF][-FF]F[-F][+F]F",
      },
    ];
    vinkel.value = 35;
    segment_n = 1;
    generation = 5;
    update();
  });

  const Board = document.getElementById("Board");
  Board.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "FF+F+F+F+FF",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });

  const Triangle = document.getElementById("Triangle");
  Triangle.addEventListener("click", function () {
    axiom = "F+F+F";
    rules = [
      {
        in: "F",
        out: "F-F+F",
      },
    ];
    vinkel.value = 120;
    segment_n = 1;
    generation = 5;
    update();
  });
  const Crystal = document.getElementById("Crystal");
  Crystal.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "FF+F++F+F",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const VonKochSnowflake = document.getElementById("Von Koch Snowflake");
  VonKochSnowflake.addEventListener("click", function () {
    axiom = "F++F++F";
    rules = [
      {
        in: "F",
        out: "F-F++F-F",
      },
    ];
    vinkel.value = 60;
    segment_n = 1;
    generation = 5;
    update();
  });
  const Tiles = document.getElementById("Tiles");
  Tiles.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "FF+F-F+F+FF",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });

  const Rings = document.getElementById("Rings");
  Rings.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "FF+F+F+F+F+F-F",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const Lévycurve = document.getElementById("Lévy curve");
  Lévycurve.addEventListener("click", function () {
    axiom = "F";
    rules = [
      {
        in: "F",
        out: "+F--F+",
      },
    ];
    vinkel.value = 45;
    segment_n = 1;
    generation = 5;
    update();
  });
  const HexagonalGosper = document.getElementById("Hexagonal Gosper");
  HexagonalGosper.addEventListener("click", function () {
    axiom = "XF";
    rules = [
      {
        in: "X",
        out: "X+YF++YF-FX--FXFX-YF+",
      },
      {
        in: "Y",
        out: "-FX+YFYF++YF+FX--FX-Y",
      },
    ];
    vinkel.value = 60;
    segment_n = 1;
    generation = 5;
    update();
  });
  const DragonCurve = document.getElementById("Dragon Curve");
  DragonCurve.addEventListener("click", function () {
    axiom = "FX";
    rules = [
      {
        in: "X",
        out: "X+YF+",
      },
      {
        in: "Y",
        out: "-FX-Y",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const SierpinskiArrowhead = document.getElementById("Sierpinski Arrowhead");
  SierpinskiArrowhead.addEventListener("click", function () {
    axiom = "YF";
    rules = [
      {
        in: "X",
        out: "YF+XF+Y",
      },
      {
        in: "Y",
        out: "XF-YF-X",
      },
    ];
    vinkel.value = 60;
    segment_n = 1;
    generation = 5;
    update();
  });
  const QuadraticSnowflake = document.getElementById("Quadratic Snowflake");
  QuadraticSnowflake.addEventListener("click", function () {
    axiom = "F";
    rules = [
      {
        in: "F",
        out: "F-F+F+F-F",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const PeanoCurve = document.getElementById("Peano Curve");
  PeanoCurve.addEventListener("click", function () {
    axiom = "X";
    rules = [
      {
        in: "X",
        out: "XFYFX+F+YFXFY-F-XFYFX",
      },
      {
        in: "Y",
        out: "YFXFY-F-XFYFX+F+YFXFY",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const snowflake = document.getElementById("Snowflake");
  snowflake.addEventListener("click", function () {
    axiom = "F-F-F-F-F";
    rules = [
      {
        in: "F",
        out: "F-F++F+F-F-F",
      },
    ];
    vinkel.value = 72;
    segment_n = 1;
    generation = 5;
    update();
  });
  const KrishnaAnklets = document.getElementById("Krishna Anklets");
  KrishnaAnklets.addEventListener("click", function () {
    axiom = "-X--X";
    rules = [
      {
        in: "X",
        out: "XFX--XFX",
      },
    ];
    vinkel.value = 45;
    segment_n = 1;
    generation = 5;
    update();
  });
})();