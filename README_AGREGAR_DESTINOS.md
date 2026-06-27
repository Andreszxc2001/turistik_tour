# Cómo Agregar Nuevos Destinos al Sistema Data-Driven

Este sitio web utiliza una arquitectura completamente orientada a datos (data-driven). Para agregar un nuevo destino, solo necesitas crear un archivo JSON en la carpeta `data/` y actualizar dos líneas de código.

## Pasos para Agregar un Nuevo Destino

### 1. Crear el archivo JSON del destino

Crea un nuevo archivo JSON en la carpeta `data/` con la siguiente estructura (usa los archivos existentes como referencia):

**Ejemplo: `data/Palomino.json`**

```json
[
  {
    "nombre": "Palomino",
    "slug": "palomino-la-guajira",
    "tipo": "playa y pueblo costero",
    "descripcion_corta": "Pueblo costero con playas de arena blanca y río Palomino, ideal para surf y relax.",
    "descripcion_larga": "Descripción detallada del destino...",
    "historia": "Historia del lugar...",
    "importancia_turistica": "Por qué es importante turísticamente...",
    "cultura": "Información cultural...",
    "tradiciones": "Tradiciones locales...",
    "gastronomia": [
      "Plato 1",
      "Plato 2"
    ],
    "flora": [
      "Planta 1",
      "Planta 2"
    ],
    "fauna": [
      "Animal 1",
      "Animal 2"
    ],
    "clima": {
      "descripcion": "Descripción del clima...",
      "temperatura_promedio": "28-32°C",
      "mejor_epoca": "Diciembre a abril"
    },
    "ubicacion": {
      "municipio": "Palomino",
      "departamento": "La Guajira",
      "pais": "Colombia",
      "latitud": 11.2345,
      "longitud": -73.4567
    },
    "como_llegar": "Instrucciones para llegar...",
    "precio_ingreso": {
      "valor": 5000,
      "moneda": "COP",
      "observaciones": "Observaciones sobre el precio..."
    },
    "horarios": "Horarios de acceso...",
    "duracion_recomendada": "1-2 días",
    "nivel_dificultad": "Bajo",
    "ideal_para": [
      "Turistas de playa",
      "Surfistas",
      "Familias"
    ],
    "actividades": [
      "Actividad 1",
      "Actividad 2"
    ],
    "atracciones": [
      "Atracción 1",
      "Atracción 2"
    ],
    "consejos": [
      "Consejo 1",
      "Consejo 2"
    ],
    "curiosidades": [
      "Curiosidad 1",
      "Curiosidad 2"
    ],
    "imagenes_busqueda": [
      "palomino playa Colombia",
      "río Palomino surf"
    ],
    "seo": {
      "titulo": "Palomino, La Guajira | Playa y Surf en el Caribe Colombiano",
      "descripcion": "Descubre Palomino, un paraíso costero en La Guajira con playas vírgenes, río Palomino y surf. Guía completa.",
      "keywords": ["Palomino La Guajira", "playa Palomino Colombia", "surf La Guajira", "río Palomino"]
    }
  }
]
```

**Importante:** El archivo JSON debe ser un array que contenga un solo objeto (entre corchetes `[]`).

### 2. Actualizar `index.html`

Agrega el nombre del archivo JSON al array `destinationFiles` en el JavaScript de `index.html` (línea ~870):

```javascript
const destinationFiles = [
  'Riohacha.json',
  'Cabo_de_la_Vela.json',
  'Punta_Gallinas.json',
  'Dunas_de_Taroa.json',
  'Faro_Punta_Gallinas.json',
  'Pilón_de_Azucar.json',
  'Playa_Arcoíris.json',
  'Bahía_Portete.json',
  'Santuario_Flamencos.json',
  'Palomino.json'  // <-- AGREGAR ESTA LÍNEA
];
```

### 3. Actualizar `tour.html`

Agrega el mapeo del slug al nombre del archivo en el objeto `slugToFileMap` en el JavaScript de `tour.html` (línea ~219):

