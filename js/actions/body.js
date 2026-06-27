//---------------------------------------------//
//FUNCION PARA CARGAR DATOS DE JSON
//---------------------------------------------//
async function body() 
{
    try 
        {
        const bodyData = await (await fetch('../data/body.json')).json();

            //extrear datos de JSON
            document.querySelector('title').textContent                = bodyData.site_config.identidad.nombre_sitio;
            document.querySelector('.navbar-brand').textContent        = bodyData.site_config.identidad.nombre_sitio;
            document.querySelector('.hero-wrap h1 strong').textContent = bodyData.site_config.identidad.slogan;
            document.querySelector('.hero-wrap p').textContent         = bodyData.site_config.identidad.descripcion_meta;
            document.querySelector('#nit-display').textContent         = bodyData.site_config.identidad.nit;

            // Redes sociales en hero
            document.querySelector('#hero-facebook').href              = bodyData.site_config.redes_sociales.facebook.url;
            document.querySelector('#hero-instagram').href             = bodyData.site_config.redes_sociales.instagram.url;
            document.querySelector('#hero-tiktok').href                = bodyData.site_config.redes_sociales.tiktok.url;
            document.querySelector('#hero-whatsapp').href              = bodyData.site_config.redes_sociales.whatsapp.url;


            // Footer brand y descripción
            document.querySelector('#footer-brand').textContent        = bodyData.site_config.identidad.nombre_sitio;
            document.querySelector('#footer-description').textContent  = bodyData.site_config.seo_global.descripcion_defecto;

            // Footer columnas
            document.querySelector('#footer-col1-title').textContent   = bodyData.site_config.navegacion.footer_links.columna_1.titulo;
            const col1Links                                            = document.querySelector('#footer-col1-links');
            col1Links.innerHTML                                        = '';
            
            //iteracion de 
            bodyData.site_config.navegacion.footer_links.columna_1.links.forEach(link => 
            {
                col1Links.innerHTML += `<li><a href="${link.ruta}" class="py-2 d-block">${link.label}</a></li>`;
            });

            document.querySelector('#footer-col2-title').textContent = bodyData.site_config.navegacion.footer_links.columna_2.titulo;
            const col2Links = document.querySelector('#footer-col2-links');
            col2Links.innerHTML = '';
            bodyData.site_config.navegacion.footer_links.columna_2.links.forEach(link => {
                col2Links.innerHTML += `<li><a href="${link.ruta}" class="py-2 d-block">${link.label}</a></li>`;
            });

            document.querySelector('#footer-col3-title').textContent = bodyData.site_config.navegacion.footer_links.columna_3.titulo;
            const col3Links = document.querySelector('#footer-col3-links');
            col3Links.innerHTML = '';
            bodyData.site_config.navegacion.footer_links.columna_3.links.forEach(link => {
                col3Links.innerHTML += `<li><a href="${link.ruta}" class="py-2 d-block">${link.label}</a></li>`;
            });

            // Footer copyright
            document.querySelector('#footer-copyright').innerHTML = `
                ${bodyData.site_config.copyright.texto}<br>
                <a href="${bodyData.site_config.copyright.portafolio_url}" target="_blank" style="color: inherit; text-decoration: none;">${bodyData.site_config.copyright.desarrollador}</a>
            `;

        } 
    catch (error) 
        {
            console.error('Error:', error);
        }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', body);

//---------------------------------------------//
//FUNCION PARA CARGAR DATOS DE ABOUT
//---------------------------------------------//
async function about() 
{
    try 
        {
        const aboutData = await (await fetch('../data/about.json')).json();

            // Título de la página
            document.querySelector('title').textContent = aboutData.about.meta_seo.titulo_pagina;

            // Navbar brand
            if (document.querySelector('#about-navbar-brand')) {
                document.querySelector('#about-navbar-brand').textContent = aboutData.about.empresa;
            }

            // Hero title
            if (document.querySelector('#about-hero-title')) {
                document.querySelector('#about-hero-title').textContent = 'Sobre Nosotros';
            }

            // Historia
            if (document.querySelector('#about-history-title')) {
                document.querySelector('#about-history-title').textContent = 'Nuestra Historia';
            }
            if (document.querySelector('#about-history-text')) {
                document.querySelector('#about-history-text').textContent = aboutData.about.fundacion.historia;
            }

            // Misión
            if (document.querySelector('#about-mission-title')) {
                document.querySelector('#about-mission-title').textContent = 'Nuestra Misión';
            }
            if (document.querySelector('#about-mission-text')) {
                document.querySelector('#about-mission-text').textContent = aboutData.about.mision;
            }

            // Visión
            if (document.querySelector('#about-vision-title')) {
                document.querySelector('#about-vision-title').textContent = 'Nuestra Visión';
            }
            if (document.querySelector('#about-vision-text')) {
                document.querySelector('#about-vision-text').textContent = aboutData.about.vision;
            }

            // Valores
            if (document.querySelector('#about-valores')) {
                const valoresContainer = document.querySelector('#about-valores');
                valoresContainer.innerHTML = '';
                aboutData.about.valores.forEach(valor => {
                    valoresContainer.innerHTML += `
                        <div class="col-md-4 ftco-animate">
                            <div class="text p-4">
                                <h3>${valor.nombre}</h3>
                                <p>${valor.descripcion}</p>
                            </div>
                        </div>
                    `;
                });
            }

            // Equipo
            if (document.querySelector('#about-equipo')) {
                const equipoContainer = document.querySelector('#about-equipo');
                equipoContainer.innerHTML = '';
                aboutData.about.equipo.forEach(miembro => {
                    equipoContainer.innerHTML += `
                        <div class="col-md-4 ftco-animate">
                            <div class="text p-4">
                                <h3>${miembro.nombre}</h3>
                                <p><strong>${miembro.cargo}</strong></p>
                                <p>${miembro.descripcion}</p>
                            </div>
                        </div>
                    `;
                });
            }

            // Números destacados
            if (document.querySelector('#about-numeros')) {
                const numerosContainer = document.querySelector('#about-numeros');
                numerosContainer.innerHTML = '';
                aboutData.about.numeros_destacados.forEach(numero => {
                    numerosContainer.innerHTML += `
                        <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                            <div class="block-18 text-center">
                                <div class="text">
                                    <strong class="number">${numero.valor}</strong>
                                    <span>${numero.label}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            // Por qué elegirnos
            if (document.querySelector('#about-por-que-elegirnos')) {
                const porQueContainer = document.querySelector('#about-por-que-elegirnos');
                porQueContainer.innerHTML = '';
                aboutData.about.por_que_elegirnos.forEach(razon => {
                    porQueContainer.innerHTML += `
                        <div class="col-md-6 ftco-animate">
                            <div class="text p-4">
                                <h3>${razon.titulo}</h3>
                                <p>${razon.descripcion}</p>
                            </div>
                        </div>
                    `;
                });
            }

            // Testimonios
            if (document.querySelector('#about-testimonios')) {
                const testimoniosContainer = document.querySelector('#about-testimonios');
                testimoniosContainer.innerHTML = '';
                aboutData.about.testimonios.forEach(testimonio => {
                    testimoniosContainer.innerHTML += `
                        <div class="item">
                            <div class="testimony-wrap d-flex">
                                <div class="text ml-md-4">
                                    <p class="mb-5">"${testimonio.texto}"</p>
                                    <p class="name">${testimonio.nombre}</p>
                                    <span class="position">${testimonio.ciudad} - ${testimonio.fecha}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

        } 
    catch (error) 
        {
            console.error('Error al cargar about.json:', error);
        }
}

// Ejecutar si estamos en about.html
if (window.location.pathname.includes('about.html')) {
    document.addEventListener('DOMContentLoaded', about);
}