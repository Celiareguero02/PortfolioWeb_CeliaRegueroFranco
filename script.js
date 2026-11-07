/* Portfolio Celia Reguero - JS vanilla */
(function () {
  "use strict";

  var reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* En pantallas tactiles no hay "hover": un toque abre directamente la galeria */
  function sinHover() { return window.matchMedia("(hover: none)").matches; }

  /* ---------- Datos de las categorias ---------- */
  var CATEGORIAS = [
    { id: "tres_d", nombre: "3D Projects", simbolo: "☾", texto: "Assets, props y escenarios modelados en 3D" },
    { id: "personajes", nombre: "Character Projects", simbolo: "☉", texto: "Diseño y desarrollo de personajes" },
    { id: "videojuegos", nombre: "Videogame Projects", simbolo: "✦", texto: "Proyectos jugables e implementación en motor" }
  ];

  /* Para insertar imagenes: pon la ruta en cada espacio (puedes poner todas las que quieras: si hay muchas aparece scroll).
     Ejemplo: tres_d: ["img/modelo1.jpg", "img/modelo2.jpg", ""] */
  var GALERIA = {
    /* Un elemento puede ser una imagen (ruta) o un modelo de Marmoset Viewer:
       { tipo: "mview", titulo: "Nombre", archivo: "models/archivo.mview", miniatura: "img/portada.jpg" }
       (miniatura es opcional: si la dejas vacia se muestra el titulo en el recuadro) */
    tres_d: [
      
      "img/Render_cocina.png",{ tipo: "mview", titulo: "Cocina", archivo: "models/viewer_cocina.mview", miniatura: "" },  "img/Render_bidones.png",{ tipo: "mview", titulo: "Bidones", archivo: "models/bidones_viewer.mview", miniatura: "" }, "img/Render_arcade.png",{ tipo: "mview", titulo: "Arcade", archivo: "models/arcade_viewer.mview", miniatura: "" }
    ],
    personajes: ["img/Reguero_Franco_Celia_BustoFinal_Render_Front.jpg", "img/maleBustFron.png"]
  };

  /* Categorias con secciones desplegables (ahora solo Videogame Projects).
     Cada seccion es un recuadro con texto; al hacer clic se despliegan a su derecha
     sus imagenes. Anade o quita secciones e imagenes libremente, por ejemplo:
     { nombre: "Puzzles", imagenes: ["img/puzzle1.jpg", "img/puzzle2.jpg"] } */
  var SECCIONES = {
    videojuegos: [
      { nombre: "Puzzles", imagenes: ["img/puzzle_arcade.png", "img/puzzle_gramola.png", "img/puzzle_cestas.png", "img/puzzle_glifos.png"] },
      { nombre: "Recolor fondos", imagenes: ["img/recoloring_fondos1.png", "img/recoloring_fondos2.png", "img/recoloring_fondos3.png", "img/recoloring_fondos4.png"] },
      { nombre: "HUD y UI", imagenes: ["img/Pantalla_titulo.gif", "img/hud_YNF.png", "img/Backlog_YNF.png"] }
    ]
  };

  var REPETICIONES = 3;
  var TOTAL = CATEGORIAS.length * REPETICIONES;

  /* ---------- Cielo estrellado ---------- */
  var cielo = document.getElementById("cielo");
  var COLORES_ESTRELLA = ["#f5dc90", "#fff3d1", "#cfd9ff"];
  var FORMAS_ESTRELLA = ["e-a", "e-b", "e-c"];
  var CUATRO_PUNTAS = "M50 0L57 43L100 50L57 57L50 100L43 57L0 50L43 43Z";

  function estrella(tam, opacidad, grande) {
    var forma = FORMAS_ESTRELLA[Math.floor(Math.random() * FORMAS_ESTRELLA.length)];
    var color = COLORES_ESTRELLA[Math.floor(Math.random() * COLORES_ESTRELLA.length)];
    var estilo = "left:" + (Math.random() * 100).toFixed(1) + "%;top:" + (Math.random() * 100).toFixed(1) + "%;" +
      "width:" + tam.toFixed(1) + "px;height:" + tam.toFixed(1) + "px;color:" + color + ";--o:" + opacidad.toFixed(2) + ";" +
      "animation-duration:" + (3 + Math.random() * 5).toFixed(1) + "s;animation-delay:-" + (Math.random() * 8).toFixed(1) + "s";
    return '<svg class="estrella' + (grande ? " estrella-grande" : "") + '" viewBox="0 0 100 100" style="' + estilo + '" aria-hidden="true"><use href="#' + forma + '"/></svg>';
  }

  var htmlCielo = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<symbol id="e-a" viewBox="0 0 100 100"><path d="' + CUATRO_PUNTAS + '"/></symbol>' +
    '<symbol id="e-b" viewBox="0 0 100 100"><path d="' + CUATRO_PUNTAS + '"/><path transform="rotate(45 50 50)" d="M50 16L54 46L84 50L54 54L50 84L46 54L16 50L46 46Z"/></symbol>' +
    '<symbol id="e-c" viewBox="0 0 100 100"><path d="M50 2L66 50L50 98L34 50Z"/></symbol>' +
    '</defs></svg>';
  var densidad = window.innerWidth < 700 ? 0.55 : 1;   // menos estrellas en movil
  var n;
  for (n = 0; n < Math.round(55 * densidad); n++) htmlCielo += estrella(7 + Math.random() * 5, 0.35 + Math.random() * 0.25, false);   // pequenas
  for (n = 0; n < Math.round(22 * densidad); n++) htmlCielo += estrella(12 + Math.random() * 7, 0.5 + Math.random() * 0.3, false);    // medianas
  for (n = 0; n < Math.round(6 * densidad); n++) htmlCielo += estrella(22 + Math.random() * 10, 0.75 + Math.random() * 0.2, true);    // brillantes
  cielo.innerHTML = htmlCielo;

  /* ---------- Destellos en hover ---------- */
  function lanzarChispas(el) {
    if (reducirMovimiento) return;
    var r = el.getBoundingClientRect();
    for (var i = 0; i < 6; i++) {
      var c = document.createElement("span");
      c.className = "chispa";
      c.style.left = r.left + Math.random() * r.width + "px";
      c.style.top = r.top + Math.random() * r.height + "px";
      c.style.setProperty("--dx", (Math.random() * 40 - 20) + "px");
      c.style.setProperty("--dy", (Math.random() * -40 - 5) + "px");
      document.body.appendChild(c);
      setTimeout(function (n) { n.remove(); }, 800, c);
    }
  }
  function activarBrillo(el) {
    el.addEventListener("mouseenter", function () { lanzarChispas(el); });
  }
  document.querySelectorAll(".brillo, .menu a").forEach(activarBrillo);

  /* ---------- Carrusel de tarot ---------- */
  var escenario = document.getElementById("escenario");
  var seccion = document.getElementById("proyectos");
  var pista = document.getElementById("pista");
  var cartas = [];

  var SVG_DORSO = '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="32"/><circle cx="50" cy="50" r="20"/>' +
    '<path d="M50 8l5 27 27-5-22 18 22 18-27-5-5 27-5-27-27 5 22-18-22-18 27 5z"/></svg>';

  /* Emblemas por categoria: planeta, estrella y sol */
  var rayos = "";
  for (var r = 0; r < 12; r++) rayos += '<path d="M50 12v10" transform="rotate(' + (r * 30) + ' 50 50)"/>';
  var ANILLO = '<circle cx="50" cy="50" r="43" stroke-dasharray="1 4"/>';
  var EMBLEMAS = [
    '<svg viewBox="0 0 100 100" aria-hidden="true">' + ANILLO + '<circle cx="50" cy="50" r="17"/><ellipse cx="50" cy="50" rx="36" ry="10" transform="rotate(-22 50 50)"/><circle cx="82" cy="20" r="2.5"/></svg>',
    '<svg viewBox="0 0 100 100" aria-hidden="true">' + ANILLO + '<path d="M50 10l6.5 33.5L90 50l-33.5 6.5L50 90l-6.5-33.5L10 50l33.5-6.5z"/><path d="M50 31l2.5 16.5L69 50l-16.5 2.5L50 69l-2.5-16.5L31 50l16.5-2.5z"/></svg>',
    '<svg viewBox="0 0 100 100" aria-hidden="true">' + ANILLO + '<circle cx="50" cy="50" r="15"/>' + rayos + '</svg>'
  ];

  for (var i = 0; i < TOTAL; i++) {
    var cat = CATEGORIAS[i % CATEGORIAS.length];
    var b = document.createElement("button");
    b.type = "button";
    b.className = "carta cat-" + (i % CATEGORIAS.length);
    b.dataset.indice = i;
    b.setAttribute("aria-label", "Abrir galería: " + cat.nombre);
    b.dataset.categoria = i % CATEGORIAS.length;
    b.innerHTML =
      '<div class="giro">' +
      '<div class="cara dorso">' + EMBLEMAS[i % CATEGORIAS.length] + '</div>' +
      '<div class="cara frente"><span class="simbolo">' + EMBLEMAS[i % CATEGORIAS.length] + '</span><h3>' + cat.nombre + '</h3><p>' + cat.texto + '</p></div>' +
      '</div>';
    escenario.appendChild(b);
    cartas.push(b);
    b.addEventListener("mouseenter", function () { if (sinHover()) return; pausa = true; enfocada = parseInt(this.dataset.indice, 10); lanzarChispas(this); });
    b.addEventListener("mouseleave", function () { pausa = false; enfocada = -1; });
    b.addEventListener("focus", function () { if (sinHover()) return; pausa = true; enfocada = parseInt(this.dataset.indice, 10); });
    b.addEventListener("blur", function () { pausa = false; enfocada = -1; });
    b.addEventListener("click", function () { abrirModal(parseInt(this.dataset.categoria, 10), this); });
  }

  /* Sobre: fondo, frente y solapa */
  var caja = {};
  ["fondo", "frente", "solapa"].forEach(function (n) {
    var d = document.createElement("div");
    d.className = "sobre sobre-" + n;
    d.setAttribute("aria-hidden", "true");
    escenario.appendChild(d);
    caja[n] = d;
  });
  caja.frente.innerHTML = SVG_DORSO;

  var pausa = false;
  var enfocada = -1;
  var inclinacion = [];
  var giro = 0;
  var apertura = reducirMovimiento ? 1 : 0;
  var objetivo = apertura;
  var ultimo = performance.now();

  function calcularScroll() {
    var r = seccion.getBoundingClientRect();
    objetivo = reducirMovimiento ? 1 : Math.min(1, Math.max(0, -r.top / (window.innerHeight * 0.8)));
    pista.style.opacity = objetivo > 0.15 ? 0 : 1;
  }
  window.addEventListener("scroll", calcularScroll, { passive: true });
  window.addEventListener("resize", calcularScroll);
  calcularScroll();

  function dibujar(ahora) {
    var dt = Math.min(48, ahora - ultimo);
    ultimo = ahora;
    apertura += (objetivo - apertura) * 0.08;

    var fs = Math.min(1, apertura / 0.3);                              // fase: solapa
    var fc = Math.min(1, Math.max(0, (apertura - 0.2) / 0.8));         // fase: cartas
    var cae = Math.min(1, Math.max(0, (apertura - 0.25) / 0.25));      // frente baja
    var desv = Math.min(1, Math.max(0, (apertura - 0.35) / 0.3));      // sobre se desvanece
    caja.solapa.style.transform = "rotateX(" + (fs * 180).toFixed(1) + "deg)";
    caja.solapa.style.zIndex = fs < 0.5 ? 170 : -1;
    caja.solapa.style.opacity = (1 - desv).toFixed(2);
    caja.fondo.style.opacity = (1 - desv).toFixed(2);
    caja.frente.style.opacity = (1 - cae).toFixed(2);
    caja.frente.style.transform = "translateY(" + (cae * 60).toFixed(1) + "px)";

    if (!pausa && fc > 0.97 && !reducirMovimiento) giro -= dt * 0.00022;

    var rx = Math.min(escenario.clientWidth * 0.38, 520);
    var rz = 380;
    var paso = (Math.PI * 2) / TOTAL;

    for (var k = 0; k < TOTAL; k++) {
      var a = (k * paso + giro) * fc;
      var seno = Math.sin(a), coseno = Math.cos(a);
      var profundidad = (coseno + 1) / 2;
      var activa = k === enfocada;
      var x = seno * rx;
      var z = (coseno - 1) * rz * 0.5;
      var objetivoIncl = activa ? 0 : -seno * 28;
      if (inclinacion[k] === undefined) inclinacion[k] = objetivoIncl;
      inclinacion[k] += (objetivoIncl - inclinacion[k]) * 0.18;
      var c = cartas[k];
      c.style.transform = "translate3d(" + x.toFixed(1) + "px,0," + z.toFixed(1) + "px) rotateY(" + inclinacion[k].toFixed(1) + "deg)";
      c.style.opacity = activa ? 1 : (0.3 + 0.7 * profundidad).toFixed(2);
      c.style.zIndex = activa ? 200 : Math.round(profundidad * 100);
      c.style.pointerEvents = coseno > 0.1 && fc > 0.9 ? "auto" : "none";
    }
    requestAnimationFrame(dibujar);
  }
  requestAnimationFrame(dibujar);

  /* ---------- Modal de galeria ---------- */
  var modal = document.getElementById("modal");
  var titulo = document.getElementById("modal-titulo");
  var visor = document.getElementById("visor");
  var miniaturas = document.getElementById("miniaturas");
  var origen = null;

  /* ---------- Visor 3D (Marmoset Viewer) ---------- */
  var visorMview = null;
  var pedidoMview = 0;

  function limpiarVisor() {
    pedidoMview++;
    if (visorMview && visorMview.unload) { try { visorMview.unload(); } catch (e) {} }
    visorMview = null;
    visor.classList.remove("con-imagen");
    visor.innerHTML = "";
  }

  /* La libreria de Marmoset se descarga solo la primera vez que hace falta */
  function cargarMarmoset(cuando, falla) {
    if (window.marmoset) { cuando(); return; }
    var s = document.createElement("script");
    s.src = "https://viewer.marmoset.co/main/marmoset.js";
    s.onload = cuando;
    s.onerror = falla;
    document.head.appendChild(s);
  }

  function montarMview(item) {
    var pedido = pedidoMview;
    visor.textContent = "Cargando modelo 3D…";
    function error() { if (pedido === pedidoMview) visor.textContent = "No se pudo cargar el modelo 3D."; }
    cargarMarmoset(function () {
      /* esperamos un frame para que el panel ya sea visible y tenga tamaño */
      requestAnimationFrame(function () {
        if (pedido !== pedidoMview) return;
        try {
          visor.innerHTML = "";
          var v = new marmoset.WebViewer(visor.clientWidth || 640, visor.clientHeight || 400, item.archivo);
          visorMview = v;
          visor.appendChild(v.domRoot);
          v.loadScene();
        } catch (e) { error(); }
      });
    }, error);
  }

  function mostrarEnVisor(indice, ruta, nombre) {
    limpiarVisor();
    if (ruta && typeof ruta === "object") {
      montarMview(ruta);
    } else if (ruta) {
      var im = document.createElement("img");
      im.src = ruta; im.alt = nombre + " - imagen " + (indice + 1);
      visor.classList.add("con-imagen");
      visor.appendChild(im);
    } else {
      visor.textContent = "Espacio para imagen " + (indice + 1);
    }
    miniaturas.querySelectorAll(".mini").forEach(function (m, n) { m.classList.toggle("activa", n === indice); });
  }

  function mostrarImagen(ruta, etiqueta, alt) {
    limpiarVisor();
    if (ruta) {
      var im = document.createElement("img");
      im.src = ruta; im.alt = alt;
      visor.classList.add("con-imagen");
      visor.appendChild(im);
    } else {
      visor.textContent = etiqueta;
    }
  }

  function construirSecciones(secciones) {
    visor.textContent = "Elige una sección y después un proyecto";
    secciones.forEach(function (sec) {
      var fila = document.createElement("div");
      fila.className = "fila";

      var boton = document.createElement("button");
      boton.type = "button";
      boton.className = "mini seccion";
      boton.textContent = sec.nombre;
      boton.setAttribute("aria-expanded", "false");

      var desplegable = document.createElement("div");
      desplegable.className = "desplegable";
      var carril = document.createElement("div");
      carril.className = "carril";

      sec.imagenes.forEach(function (ruta, n) {
        var m = document.createElement("button");
        m.type = "button";
        m.className = "mini proyecto";
        m.setAttribute("aria-label", sec.nombre + ": imagen " + (n + 1));
        if (ruta) { m.innerHTML = '<img src="' + ruta + '" alt="">'; } else { m.textContent = "Imagen " + (n + 1); }
        m.addEventListener("click", function () {
          miniaturas.querySelectorAll(".proyecto").forEach(function (o) { o.classList.remove("activa"); });
          m.classList.add("activa");
          mostrarImagen(ruta, "Espacio para imagen " + (n + 1) + " de " + sec.nombre, sec.nombre + " - imagen " + (n + 1));
        });
        carril.appendChild(m);
      });
      desplegable.appendChild(carril);

      boton.addEventListener("click", function () {
        var abierta = fila.classList.toggle("abierta");
        boton.classList.toggle("activa", abierta);
        boton.setAttribute("aria-expanded", abierta ? "true" : "false");
        if (abierta) {
          desplegable.style.maxWidth = carril.offsetWidth + "px";
        } else {
          desplegable.style.overflowX = "hidden";
          desplegable.style.maxWidth = "0px";
        }
      });
      desplegable.addEventListener("transitionend", function (ev) {
        if (ev.propertyName === "max-width" && fila.classList.contains("abierta")) desplegable.style.overflowX = "auto";
      });

      fila.appendChild(boton);
      fila.appendChild(desplegable);
      miniaturas.appendChild(fila);
    });
  }

  function abrirModal(indiceCategoria, disparador) {
    var cat = CATEGORIAS[indiceCategoria];
    var secciones = SECCIONES[cat.id];
    var imagenes = GALERIA[cat.id] || [];
    origen = disparador;
    titulo.textContent = cat.nombre;
    miniaturas.innerHTML = "";
    miniaturas.classList.toggle("secciones", !!secciones);
    if (secciones) {
      construirSecciones(secciones);
    } else imagenes.forEach(function (ruta, n) {
      var m = document.createElement("button");
      m.type = "button";
      m.className = "mini";
      m.setAttribute("aria-label", "Ver imagen " + (n + 1));
      if (ruta && typeof ruta === "object") {
        m.classList.add("mini-3d");
        m.setAttribute("aria-label", "Ver modelo 3D: " + (ruta.titulo || ""));
        m.innerHTML = ruta.miniatura ? '<img src="' + ruta.miniatura + '" alt="">' : '<span class="mini-3d-txt"><b>' + (ruta.titulo || "Modelo 3D") + '</b><small>Modelo 3D</small></span>';
      } else if (ruta) { m.innerHTML = '<img src="' + ruta + '" alt="">'; } else { m.textContent = "Imagen " + (n + 1); }
      m.addEventListener("click", function () { mostrarEnVisor(n, ruta, cat.nombre); });
      miniaturas.appendChild(m);
    });
    if (!secciones) mostrarEnVisor(0, imagenes[0], cat.nombre);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("cerrar").focus();
  }

  function cerrarModal() {
    limpiarVisor();
    modal.hidden = true;
    document.body.style.overflow = "";
    if (origen) origen.focus({ preventScroll: true });
  }
  document.getElementById("cerrar").addEventListener("click", cerrarModal);
  modal.addEventListener("click", function (ev) { if (ev.target === modal) cerrarModal(); });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && !modal.hidden) cerrarModal(); });
})();