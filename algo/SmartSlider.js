

function variables(){
  hauteur = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  largeur = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  texts = document.getElementsByClassName("text");
  dots = document.getElementsByClassName("dot");
  slides_container =  document.getElementsByClassName("slideshow-container")[0];
  menu_container =  document.getElementsByClassName("menu-container")[0];
  topTitle =  document.getElementsByClassName("topTitle")[0];
  title = document.getElementsByClassName("title")[0];
  burger =  document.getElementById("burger");
  bar = document.getElementsByClassName("barre");
  bar_croix = document.getElementsByClassName("barre croix");
  sidenav = document.getElementById("mySidenav");
  sidenav_close = document.getElementsByClassName("sidenav closed")[0];
  sidenav_open = document.getElementsByClassName("sidenav opened")[0];
  slides =  document.getElementsByClassName("mySlides");
  buttons =  document.getElementsByClassName("buttons")[0];
  pics = document.getElementsByClassName("slide");
  i = 0;
  ancientIndex = 0;
  newIndex = 0;
  timeFraction = 0;
  finishedAnimation = true;
  pauseId = 0;
  sens = "next";
  delay = 3; //temps pour chaque slide en secondes
  pause = false;
  forcePause = false;
  time = 3; //temps de la transition
  delay += time;
  delay *=1000;
  time *= 1000;
  
  ratioImages =  1.6;
  ratioEcran = largeur/hauteur;
  picFrac = 
  [// x  y
    [71,40], //image 1
    [55,20], //image 2
    [70,50], //image 3
    [39,45]  //image 4
  ];
}

function menu(){
  if (topTitle.classList[1] == "closed") {
    topTitle.classList.remove("closed");
    topTitle.classList.add("opened");
    sidenav.classList.remove("closed");
    sidenav.classList.add("opened");
    sidenav_close.style.right = "-0.1em";
    title.style.color = "#a7a7a7";
    for (var i = 0; i<3; i++){
      bar[i].classList.remove("burgered");
      bar[i].classList.add("croix");
    }
    console.log(ratioEcran);
    if (1>ratioEcran){
      console.log("ee");
      bar_croix[0].style.scale = "1.08";
      bar_croix[2].style.scale = "1.05";
    }

  }else{
    if (topTitle.classList[1] == "opened") {
      topTitle.classList.remove("opened");
      topTitle.classList.add("closed");
      sidenav.classList.remove("opened");
      sidenav.classList.add("closed");
      sidenav_close.style.right = "-"+(sidenav.clientWidth+1)+"px";
      title.style.color = "white"
      for (var i = 0; i<3; i++){
        bar[i].classList.add("burgered");
        bar[i].classList.remove("croix");
      }
      
    }
  }  
}

function background_text(n){
  n-=1;
  if (texts[n].classList[1] == "inactive") {
    texts[n].classList.remove("inactive");
    texts[n].classList.add("active");
  }else{
    if (texts[n].classList[1] == "active") {
      texts[n].classList.remove("active");
      texts[n].classList.add("inactive");
      
    }
  }  
}

var slideNumber = 1;

//PROCESSUS DE DEMARRAGE


if (document.readyState === 'complete') {
  variables();
  redimension();
  setInterval("nextInterval();",delay);
  setInterval("pauseId = 0; pause = false;", 10000);
  firstSlide();
  } else {
  document.addEventListener('DOMContentLoaded', function() {
   variables();
   redimension();
   setInterval("nextInterval();",delay);
   setInterval("pauseId = 0; pause = false;", 10000);
   firstSlide();
  });
}



//AJUSTEMENTS RESPONSIVE

