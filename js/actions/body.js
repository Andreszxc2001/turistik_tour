//---------------------------------------------//
// FUNCIÓN PARA CARGAR DESTINOS DESDE JSON
//---------------------------------------------//
async function cargarDestinos() {
    const archivosDestinos = [
        { archivo: 'Punta_Gallinas.json',      imagen: 'images/destination-1.jpg' },
        { archivo: 'Cabo_de_la_Vela.json',     imagen: 'images/destination-2.jpg' },
        { archivo: 'Dunas_de_Taroa.json',      imagen: 'images/destination-3.jpg' },
        { archivo: 'Santuario_Flamencos.json', imagen: 'images/destination-4.jpg' },
    ];

    const destinos = [];

    for (const { archivo, imagen } of archivosDestinos) {
        try {
            const response = await fetch('../data/Punta_Gallinas.json').then(r => r.json()).then(d => console.log(d)).catch(e => console.error(e));
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const item = Array.isArray(data) ? data[0] : data;
            if (item) destinos.push({ ...item, _imagen: imagen });
        } catch (err) {
            console.warn(`No se pudo cargar ${archivo}:`, err.message);
        }
    }

    const container = document.querySelector('#destinos-container');
    if (!container || destinos.length === 0) return; // mantiene el HTML estático

    container.innerHTML = destinos.map(d => {
        // Extraer precio: primero busca campo directo, luego en observaciones
        const precio =
            d.precio_ingreso?.valor
                ? `$${Number(d.precio_ingreso.valor).toLocaleString('es-CO')} COP`
                : (d.precio_ingreso?.observaciones?.match(/\$[\d.,]+(?:\s*COP)?/)?.[0] ?? 'Consultar');

        const duracion  = d.duracion_recomendada || '3-4 días';
        const municipio = d.ubicacion?.municipio || d.nombre || '';
        const depto     = d.ubicacion?.departamento || 'La Guajira';
        const desc      = d.descripcion_corta || 'Descubre este increíble destino en La Guajira.';

        return `
        <div class="col-sm col-md-6 col-lg ftco-animate">
            <div class="destination">
                <a href="#" class="img img-2 d-flex justify-content-center align-items-center"
                   style="background-image: url(${d._imagen});">
                    <div class="icon d-flex justify-content-center align-items-center">
                        <span class="icon-search2"></span>
                    </div>
                </a>
                <div class="text p-3">
                    <div class="d-flex">
                        <div class="one">
                            <h3><a href="#">Tour ${d.nombre}</a></h3>
                            <p class="rate">
                                <i class="icon-star"></i>
                                <i class="icon-star"></i>
                                <i class="icon-star"></i>
                                <i class="icon-star"></i>
                                <i class="icon-star-o"></i>
                                <span>8 Rating</span>
                            </p>
                        </div>
                        <div class="two">
                            <span class="price">${precio}</span>
                        </div>
                    </div>
                    <p>${desc}</p>
                    <p class="days"><span>${duracion}</span></p>
                    <hr>
                    <p class="bottom-area d-flex">
                        <span><i class="icon-map-o"></i> ${municipio}, ${depto}</span>
                        <span class="ml-auto"><a href="#">Descubrir</a></span>
                    </p>
                </div>
            </div>
        </div>`;
    }).join('');
}

// Solo ejecutar en index
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', cargarDestinos);
}