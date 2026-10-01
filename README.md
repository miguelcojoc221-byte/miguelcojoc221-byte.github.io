# Portafolio de Miguel Angel Cojoc Caal

Mi página web personal. Está hecha con **HTML, CSS y JavaScript puro**.
No necesita programas extras ni instalar nada: solo abrir el archivo y listo.

El diseño es oscuro con colores de degradado (índigo, violeta y azul).
Se ve bien en computadora y en celular.

## Cómo están organizados los archivos

```
portafolio-miguel-cojoc/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── docs/
│       └── CV_Miguel_Cojoc_Caal.pdf
└── README.md
```

Qué hace cada uno:

- `index.html`: la página completa.
- `css/styles.css`: los colores, las animaciones y cómo se ve en celular.
- `js/main.js`: el menú, las animaciones y el formulario.
- `assets/docs/CV_Miguel_Cojoc_Caal.pdf`: mi CV en PDF.
- `README.md`: este archivo.

## Cómo abrir mi portafolio

1. Entra a la carpeta `portafolio-miguel-cojoc`.
2. Haz doble clic en `index.html`.
3. Se abre en tu navegador y ya está.

Si prefieres usar un servidor local, abre la carpeta en una terminal y escribe:

```bash
python -m http.server 8000
```

Después entra a `http://localhost:8000` en el navegador.

## Qué tiene la página

1. **Inicio** — Mi nombre, mi título y dos botones: ver proyectos y descargar el CV.
2. **Sobre mí** — Quién soy y mis datos de contacto.
3. **Experiencia** — Dónde trabajé antes (Emmy Store y Comunicátel).
4. **Formación** — Mis escuelas y los cursos que terminé.
5. **Habilidades** — Qué sé hacer, con barras que se llenan al bajar.
6. **Proyectos** — Tarjetas con proyectos (falta poner los míos de verdad).
7. **Contacto** — Mis datos y un formulario que abre el correo.

## Qué puedo cambiar yo

- **Mis proyectos:** en `index.html`, busca la parte de `id="proyectos"`.
  Cambia los tres ejemplos por mis proyectos reales y pon los enlaces donde dice `href="#"`.
- **Los porcentajes de habilidades:** en `index.html` busca `data-level="90"` y
  cambia el número por el que quiera.
- **Mi perfil:** si mi CV cambia, actualizo el texto del inicio y de "Sobre mí".
- **Los colores:** en `css/styles.css`, están las variables `--gradient`, `--accent` y `--bg`.
- **Las fuentes:** en `css/styles.css`, las variables `--font-title` y `--font-body`.

## Cómo publicarlo gratis

### Opción 1: GitHub Pages
1. Creo un repositorio en GitHub (por ejemplo, `portafolio`).
2. Subo el contenido de la carpeta.
3. Entra a **Settings**, luego a **Pages**, elijo la rama `main` y guardo.
4. Mi página queda en `https://TU-USUARIO.github.io/portafolio/`.

### Opción 2: Netlify (más fácil)
1. Entra a `https://app.netlify.com/drop`.
2. Arrastro la carpeta del portafolio a la página.
3. Me da un enlace para compartir al instante.

## Qué cosas buenas tiene el código

- **HTML semántico:** usa etiquetas como `header`, `nav`, `main`, `section` y `footer`.
  Esto ayuda a Google a entender la página.
- **Accesibilidad:** se puede navegar con el teclado, tiene textos para lectores de
  pantalla y respeta la opción de reducir animaciones del celular.
- **SEO:** tiene título, descripción y datos para que aparezca bien en los buscadores.
- **CSS moderno:** usa variables, Grid y Flexbox, y tipografía que se ajusta sola.
- **JavaScript sin librerías:** todo está escrito a mano, sin dependencias.

---
Hecho con HTML, CSS y JavaScript · Alta Verapaz, Guatemala