```javascript
const slugToFileMap = {
  'riohacha-la-guajira': 'Riohacha.json',
  'cabo-de-la-vela-la-guajira': 'Cabo_de_la_Vela.json',
  'punta-gallinas-la-guajira': 'Punta_Gallinas.json',
  'dunas-de-taroa-punta-gallinas': 'Dunas_de_Taroa.json',
  'faro-punta-gallinas': 'Faro_Punta_Gallinas.json',
  'pilon-de-azucar-cabo-de-la-vela': 'Pilón_de_Azucar.json',
  'playa-arcoiris-cabo-de-la-vela': 'Playa_Arcoíris.json',
  'bahia-portete-la-guajira': 'Bahía_Portete.json',
  'santuario-los-flamencos-la-guajira': 'Santuario_Flamencos.json',
  'palomino-la-guajira': 'Palomino.json'  // <-- AGREGAR ESTA LÍNEA
};
```

**Nota:** La clave (izquierda) debe ser el valor del campo `slug` en tu archivo JSON, y el valor (derecha) debe ser el nombre exacto del archivo JSON.

### 4. ¡Listo!

Al recargar `index.html`, el nuevo destino aparecerá automáticamente:
- En el slider de destinos destacados
- En la sección de tours
- Con un enlace a `tour.html?destino=palomino-la-guajira`

Cuando un usuario haga clic en la tarjeta, `tour.html` cargará automáticamente toda la información del destino desde `Palomino.json`.

## Arquitectura del Sistema

```
index.html
    │
    ├── Carga body.json (navbar, footer, configuración global)
    ├── Lee todos los JSON de destinos del array destinationFiles
    ├── Genera tarjetas dinámicamente para cada destino
    └── Al hacer clic →
                tour.html?destino=slug-del-destino
                          │
                          ▼
                Lee el parámetro destino de la URL
                          │
                          ▼
                Busca el archivo JSON en slugToFileMap
                          │
                          ▼
                Carga el JSON correspondiente
                          │
                          ▼
                Renderiza toda la información dinámicamente
```

## Campos Requeridos en el JSON

Para que el destino se muestre correctamente, el JSON debe incluir al menos estos campos:

- `nombre` - Nombre del destino
- `slug` - Identificador único para la URL (debe coincidir con la clave en slugToFileMap)
- `tipo` - Tipo de destino
- `descripcion_corta` - Descripción breve para la tarjeta
- `descripcion_larga` - Descripción completa
- `ubicacion` - Objeto con municipio, departamento, país
- `precio_ingreso` - Objeto con valor, moneda y observaciones
- `duracion_recomendada` - Tiempo recomendado de visita
- `seo` - Objeto con título, descripción y keywords para SEO

## Ventajas de esta Arquitectura

1. **Sin duplicación de código**: Agregar un destino es solo crear un JSON
2. **Mantenimiento fácil**: Cambiar información es editar un JSON
3. **Escalable**: Puedes agregar cientos de destinos sin tocar el HTML
4. **Consistente**: Todos los destinos tienen la misma estructura
5. **SEO-friendly**: Cada destino tiene sus propios meta tags dinámicos

## Archivos JSON Existentes

- `Riohacha.json` → `riohacha-la-guajira`
- `Cabo_de_la_Vela.json` → `cabo-de-la-vela-la-guajira`
- `Punta_Gallinas.json` → `punta-gallinas-la-guajira`
- `Dunas_de_Taroa.json` → `dunas-de-taroa-punta-gallinas`
- `Faro_Punta_Gallinas.json` → `faro-punta-gallinas`
- `Pilón_de_Azucar.json` → `pilon-de-azucar-cabo-de-la-vela`
- `Playa_Arcoíris.json` → `playa-arcoiris-cabo-de-la-vela`
- `Bahía_Portete.json` → `bahia-portete-la-guajira`
- `Santuario_Flamencos.json` → `santuario-los-flamencos-la-guajira`
