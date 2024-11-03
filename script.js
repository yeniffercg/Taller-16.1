const url =  `https://rickandmortyapi.com/api/character`;

document.getElementById('btnBuscar').addEventListener('click', () => {
  const nombre = document.getElementById('inputBuscar').value.trim();
  if (nombre) {
    buscarPersonaje(nombre);
  }
});


function buscarPersonaje(nombre) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const personajes = data.results.filter(personaje => 
        personaje.name.toLowerCase().includes(nombre.toLowerCase())
      );
      mostrarResultados(personajes);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function mostrarResultados(personajes) {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = ''; 

  if (personajes.length > 0) {
    personajes.forEach(personaje => {
      const card = document.createElement('div');
      card.classList.add('col');

      card.innerHTML = `
        <div class="card h-100">
          <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
          <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class="card-text">Especie: ${personaje.species}</p>
            <p class="card-text">Estado: ${personaje.status}</p>
          </div>
        </div>
      `;

      contenedor.appendChild(card);
    });
  } else {
    contenedor.innerHTML = '<p class="text-center">No se encontraron personajes.</p>';
  }
}