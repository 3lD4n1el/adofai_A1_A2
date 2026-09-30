
(function(){
  "use strict";

  /* ===== navegación ===== */
  var slides = document.querySelectorAll(".slide");
  var total = slides.length;
  var current = 0;
  var dotsBox = document.getElementById("dots");
  var bar = document.getElementById("progressBar");
  var runMark = document.getElementById("runMark");
  var counter = document.getElementById("counter");
  var beat = document.getElementById("beat");

  for (var i = 0; i < total; i++){
    var d = document.createElement("div");
    d.className = "dot";
    d.dataset.i = i;
    d.addEventListener("click", function(){ goTo(parseInt(this.dataset.i,10)); });
    dotsBox.appendChild(d);
  }
  var dots = dotsBox.querySelectorAll(".dot");

  function pad(n){ return (n<10?"0":"")+n; }
  function doBeat(){
    beat.classList.remove("go");
    void beat.offsetWidth;
    beat.classList.add("go");
  }
  function goTo(n, silent){
    if (n < 0 || n >= total) return;
    if (!silent && n !== current) doBeat();
    slides[current].classList.remove("active");
    current = n;
    slides[current].classList.add("active");
    var pct = ((current)/(total-1))*100;
    bar.style.width = pct + "%";
    runMark.style.left = pct + "%";
    runMark.textContent = (current % 2 === 0) ? "🔥" : "❄️";
    counter.innerHTML = "<b>"+pad(current+1)+"</b> / "+pad(total);
    for (var k = 0; k < total; k++){
      dots[k].classList.toggle("active", k === current);
      dots[k].classList.toggle("done", k < current);
    }
  }
  document.getElementById("prev").addEventListener("click", function(){ goTo(current-1); });
  document.getElementById("next").addEventListener("click", function(){ goTo(current+1); });
  document.addEventListener("keydown", function(e){
    if (e.target && e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") goTo(current+1);
    if (e.key === "ArrowLeft") goTo(current-1);
  });
  document.querySelectorAll("[data-go]").forEach(function(b){
    b.addEventListener("click", function(){ goTo(parseInt(this.dataset.go,10)); });
  });

  /* ===== retratos ===== */
  function planetaSVG(color, glow, cara){
    var boca = (cara === "feliz") ? "M40,66 Q50,74 60,66" : "M40,70 Q50,64 60,70";
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<ellipse cx='50' cy='58' rx='46' ry='16' fill='none' stroke='rgba(255,255,255,.22)' stroke-width='2'/>" +
      "<circle cx='50' cy='54' r='32' fill='"+color+"'/>" +
      "<circle cx='36' cy='40' r='7' fill='"+glow+"' opacity='.7'/>" +
      "<circle cx='64' cy='68' r='5' fill='"+glow+"' opacity='.5'/>" +
      "<ellipse cx='38' cy='50' rx='3.4' ry='4.6' fill='#0d0f1e'/><ellipse cx='62' cy='50' rx='3.4' ry='4.6' fill='#0d0f1e'/>" +
      "<path d='"+boca+"' stroke='#0d0f1e' stroke-width='2.6' fill='none' stroke-linecap='round'/>" +
      "<g stroke='"+glow+"' stroke-width='2.5' stroke-linecap='round'><path d='M8,96 L20,90'/><path d='M92,96 L80,90'/></g>" +
    "</svg>";
  }
  function metronomoSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<polygon points='50,10 84,108 16,108' fill='#c9a24a' stroke='#ffd23d' stroke-width='2.5'/>" +
      "<rect x='30' y='40' width='40' height='58' fill='#1a1c34'/>" +
      "<line x1='50' y1='96' x2='68' y2='40' stroke='#ff4ecb' stroke-width='4' stroke-linecap='round'/>" +
      "<rect x='60' y='52' width='14' height='9' fill='#ffd23d' transform='rotate(-18 67 56)'/>" +
      "<circle cx='50' cy='98' r='4' fill='#ffd23d'/>" +
      "<ellipse cx='40' cy='60' rx='2.6' ry='3.6' fill='#eef0ff'/><ellipse cx='54' cy='58' rx='2.6' ry='3.6' fill='#eef0ff'/>" +
    "</svg>";
  }
  function djSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<circle cx='50' cy='58' r='30' fill='#b6ff3d'/>" +
      "<circle cx='50' cy='58' r='11' fill='#0d0f1e'/><circle cx='50' cy='58' r='3.5' fill='#b6ff3d'/>" +
      "<path d='M14,58 a36,36 0 0 1 72,0' fill='none' stroke='#eef0ff' stroke-width='6' stroke-linecap='round'/>" +
      "<rect x='6' y='54' width='16' height='26' rx='7' fill='#ff4ecb'/>" +
      "<rect x='78' y='54' width='16' height='26' rx='7' fill='#ff4ecb'/>" +
      "<text x='24' y='30' font-size='16' fill='#3dd6ff' font-family='Rubik, sans-serif'>♪</text>" +
      "<text x='68' y='104' font-size='14' fill='#ffd23d' font-family='Rubik, sans-serif'>♫</text>" +
    "</svg>";
  }
  function notaSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<ellipse cx='38' cy='84' rx='20' ry='15' fill='#ffd23d' transform='rotate(-16 38 84)'/>" +
      "<rect x='54' y='18' width='7' height='66' fill='#ffd23d'/>" +
      "<path d='M61,18 q22,8 20,30 q-8,-16 -20,-16 Z' fill='#ffd23d'/>" +
      "<ellipse cx='32' cy='82' rx='3' ry='4' fill='#0d0f1e'/><ellipse cx='45' cy='80' rx='3' ry='4' fill='#0d0f1e'/>" +
      "<path d='M32,92 Q38,98 45,91' stroke='#0d0f1e' stroke-width='2.4' fill='none' stroke-linecap='round'/>" +
      "<path d='M14,40 l3,7 7,3 -7,3 -3,7 -3,-7 -7,-3 7,-3 Z' fill='#4ce8a0'/>" +
    "</svg>";
  }
  function glitchSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<rect x='24' y='34' width='52' height='52' fill='#7a3ad9'/>" +
      "<rect x='14' y='44' width='12' height='16' fill='#ff4ecb'/>" +
      "<rect x='74' y='60' width='14' height='12' fill='#3dd6ff'/>" +
      "<rect x='36' y='86' width='16' height='12' fill='#7a3ad9'/>" +
      "<rect x='56' y='86' width='12' height='16' fill='#ff4ecb'/>" +
      "<rect x='36' y='50' width='10' height='12' fill='#eef0ff'/><rect x='56' y='50' width='10' height='12' fill='#eef0ff'/>" +
      "<rect x='38' y='68' width='26' height='6' fill='#0d0f1e'/>" +
    "</svg>";
  }
  function estrellaSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<path d='M50,16 L61,46 L94,46 L67,64 L77,96 L50,77 L23,96 L33,64 L6,46 L39,46 Z' fill='#ffd23d'/>" +
      "<ellipse cx='42' cy='56' rx='3.2' ry='4.4' fill='#0d0f1e'/><ellipse cx='58' cy='56' rx='3.2' ry='4.4' fill='#0d0f1e'/>" +
      "<path d='M42,68 Q50,76 58,68' stroke='#0d0f1e' stroke-width='2.6' fill='none' stroke-linecap='round'/>" +
      "<circle cx='34' cy='64' r='3.5' fill='#ff9a6d' opacity='.6'/><circle cx='66' cy='64' r='3.5' fill='#ff9a6d' opacity='.6'/>" +
    "</svg>";
  }
  function espiralSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<path d='M50,58 m0,-36 a36,36 0 1,1 -25,62 a26,26 0 1,1 18,-46 a16,16 0 1,1 -10,28' fill='none' stroke='#3dd6ff' stroke-width='7' stroke-linecap='round'/>" +
      "<circle cx='50' cy='104' r='7' fill='#ff4ecb'/>" +
      "<circle cx='50' cy='22' r='6' fill='#ffd23d'/>" +
    "</svg>";
  }

  var roster = [
    { nm:"Fuego", cc:"#ff6b3d", wp:"🔥 el impaciente", fr:"<b>Casi siempre</b> llega tarde… ¡pero practica mucho!", kind:"pf", file:"fuego.png" },
    { nm:"Hielo", cc:"#3dd6ff", wp:"❄️ el tranquilo", fr:"<b>Nunca</b> pierde el ritmo. Escucha y respira.", kind:"ph", file:"hielo.png" },
    { nm:"Maestro Metrónomo", cc:"#ffd23d", wp:"⏱️ cuenta 1-2-3-4", fr:"<b>Siempre</b> dice: escucha, espera y gira.", kind:"metro", file:"metronomo.png" },
    { nm:"DJ Cometa", cc:"#b6ff3d", wp:"🎧 pone la música", fr:"<b>Todos los días</b> pone una canción nueva.", kind:"dj", file:"dj.png" },
    { nm:"Nota Perfecta", cc:"#ffd23d", wp:"💯 aparece si aciertas", fr:"<b>A menudo</b> aparece cuando practicas mucho.", kind:"nota", file:"nota.png" },
    { nm:"Glitch", cc:"#7a3ad9", wp:"👾 rompe el nivel", fr:"<b>A veces</b> cambia el ritmo. ¡Ten cuidado!", kind:"glitch", file:"glitch.png" },
    { nm:"Estrella Bonus", cc:"#ffd23d", wp:"⭐ nivel secreto", fr:"<b>Casi nunca</b> aparece: solo con rango S.", kind:"estrella", file:"estrella.png" },
    { nm:"Espiral", cc:"#3dd6ff", wp:"🌀 gira sin parar", fr:"Gira <b>dos veces</b> por compás. ¡Mareante!", kind:"espiral", file:"espiral.png" }
  ];
  var rBox = document.getElementById("roster");
  roster.forEach(function(c){
    var el = document.createElement("div");
    el.className = "chara";
    el.style.setProperty("--cc", c.cc);
    var av;
    if (c.kind === "pf"){ av = planetaSVG("#ff6b3d", "#ffd23d", "triste"); }
    else if (c.kind === "ph"){ av = planetaSVG("#3dd6ff", "#eaffff", "feliz"); }
    else if (c.kind === "metro"){ av = metronomoSVG(); }
    else if (c.kind === "dj"){ av = djSVG(); }
    else if (c.kind === "nota"){ av = notaSVG(); }
    else if (c.kind === "glitch"){ av = glitchSVG(); }
    else if (c.kind === "estrella"){ av = estrellaSVG(); }
    else { av = espiralSVG(); }
    el.innerHTML =
      "<div class=\"av\">" + av + "</div>" +
      "<div class=\"nm\">"+c.nm+"</div>" +
      "<div class=\"wp\">"+c.wp+"</div>" +
      "<div class=\"frase\"><span>"+c.fr+"</span></div>";
    var ph = document.createElement("img");
    ph.className = "photo";
    ph.alt = c.nm;
    ph.src = "personajes/" + c.file;
    ph.addEventListener("load", function(){ el.classList.add("hasPhoto"); });
    el.insertBefore(ph, el.firstChild);
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rBox.appendChild(el);
  });

  /* ===== vocabulario ===== */
  var vocab = [
    { emo:"🎵", es:"el ritmo", kr:"리듬", ej:"Hielo nunca pierde el ritmo.", qc:"var(--neon)" },
    { emo:"🎮", es:"el nivel", kr:"레벨", ej:"El nivel final es muy difícil.", qc:"var(--hielo)" },
    { emo:"🎶", es:"la canción", kr:"노래", ej:"El DJ pone una canción nueva.", qc:"var(--lima)" },
    { emo:"❌", es:"el error", kr:"실수", ej:"Un error y el nivel se rompe.", qc:"var(--fuego)" },
    { emo:"🌀", es:"girar", kr:"돌다", ej:"Los planetas giran juntos.", qc:"var(--hielo)" },
    { emo:"👆", es:"pulsar", kr:"누르다", ej:"Pulsa en el momento correcto.", qc:"var(--fuego)" },
    { emo:"⏳", es:"esperar", kr:"기다리다", ej:"Espera el beat y no corras.", qc:"var(--oro)" },
    { emo:"💪", es:"practicar", kr:"연습하다", ej:"Practico todos los días.", qc:"var(--lima)" }
  ];
  var cardsBox = document.getElementById("vocabCards");
  vocab.forEach(function(v){
    var c = document.createElement("div");
    c.className = "fcard";
    c.innerHTML =
      "<div class=\"in\">" +
        "<div class=\"face\" style=\"--qc:"+v.qc+"\"><div class=\"gem\"></div><div class=\"emo\">"+v.emo+"</div><div class=\"es\">"+v.es+"</div><div class=\"hint\">toca ✦ 터치</div></div>" +
        "<div class=\"face back\"><div class=\"kr\">"+v.kr+"</div><div class=\"ej\">"+v.ej+"</div></div>" +
      "</div>";
    c.addEventListener("click", function(){ c.classList.toggle("flipped"); });
    cardsBox.appendChild(c);
  });

  /* ===== intruso ===== */
  var intrusoRounds = [
    { words:["siempre","a veces","nunca","el nivel"], bad:3, theme:"Las otras tres dicen CUÁNTAS VECES 🎵" },
    { words:["pulsar","girar","practicar","el ritmo"], bad:3, theme:"Las otras tres son ACCIONES (verbos) 🏃" },
    { words:["la canción","la música","el ritmo","el error"], bad:3, theme:"Las otras tres son del mundo de la MÚSICA 🎶" }
  ];
  var intrusoIdx = 0;
  var iWords = document.getElementById("intrusoWords");
  var iFb = document.getElementById("intrusoFb");
  var iRound = document.getElementById("intrusoRound");
  function renderIntruso(){
    var r = intrusoRounds[intrusoIdx];
    iRound.textContent = "Ronda " + (intrusoIdx+1) + " / 3";
    iFb.textContent = "";
    iFb.className = "feedback";
    iWords.innerHTML = "";
    r.words.forEach(function(w, idx){
      var b = document.createElement("div");
      b.className = "word-btn";
      b.textContent = w;
      b.addEventListener("click", function(){
        if (idx === r.bad){
          b.classList.add("right");
          iFb.textContent = "🕵️ ¡Glitch capturado! " + r.theme;
          iFb.classList.add("good");
          setTimeout(function(){
            intrusoIdx++;
            if (intrusoIdx < intrusoRounds.length){ renderIntruso(); }
            else {
              iRound.textContent = "Completado";
              iWords.innerHTML = "";
              iFb.textContent = "⭐ ¡Las tres rondas completas! Pasa a la siguiente diapositiva ›";
            }
          }, 1600);
        } else {
          b.classList.add("wrong");
          iFb.textContent = "Mmm… esa palabra sí es del grupo. ¡Piensa en el tema!";
          iFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      iWords.appendChild(b);
    });
  }
  renderIntruso();

  /* ===== barra de ritmo (frecuencia) ===== */
  var freq = [
    { n:10, s:"Hielo ＿＿ escucha la música antes de jugar. (10 de 10 pulsos)", opts:["nunca","siempre","a veces"], ok:1, why:"10/10 = siempre." },
    { n:0,  s:"Hielo ＿＿ pierde el ritmo. (0 pulsos)", opts:["nunca","casi siempre","a menudo"], ok:0, why:"0/10 = nunca. ¡Silencio total!" },
    { n:4,  s:"Fuego ＿＿ mira las estrellas y se distrae. (4 pulsos)", opts:["siempre","a veces","nunca"], ok:1, why:"4/10 = a veces." },
    { n:8,  s:"El DJ ＿＿ pone una canción nueva. (8 pulsos)", opts:["casi nunca","casi siempre","nunca"], ok:1, why:"8/10 = casi siempre." },
    { n:2,  s:"La Estrella Bonus ＿＿ aparece. (2 pulsos)", opts:["casi nunca","a menudo","siempre"], ok:0, why:"2/10 = casi nunca." },
    { n:6,  s:"Practico ＿＿: lunes, martes, jueves… (6 pulsos)", opts:["nunca","a menudo","una vez al mes"], ok:1, why:"6/10 = a menudo (muchas veces, pero no todas)." }
  ];
  var freqIdx = 0;
  var freqBeats = document.getElementById("freqBeats");
  var freqSent = document.getElementById("freqSentence");
  var freqOpts = document.getElementById("freqOpts");
  var freqFb = document.getElementById("freqFb");
  var freqCount = document.getElementById("freqCount");
  for (var bb = 0; bb < 10; bb++){
    var el = document.createElement("div");
    el.className = "bt";
    freqBeats.appendChild(el);
  }
  var freqCells = freqBeats.querySelectorAll(".bt");
  function setBeats(n){
    for (var k = 0; k < freqCells.length; k++){
      (function(cell, on, delay){
        setTimeout(function(){ cell.classList.toggle("on", on); }, delay);
      })(freqCells[k], k < n, k * 70);
    }
  }
  function renderFreq(){
    var r = freq[freqIdx];
    freqCount.textContent = "Pulso " + (freqIdx+1) + " / 6";
    freqFb.textContent = "";
    freqFb.className = "feedback";
    setBeats(r.n);
    freqSent.textContent = r.s;
    freqOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          freqFb.textContent = "🎵 ¡En el beat! " + r.why;
          freqFb.classList.add("good");
          setTimeout(function(){
            freqIdx++;
            if (freqIdx < freq.length){ renderFreq(); }
            else {
              freqCount.textContent = "Barra dominada";
              freqSent.textContent = "🎚️ ¡Lees el metrónomo perfectamente!";
              freqOpts.innerHTML = "";
              freqFb.textContent = "Ahora lee el capítulo uno ›";
              setBeats(10);
            }
          }, 2100);
        } else {
          b.classList.add("wrong");
          freqFb.textContent = "Cuenta los pulsos que brillan… ¿muchos o pocos?";
          freqFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      freqOpts.appendChild(b);
    });
  }
  renderFreq();

  /* ===== detective ===== */
  var det = [
    { q:"¿Quién necesita más práctica, Fuego o Hielo?",
      opts:["Hielo","Fuego","Los dos igual"], ok:1,
      exp:"Hielo <b>nunca</b> pierde el ritmo; Fuego <b>casi siempre</b> llega tarde. ¡Fuego es el que practica más!" },
    { q:"¿Cuántas veces practican al día en total?",
      opts:["Una vez","Dos veces","Tres veces"], ok:2,
      exp:"Dos veces por la mañana + una vez por la noche = <b>tres veces</b>. ¡Matemática de detective!" },
    { q:"¿Por qué Fuego llega tarde? El texto da la razón.",
      opts:["Porque mira las estrellas y se olvida del beat","Porque no le gusta bailar","Porque no tiene reloj"], ok:0,
      exp:"<b>A menudo mira las estrellas</b> y se olvida del ritmo. ¡Es soñador, no perezoso!" },
    { q:"¿La práctica funcionó?",
      opts:["No, sigue igual","Sí: antes fallaba, ahora casi nunca falla","El texto no lo dice"], ok:1,
      exp:"Antes llegaba tarde; ahora <b>casi nunca falla</b> y a veces baila mejor que Hielo. ¡Progreso!" }
  ];
  var detIdx = 0;
  var dQ = document.getElementById("detQ");
  var dOpts = document.getElementById("detOpts");
  var dExp = document.getElementById("detExp");
  var dRound = document.getElementById("detRound");
  function renderDet(){
    var r = det[detIdx];
    dRound.textContent = "Pregunta " + (detIdx+1) + " / 4";
    dQ.textContent = r.q;
    dExp.innerHTML = "";
    dOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          dExp.innerHTML = "✅ " + r.exp;
          setTimeout(function(){
            detIdx++;
            if (detIdx < det.length){ renderDet(); }
            else {
              dRound.textContent = "Caso cerrado";
              dQ.textContent = "🕵️ ¡Excelente, detective! Resolviste las cuatro preguntas.";
              dOpts.innerHTML = "";
              dExp.textContent = "Ahora, las órdenes del tutorial ›";
            }
          }, 2600);
        } else {
          b.classList.add("wrong");
          dExp.innerHTML = "Busca las pistas en el texto otra vez…";
        }
      });
      dOpts.appendChild(b);
    });
  }
  renderDet();

  /* ===== tutorial del planeta (imperativo) ===== */
  var tilePos = [
    { x:49, y:71 }, { x:139, y:71 }, { x:229, y:63 }, { x:319, y:71 },
    { x:409, y:63 }, { x:499, y:71 }, { x:589, y:63 }
  ];
  var imp = [
    { s:"👂 tú escuchas → orden:", opts:["¡Escuchas!","¡Escucha!","¡Escuchar!"], ok:1, why:"Quítale la -s al tú: escucha<s>s</s> → ¡Escucha!" },
    { s:"🌀 tú giras → orden:", opts:["¡Gira!","¡Giras!","¡Gire!"], ok:0, why:"gira<s>s</s> → ¡Gira!" },
    { s:"⏳ tú esperas → orden:", opts:["¡Esperar!","¡Esperas!","¡Espera!"], ok:2, why:"espera<s>s</s> → ¡Espera!" },
    { s:"🏃 tú corres (verbo en -er) → orden:", opts:["¡Corra!","¡Corre!","¡Corra tú!"], ok:1, why:"-er/-ir terminan en -e: ¡Corre!" },
    { s:"🧘 REBELDE · tener paciencia → orden:", opts:["¡Tienes!","¡Tene!","¡Ten paciencia!"], ok:2, why:"tener es rebelde: ¡Ten! (corto y fuerte)" },
    { s:"💪 REBELDE · ser valiente → orden:", opts:["¡Sé valiente!","¡Eres valiente!","¡Sea valiente!"], ok:0, why:"ser es rebelde: ¡Sé! (con tilde)" }
  ];
  var impIdx = 0;
  var impSent = document.getElementById("impSentence");
  var impOpts = document.getElementById("impOpts");
  var impFb = document.getElementById("impFb");
  var impCount = document.getElementById("impCount");
  var pFuego = document.getElementById("pFuego");
  var pHielo = document.getElementById("pHielo");
  function moverPlanetas(step){
    var hi = Math.min(step, tilePos.length - 2);
    var fi = Math.min(step + 1, tilePos.length - 1);
    var dh = tilePos[hi], df = tilePos[fi];
    pHielo.setAttribute("transform", "translate(" + (dh.x - tilePos[0].x) + "," + (dh.y - tilePos[0].y) + ")");
    pFuego.setAttribute("transform", "translate(" + (df.x - tilePos[1].x) + "," + (df.y - tilePos[1].y) + ")");
    for (var t = 0; t <= fi; t++){
      var tile = document.getElementById("t" + t);
      if (tile) tile.classList.add("done");
    }
  }
  function renderImp(){
    var r = imp[impIdx];
    impCount.textContent = "Baldosa " + (impIdx+1) + " / 6";
    impFb.textContent = "";
    impFb.className = "feedback";
    impSent.textContent = r.s;
    impOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          impFb.innerHTML = "✦ ¡Perfecto! " + r.why;
          impFb.classList.add("good");
          moverPlanetas(impIdx + 1);
          setTimeout(function(){
            impIdx++;
            if (impIdx < imp.length){ renderImp(); }
            else {
              impCount.textContent = "🏁 ¡Nivel completo!";
              impSent.textContent = "🎮 Los planetas llegaron al final. ¡Dominas las órdenes!";
              impOpts.innerHTML = "";
              impFb.textContent = "Sigue el capítulo dos ›";
            }
          }, 2200);
        } else {
          b.classList.add("wrong");
          impFb.textContent = "Recuerda: la orden es el TÚ sin la -s (o un rebelde corto).";
          impFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      impOpts.appendChild(b);
    });
  }
  renderImp();

  /* ===== ordena la historia ===== */
  var events = [
    "Fuego no puede terminar el nivel final y quiere abandonar.",
    "El Maestro Metrónomo cuenta: uno, dos, tres, cuatro.",
    "Fuego cierra los ojos, respira y escucha.",
    "Fuego espera el beat y gira en el momento correcto.",
    "La pantalla dice: ¡NIVEL COMPLETO!"
  ];
  var shuffled = [3,0,4,1,2];
  var expected = 0;
  var oList = document.getElementById("orderList");
  var oFb = document.getElementById("orderFb");
  shuffled.forEach(function(evIdx){
    var el = document.createElement("div");
    el.className = "ev";
    el.innerHTML = "<span class=\"num\">?</span><span>" + events[evIdx] + "</span>";
    el.addEventListener("click", function(){
      if (el.classList.contains("locked")) return;
      if (evIdx === expected){
        el.classList.add("locked");
        el.querySelector(".num").textContent = expected + 1;
        expected++;
        if (expected === events.length){
          oFb.textContent = "🎶 ¡Historia perfecta! Con paciencia se completa cualquier nivel.";
          oFb.className = "feedback good";
        } else {
          oFb.textContent = "✅ ¡Sí! ¿Y qué pasa después?";
          oFb.className = "feedback good";
        }
      } else {
        el.classList.add("wrong");
        oFb.textContent = "Todavía no… recuerda el capítulo del nivel imposible.";
        oFb.className = "feedback oops";
        setTimeout(function(){ el.classList.remove("wrong"); }, 450);
      }
    });
    oList.appendChild(el);
  });

  /* ===== confeti ===== */
  var confColors = ["#ff6b3d","#3dd6ff","#ff4ecb","#b6ff3d","#ffd23d","#ffffff"];
  function confettiBurst(){
    for (var c = 0; c < 40; c++){
      var f = document.createElement("div");
      f.className = "confetti";
      f.style.left = (Math.random()*100) + "vw";
      f.style.background = confColors[c % confColors.length];
      f.style.transform = "rotate(45deg)";
      f.style.animationDuration = (1.5 + Math.random()*2.3) + "s";
      f.style.animationDelay = (Math.random()*0.6) + "s";
      document.body.appendChild(f);
      (function(node){ setTimeout(function(){ node.remove(); }, 5200); })(f);
    }
  }
  var cutin = document.getElementById("cutin");

  /* ===== combate 1: Metrónomo Roto ===== */
  var boss = [
    { q:"Practico todos los días: 10 de 10. Practico ＿＿.", opts:["nunca","siempre","casi nunca"], ok:1 },
    { q:"Dos ＿＿ por semana juego con mis amigos.", opts:["vez","veces","vezes"], ok:1 },
    { q:"＿＿ pierdo el ritmo. (= 0 veces)", opts:["Siempre","A menudo","Nunca"], ok:2 },
    { q:"¿Cómo se pregunta por la frecuencia?", opts:["¿Con qué frecuencia juegas?","¿Cuánto es el ritmo?","¿Dónde juegas?"], ok:0 },
    { q:"Una ＿＿ al mes voy al cine.", opts:["veces","vez","vezes"], ok:1 },
    { q:"4 de 10 pulsos = ＿＿", opts:["a veces","siempre","casi siempre"], ok:0 }
  ];
  var bossIdx = 0;
  var hp = boss.length;
  var bQ = document.getElementById("bossQ");
  var bOpts = document.getElementById("bossOpts");
  var bHp = document.getElementById("bossHp");
  var bSprite = document.getElementById("bossSprite");
  var bGame = document.getElementById("bossGame");
  var bWin = document.getElementById("bossWin");
  var field = document.getElementById("battlefield");
  var mini = document.getElementById("miniSlash");
  function spawnDamage(f){
    var d = document.createElement("div");
    d.className = "dmg";
    d.textContent = String(800 + Math.floor(Math.random()*2200));
    d.style.left = (42 + Math.random()*16) + "%";
    d.style.top = "22%";
    f.appendChild(d);
    setTimeout(function(){ d.remove(); }, 950);
  }
  function beatHit(){
    mini.classList.remove("go");
    void mini.offsetWidth;
    mini.classList.add("go");
    bSprite.classList.add("hit");
    spawnDamage(field);
    setTimeout(function(){ bSprite.classList.remove("hit"); }, 520);
  }
  function renderBoss(){
    var r = boss[bossIdx];
    bQ.textContent = "⏱️ Ataque " + (bossIdx+1) + ": " + r.q;
    bOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp--;
          bHp.style.width = (hp/boss.length)*100 + "%";
          var isLast = (bossIdx === boss.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡COMBO PERFECTO!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(beatHit, 700);
            setTimeout(function(){
              bSprite.textContent = "🎵";
              bGame.classList.add("hidden");
              bWin.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            beatHit();
            setTimeout(function(){
              bossIdx++;
              renderBoss();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      bOpts.appendChild(b);
    });
  }
  renderBoss();

  /* ============ ACTO II ============ */

  /* ===== memoria ===== */
  var memoPairs = [
    { es:"el ritmo", m:"🎵 리듬" },
    { es:"el nivel", m:"🎮 레벨" },
    { es:"girar", m:"🌀 돌다" },
    { es:"pulsar", m:"👆 누르다" },
    { es:"esperar", m:"⏳ 기다리다" },
    { es:"practicar", m:"💪 연습하다" }
  ];
  var memoCards = [];
  memoPairs.forEach(function(p, i){
    memoCards.push({ pid:i, label:p.es });
    memoCards.push({ pid:i, label:p.m });
  });
  for (var m = memoCards.length - 1; m > 0; m--){
    var j = Math.floor(Math.random() * (m + 1));
    var tmp = memoCards[m]; memoCards[m] = memoCards[j]; memoCards[j] = tmp;
  }
  var memoGrid = document.getElementById("memoGrid");
  var memoStats = document.getElementById("memoStats");
  var memoFb = document.getElementById("memoFb");
  var memoOpen = [];
  var memoFound = 0;
  var memoTries = 0;
  function memoUpdate(){
    memoStats.textContent = "Parejas: " + memoFound + " / 6 · Intentos: " + memoTries;
  }
  memoCards.forEach(function(c){
    var el = document.createElement("div");
    el.className = "mcard";
    el.textContent = "◆";
    el.addEventListener("click", function(){
      if (el.classList.contains("lock") || el.classList.contains("up") || memoOpen.length === 2) return;
      el.classList.add("up");
      el.textContent = c.label;
      memoOpen.push({ el:el, pid:c.pid });
      if (memoOpen.length === 2){
        memoTries++;
        if (memoOpen[0].pid === memoOpen[1].pid){
          memoOpen[0].el.classList.add("lock");
          memoOpen[1].el.classList.add("lock");
          memoOpen = [];
          memoFound++;
          memoFb.textContent = "✦ ¡Pareja! Dila en voz alta.";
          memoFb.className = "feedback good";
          if (memoFound === 6){
            memoFb.textContent = "⭐ ¡Memoria completa! Camino de baldosas entero.";
          }
        } else {
          memoFb.textContent = "No son pareja… ¡memoria de jugadora!";
          memoFb.className = "feedback oops";
          var a = memoOpen[0].el, bEl = memoOpen[1].el;
          memoOpen = [];
          setTimeout(function(){
            a.classList.remove("up"); a.textContent = "◆";
            bEl.classList.remove("up"); bEl.textContent = "◆";
          }, 1000);
        }
        memoUpdate();
      }
    });
    memoGrid.appendChild(el);
  });
  memoUpdate();

  /* ===== rol + DJ ===== */
  var rolItems = [
    { t:"👤 Tu nombre", m:"Me llamo ____ y soy jugadora de ritmo." },
    { t:"🎵 Tu frecuencia", m:"Practico ____ (todos los días / dos veces por semana)." },
    { t:"❌ Tu punto débil", m:"A veces ____ (fallo / corro / me pongo nerviosa)." },
    { t:"🎧 Tu música", m:"Casi siempre escucho ____ ." },
    { t:"👆 Tu consejo", m:"¡____ ! (Escucha / Practica / Ten paciencia)" }
  ];
  var rolList = document.getElementById("rolList");
  rolItems.forEach(function(r){
    var el = document.createElement("div");
    el.className = "rline";
    el.innerHTML = r.t + "<span class=\"tap\">toca ✦</span><div class=\"model\">🗣️ " + r.m + "</div>";
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rolList.appendChild(el);
  });

  var ivQs = [
    { q:"¿Con qué frecuencia juegas videojuegos?", h:"Juego... veces por semana." },
    { q:"¿Siempre haces la tarea antes de jugar?", h:"Sí, siempre... / No, a veces..." },
    { q:"¿Qué haces todos los días?", h:"Todos los días..." },
    { q:"¿Qué no haces nunca?", h:"Nunca..." },
    { q:"¿Cuántas veces por semana escuchas música?", h:"Escucho música... veces." },
    { q:"Dame tres órdenes para un principiante.", h:"¡Escucha! ¡Practica! ¡Ten paciencia!" },
    { q:"¿Casi siempre llegas a tiempo o casi nunca?", h:"Casi siempre / casi nunca llego..." },
    { q:"¿Qué haces a veces los fines de semana?", h:"A veces..." },
    { q:"¿Te pones nerviosa en un nivel difícil?", h:"Sí, a menudo... / No, casi nunca..." },
    { q:"Dile a Fuego qué debe hacer.", h:"¡Espera el beat! ¡No corras!" }
  ];
  var ivPool = [];
  var ivQ = document.getElementById("ivQ");
  var ivHint = document.getElementById("ivHint");
  document.getElementById("ivBtn").addEventListener("click", function(){
    if (ivPool.length === 0){ ivPool = ivQs.slice(); }
    var pick = Math.floor(Math.random() * ivPool.length);
    var q = ivPool.splice(pick, 1)[0];
    ivQ.textContent = "🎧 " + q.q;
    ivHint.textContent = "Pista: " + q.h;
  });

  /* ===== ¿y tú? ===== */
  var compItems = [
    { s:"Hielo siempre escucha la música antes de empezar.", si:"¡Yo también escucho siempre antes de empezar!", no:"Yo a veces empiezo sin escuchar." },
    { s:"El DJ pone una canción nueva todos los días.", si:"¡Yo también escucho música todos los días!", no:"Yo casi nunca escucho música nueva." },
    { s:"Fuego practica tres veces al día.", si:"¡Yo también practico (español / juegos) casi todos los días!", no:"Yo practico solo una o dos veces por semana." },
    { s:"El Maestro Metrónomo nunca se pone nervioso.", si:"¡Yo tampoco! Casi nunca me pongo nerviosa.", no:"Yo a veces me pongo muy nerviosa." },
    { s:"La Estrella Bonus casi nunca aparece.", si:"¡Yo también hago algo especial casi nunca!", no:"Yo hago cosas especiales a menudo." }
  ];
  var compIdx = 0;
  var compSent = document.getElementById("compSent");
  var compModel = document.getElementById("compModel");
  var compRound = document.getElementById("compRound");
  function renderComp(){
    var r = compItems[compIdx];
    compRound.textContent = "Frase " + (compIdx+1) + " / 5";
    compSent.textContent = r.s;
    compModel.innerHTML = "";
  }
  function compAnswer(kind){
    if (compIdx >= compItems.length) return;
    var r = compItems[compIdx];
    var txt = (kind === "si") ? r.si : r.no;
    compModel.innerHTML = "🗣️ " + txt + "<span class=\"say\">Dilo en voz alta y completa la frase.</span>";
    setTimeout(function(){
      compIdx++;
      if (compIdx < compItems.length){ renderComp(); }
      else {
        compRound.textContent = "Completado";
        compSent.textContent = "⭐ ¡Ya hablas de tu propio ritmo de vida!";
        compModel.innerHTML = "Siguiente misión: el dictado del audífono ›";
      }
    }, 3400);
  }
  document.getElementById("compSi").addEventListener("click", function(){ compAnswer("si"); });
  document.getElementById("compNo").addEventListener("click", function(){ compAnswer("no"); });
  renderComp();

  /* ===== dictado ===== */
  var dictItems = [
    "Siempre practico antes de dormir.",
    "Nunca pierdo el ritmo en el nivel uno.",
    "Escucha la música y pulsa el botón.",
    "A veces juego dos veces por semana.",
    "Ten paciencia y gira con el planeta."
  ];
  var dictIdx = 0;
  var dictIn = document.getElementById("dictIn");
  var dictFb = document.getElementById("dictFb");
  var dictRound = document.getElementById("dictRound");
  var dictSecret = document.getElementById("dictSecret");
  function dictNorm(s){
    return s.toLowerCase().replace(/[.,;:!?¡¿"«»]/g, "").replace(/\s+/g, " ").trim();
  }
  function dictDeacc(s){
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function speak(text, rate){
    if (!window.speechSynthesis){ dictFb.textContent = "Este navegador no tiene voz: la profe lee el mensaje 👩‍🏫"; dictFb.className = "feedback oops"; return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = rate;
    var vs = window.speechSynthesis.getVoices();
    for (var v = 0; v < vs.length; v++){
      if (vs[v].lang && vs[v].lang.indexOf("es") === 0){ u.voice = vs[v]; break; }
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
  function renderDict(){
    dictRound.textContent = "Mensaje " + (dictIdx+1) + " / 5";
    dictIn.value = "";
    dictFb.textContent = "";
    dictFb.className = "feedback";
    dictSecret.textContent = dictItems[dictIdx];
  }
  document.getElementById("dictPlay").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.82); });
  document.getElementById("dictSlow").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.55); });
  document.getElementById("dictCheck").addEventListener("click", function(){
    var ans = dictNorm(dictIn.value);
    var target = dictNorm(dictItems[dictIdx]);
    if (ans === target){
      dictFb.textContent = "🎧 ¡Rango S! Mensaje perfecto.";
      dictFb.className = "feedback good";
    } else if (ans !== "" && dictDeacc(ans) === dictDeacc(target)){
      dictFb.textContent = "¡Casi perfecto! Revisa las tildes: " + dictItems[dictIdx];
      dictFb.className = "feedback oops";
    } else {
      dictFb.textContent = "Escucha otra vez… pista: la frase tiene " + dictItems[dictIdx].split(" ").length + " palabras.";
      dictFb.className = "feedback oops";
    }
  });
  document.getElementById("dictNext").addEventListener("click", function(){
    dictIdx++;
    if (dictIdx < dictItems.length){ renderDict(); }
    else {
      dictIdx = dictItems.length - 1;
      dictRound.textContent = "Dictado completado";
      dictFb.textContent = "⭐ ¡Cinco mensajes descifrados! El Glitch Final te espera ›";
      dictFb.className = "feedback good";
    }
  });
  renderDict();

  /* ===== jefe final: Glitch Final ===== */
  var boss2 = [
    { q:"👂 tú escuchas → ＿＿ la música.", opts:["Escuchas","Escucha","Escuchar"], ok:1 },
    { q:"＿＿ juego: tres veces por semana.", opts:["Nunca","A menudo","Siempre"], ok:1 },
    { q:"🧘 REBELDE · ＿＿ paciencia. (tener)", opts:["Ten","Tienes","Tene"], ok:0 },
    { q:"⚠️ A Fuego le ＿＿ las estrellas. (¡la varita al revés!)", opts:["gusta","gustan","gustas"], ok:1 },
    { q:"⚠️ En el nivel final ＿＿ un glitch morado. (¡la linterna!)", opts:["está","hay","son"], ok:1 },
    { q:"🏃 tú corres → ＿＿ más despacio.", opts:["Corra","Corres","Corre"], ok:2 },
    { q:"Tres ＿＿ al día es mucha práctica.", opts:["vez","veces","vezes"], ok:1 },
    { q:"💪 REBELDE · ＿＿ valiente. (ser)", opts:["Eres","Sea","Sé"], ok:2 }
  ];
  var boss2Idx = 0;
  var hp2 = boss2.length;
  var b2Q = document.getElementById("boss2Q");
  var b2Opts = document.getElementById("boss2Opts");
  var b2Hp = document.getElementById("boss2Hp");
  var b2Sprite = document.getElementById("boss2Sprite");
  var b2Game = document.getElementById("boss2Game");
  var b2Win = document.getElementById("boss2Win");
  var field2 = document.getElementById("battlefield2");
  var mini2 = document.getElementById("miniSlash2");
  function beatHit2(){
    mini2.classList.remove("go");
    void mini2.offsetWidth;
    mini2.classList.add("go");
    b2Sprite.classList.add("hit");
    spawnDamage(field2);
    setTimeout(function(){ b2Sprite.classList.remove("hit"); }, 520);
  }
  function renderBoss2(){
    var r = boss2[boss2Idx];
    b2Q.textContent = "👾 Ataque " + (boss2Idx+1) + ": " + r.q;
    b2Opts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp2--;
          b2Hp.style.width = (hp2/boss2.length)*100 + "%";
          var isLast = (boss2Idx === boss2.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡SINCRONÍA TOTAL!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(beatHit2, 700);
            setTimeout(function(){
              b2Sprite.textContent = "⭐";
              b2Game.classList.add("hidden");
              b2Win.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            beatHit2();
            setTimeout(function(){
              boss2Idx++;
              renderBoss2();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      b2Opts.appendChild(b);
    });
  }
  renderBoss2();

  /* init */
  goTo(0, true);
})();
