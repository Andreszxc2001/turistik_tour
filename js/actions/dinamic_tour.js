const url = new URL(window.location.href);

const slug = url.searchParams.get("destino");

if(!slug){
    return;
}

const response = await fetch(`../data/${slug}.json`);
const data = await response.json();

const destino = data[0];