function redimension() {

  /* var ratioImages =  1.6; //valeur du ratio des images (identiques entre eux)

  //Définition des axes x et y de l'image sur lesquelles l'image rognée sera centrée
  //valeurs en % de l'image depuis le haut (axe x) ou depuis la gauche (axe y)
  var picFrac = 
  [// x  y
    [71,40], //image 1
    [55,20], //image 2
    [70,50], //image 3
    [39,45]  //image 4
  ]; */

  //récupération de la hauteur et de la largeur de l'écran
  
  slides_container.style.height = hauteur + "px";
  slides_container.style.width = largeur + "px";
  topTitle.style.width = largeur + "px";
  buttons.style.width = largeur + "px";
  
  

  

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
    
    document.getElementsByClassName("next")[0].style.fontSize = "3em";
    document.getElementsByClassName("prev")[0].style.fontSize = "3em";
    topTitle.style.fontSize = "3.5em";
    burger.style.fontSize = "3em";
    sidenav.style.fontSize = "3em";
    
    
    for (i = 0; i < texts.length; i++) {
      texts[i].style.fontSize = "5em";
      dots[i].style.height = "2em";
      dots[i].style.width = "2em";
    }
    document.getElementById("footer").style.fontSize = "20px";
    document.getElementById("line").size = "2";
    document.getElementById("line").width = "50%";
    
  
  }
  sidenav.style.paddingTop = (topTitle.clientHeight)+"px";
  sidenav_close.style.right = "-"+(sidenav.clientWidth+1)+"px";
  sidenav.style.transition= "right 0.3s ease , background 0.4s ease";
}



//GESTION DES SLIDES





// Next/previous slide 
function changeSlides(n/* seules les valeurs -1 et 1 sont acceptées*/) {
  n = n%slides.length;
  ancientIndex = slideNumber-1;
  slideNumber = (slideNumber+n)%slides.length; 
  if (slideNumber == 0){ slideNumber = slides.length}
  newIndex = slideNumber-1;
  moveSlides();

}

//fonction pour aller directement à une slide
function goSlide(n) {
  pause = true;
  pauseId += 1;

  if (n!=slideNumber) {
    slides[newIndex].style.display = "none";
    ancientIndex = slideNumber-1;
    slideNumber = n
    newIndex = n-1; 
    if (slideNumber == 0){
      slideNumber = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      dots[i].style.transition = "background-color 0s ease";
    }
    dots[ancientIndex].classList.remove("active");
    dots[newIndex].classList.add("active");
    timeFraction  = 1;
    timed = 0;
    slides[newIndex].style.display = "block";
    slides[ancientIndex].style.display = "none";
    
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
function moveSlides() {
 
  var largeur = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  
  for (i = 0; i < slides.length; i++) {
    slides[ancientIndex].style.left = '0px';
    slides[i].style.display = "none";
    dots[i].style.transition = "background-color "+time/1000+"s ease";
  }
  slides[newIndex].style.display = "inline-block"; 
  slides[ancientIndex].style.display = "inline-block";
  dots[ancientIndex].classList.remove("active");
  dots[newIndex].classList.add("active");


  animate({
      duration: time,
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
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }
  slides[0].style.display = "inline-block";
  dots[0].classList.add("active");

}

function nextInterval() {
  sens = "next";
  if (!pause && !forcePause){
    if (finishedAnimation) {
      finishedAnimation = false;
    changeSlides(1);
    }
  }
}

function nextButton() {
  if (finishedAnimation) {
    finishedAnimation = false;
    sens = "next";
    pause = true;
    pauseId += 1;
    time*=0.5;
    changeSlides(1);
    time*=2;
    setTimeout("if(pauseId == "+pauseId+"){pause = false;}",delay);
  }
}

function previousButton() {
  if (finishedAnimation) {
    finishedAnimation = false;
    sens = "prev";
    pause = true;
    pauseId += 1;
    time*=0.5;
    changeSlides(-1);
    time*=2;
    setTimeout("if(pauseId == "+pauseId+"){pause = false;}",delay);
  }
}

function abs(n) {
  if (n<0) {n = -n;}
  return n
}


function animate(options) {
  start = performance.now();
  requestAnimationFrame(function animate(timed){
    // timeFraction от 0 до 1
    timeFraction = (timed-start)/options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = options.timing(timeFraction)
    
    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }else{
      for (i = 0; i < slides.length; i++) {
        //dots[i].style.transition = "transition: background-color "+time+"s ease;"
        slides[i].style.left = '0px';
        slides[i].style.display = "none";
      }
      slides[newIndex].style.display = "inline-block";
      slides[newIndex].style.left = '0px';
      slides[newIndex].style.display = "inline-block";
      finishedAnimation = true;
      
    }
});
    
}

