let i;
let skip = true;
let speed = 1;
let finishedAnimation = true;
let pauseId = 0;
let sens = "next";
let delay = 3; //temps pour chaque slide en secondes
let pause = false;
let forcePause = false;
let time = 3; //temps de la transition
delay += time;
delay *=1000;
time *= 1000;
//PROCESSUS DE DEMARRAGE

if (document.readyState === 'complete') {
  redimension();
  setInterval("nextInterval();",delay);
  setInterval("pauseId = 0; pause = false;", 10000);
  firstSlide();
  } else {
  document.addEventListener('DOMContentLoaded', function() {
    redimension();
   setInterval("nextInterval();",delay);
   setInterval("pauseId = 0; pause = false;", 10000);
   firstSlide();
  });
}



//AJUSTEMENTS RESPONSIVE

function redimension() {

  var ratioImages =  1.6; //valeur du ratio des images (identiques entre eux)

  //Définition des axes x et y de l'image sur lesquelles l'image rognée sera centrée
  //valeurs en % de l'image depuis le haut (axe x) ou depuis la gauche (axe y)
  var picFrac = 
  [// x  y
    [71,40], //image 1
    [55,20], //image 2
    [70,50], //image 3
    [39,45]  //image 4
  ];

  //récupération de la hauteur et de la largeur de l'écran
  var hauteur = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var largeur = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //redimension du cadre du slider à la taille de l'écran
  var container =  document.getElementById("slideshow-container")
  var slides =  document.getElementsByClassName("mySlides")
  container.style.height = hauteur + "px";
  container.style.width = largeur + "px";
  
  var ratioEcran = largeur/hauteur;
  var pics = document.getElementsByClassName("slide");

  

  //rognage positionnement de l'image dans son cadre
   for (i = 0; i < pics.length; i++) {
    slides[i].style.height = hauteur + "px";
    slides[i].style.minWidth = largeur + "px";
    if (ratioImages>ratioEcran){
      pics[i].style.height = hauteur+"px";
      var margin = ((ratioImages/ratioEcran)-1)*picFrac[i][0]/100*largeur;
      pics[i].style.marginLeft = "-" + margin+"px";
    }else{
      pics[i].style.width = largeur+"px";
      var margin = ((ratioEcran/ratioImages)-1)*picFrac[i][1]/100*hauteur;
      pics[i].style.marginTop = "-" + margin+"px";
    }
  } 

  //pour agrandir les flèches et le texte sur les écrans de téléphone
  if (1>ratioEcran){
    for (i=0; i<2; i++){
      document.getElementsByClassName("but")[i].style.fontSize = "3em";
    }
    var texts = document.getElementsByClassName("text");
    for (i = 0; i < texts.length; i++) {
      texts[i].style.fontSize = "5em";
    }
    document.getElementById("footer").style.fontSize = "20px";
    document.getElementById("line").size = "2";
    document.getElementById("line").width = "50%";
  }
}



//GESTION DES SLIDES


let slideNumber = 1;
let slides = document.getElementsByClassName("mySlides");


// Next/previous slide 
function changeSlides(n/* seules les valeurs -1 et 1 sont acceptées*/) {
  n = n%document.getElementsByClassName("mySlides").length;
  ancientIndex = slideNumber-1;
  slideNumber = (slideNumber+n)%slides.length; 
  if (slideNumber == 0){ slideNumber = slides.length}
  newIndex = slideNumber-1;
  moveSlides(ancientIndex,newIndex);

}

//fonction pour aller directement à une slide
function goSlide(n) {
  pause = true;
  pauseId += 1;

  if (n!=slideNumber) {

    ancientIndex = slideNumber-1;
    slideNumber = n
    newIndex = n-1; 
    if (slideNumber == 0){
      slideNumber = slides.length;
    }
    slides[ancientIndex].style.display = "none";
    slides[newIndex].style.display = "block";
    /* if (abs(newIndex-ancientIndex)==1) {
      if (newIndex-ancientIndex < 0) {
        sens = "prev";
      }else{
        sens = "next";
      }
      moveSlides(ancientIndex,newIndex);
    }else{
      slides[ancientIndex].style.display = "none";
      slides[newIndex].style.display = "block";
    }*/
  } 
  setTimeout("if(pauseId == "+pauseId+"){pause = false;}",delay);
}

//fonction qui se charge de changer la slide de l'ancienne vers la nouvelle
function moveSlides(ancientIndex,newIndex) {
  console.log(finishedAnimation,"debut","from", ancientIndex+1, "to", newIndex+1, "speed =", speed);
 
  var largeur = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  for (i = 0; i < slides.length; i++) {
    slides[ancientIndex].style.left = '0px';
    slides[i].style.display = "none";
  }
  slides[newIndex].style.display = "inline-block"; 
  slides[ancientIndex].style.display = "inline-block"; 
  
  animate({
      duration: (time/speed),
      timing: function(x) {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2
        },
            draw: function draw(progress) {
              if (sens == "prev") {
                if(newIndex<ancientIndex) {
                  slides[ancientIndex].style.left = -1*largeur*(1-progress) + 'px';
                  slides[newIndex].style.left = -1*largeur*(1-progress) + 'px';
                }else{
                  slides[ancientIndex].style.left = progress*largeur + 'px';
                  slides[newIndex].style.left = -1*largeur*(2-progress) + 'px';
                }
              }else{
                if(newIndex>ancientIndex) {
                  slides[ancientIndex].style.left = -1*(progress*largeur) + 'px';
                  slides[newIndex].style.left = -1*(progress*largeur) + 'px';
                }else{
                  slides[ancientIndex].style.left = -1*(largeur+progress*largeur) + 'px';
                  slides[newIndex].style.left = largeur*(1-progress) + 'px';
                }
              }
            }
          });   
      }
  
  

//fonction qui permet de charger la première slide automatiquement
function firstSlide() {
  console.log("first");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[0].style.display = "inline-block";
}

function speedy(){
  console.log("speedy begin");
  skip = false;
  console.log("speed = ", speed);
  if (speed>slides.length){speed = slides.length ;}
  console.log("speed = ", speed);
  for(i=0; i<(speed-1); i++){
    console.log("chang le slide", i);
    changeSlides(sens=="prev"?-1 : 1);
    console.log("il faut attendre");
    setTimeout(time/speed+10);
    console.log("et rebelotte");
  }
  console.log("speedy touche à sa fin");
  skip = true;
  speed = 1;
  changeSlides(1);
  console.log("fini speedy");
}

function nextInterval() {
  console.log("AUTO");
  sens = "next";
  if (!pause && !forcePause){
    if (finishedAnimation) {
      finishedAnimation = false;
    changeSlides(1);
    }
  }
}

function nextButton() {
  pause = true;
  pauseId += 1;
  sens = "next";
  if (finishedAnimation && skip) {
    finishedAnimation = false;
    if(speed == 1){
      changeSlides(1);
    }
    
  }else{
    speed +=1 ;
  }
  setTimeout("if(pauseId == "+pauseId+"){pause = false;}",delay);
}

function previousButton() {
  if (finishedAnimation && skip) {
  finishedAnimation = false;
  sens = "prev";
  pause = true;
  pauseId += 1;
  if(speed!=1){
    changeSlides(-1);
  }else{
    console.log("speedy");
    speedy();
  }
  setTimeout("if(pauseId == "+pauseId+"){pause = false;}",delay);
  }else{
    speed +=1;
  }
}

function abs(n) {
  if (n<0) {n = -n;}
  return n
}


function animate(options) {
  var start = performance.now();
  requestAnimationFrame(function animate(timed){
    // timeFraction от 0 до 1
    var timeFraction = (timed-start)/options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = options.timing(timeFraction)
    
    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }else{
      
      slides[ancientIndex].style.left = '0px';
      slides[newIndex].style.display = "inline-block";
      for (i = 0; i < slides.length; i++) {
        if(i!=newIndex){
          slides[i].style.left = '0px';
          slides[i].style.display = "none";
        }
      }
      slides[newIndex].style.left = '0px';
      slides[newIndex].style.display = "inline-block";
      finishedAnimation = (skip);
      if (speed>1){
        console.log("speedy ->" , speed)
        speedy();
      }
      
      console.log("finishedAnimation  : ", finishedAnimation,"skip  : " ,skip,"speed  : ", speed);      
    }
});
//slides[newIndex].style.left = '0px';
    //slides[ancientIndex].style.display = "none";
    //slides[ancientIndex].style.left = '0px';
    
}