 function Buscarpokemon(contenedornumero) {
    let inputid = `pokemoninput${contenedornumero}`;
    let nombrepokemon = document.getElementById(inputid).value.trim().toLowerCase();
    let urlapi = `https://pokeapi.co/api/v2/pokemon/${nombrepokemon}`;

    fetch(urlapi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(datospokemon => mostrarpokemon(datospokemon, contenedornumero))
        .catch(error => mostrarError(contenedornumero, error.message));
}

function mostrarpokemon(datospokemon, contenedornumero) {
    let infoDivId = `pokemoninfo${contenedornumero}`;
    let infoDiv = document.getElementById(infoDivId);
    
    // Función para crear las barras de stats
    const createStatBar = (name, value) => {
        const maxStatValue = 150; // Valor máximo para la escala visual
        const widthPercent = (value / maxStatValue) * 100;
        
        return `
            <div class="stat-row">
                <div class="stat-label">${name} ${value}</div>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${widthPercent > 100 ? 100 : widthPercent}%"></div>
                </div>
            </div>
        `;
    };
    
    // Generar el HTML de las barras de stats
    const statsHTML = datospokemon.stats.map(stat => {
        // Mapeo de nombres de stats largos a cortos
        const nameMap = {
            'hp': 'HP',
            'peso': 'peso',
            'altura': 'altura',
            'speed': 'Speed',
            'special-attack': 'Sp. Atk',
            'special-defense': 'Sp. Def'
        };
        const statName = nameMap[stat.stat.name] || stat.stat.name;
        
        // Usar el arte oficial del Pokémon si existe, si no, el sprite frontal
        const spriteUrl = datospokemon.sprites.other['official-artwork']?.front_default 
                          || datospokemon.sprites.front_default;
        
        return createStatBar(statName, stat.base_stat);
    }).join('');

    // Estructura HTML de la tarjeta, incluyendo header de color y barras de stats
    infoDiv.innerHTML = `
        <div class="pokemon-result">
            <div class="pk-header">
                <div class="pk-name">${datospokemon.name.toUpperCase()}</div>
                <div class="pk-id">#${datospokemon.id}</div>
            </div>
            
            <img src="${datospokemon.sprites.other['official-artwork']?.front_default || datospokemon.sprites.front_default}" 
                 alt="${datospokemon.name}" 
                 class="pk-img">
            
            <div class="pk-stats">
                ${statsHTML}
            </div>
            
            <div class="pk-type">Tipo(s): ${datospokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</div>
        </div>
    `;
}

function mostrarError(contenedornumero, mensaje = "Pokémon no encontrado o problema de conexión.") {
    let infoDivId = `pokemoninfo${contenedornumero}`;
    let infoDiv = document.getElementById(infoDivId);
    infoDiv.innerHTML = `
        <div style="color: red; font-size: 1.2em; margin-top: 50px;">
            ¡Error! ${mensaje}.<br>Intenta con otro nombre o número.
        </div>
    `;
}

// Muestra Pokémon iniciales al cargar la página (Pikachu y Charmander)
window.onload = function() {
    document.getElementById("pokemoninput1").value = "25"; // Pikachu
    Buscarpokemon(1);
    document.getElementById("pokemoninput2").value = "4";  // Charmander
    Buscarpokemon(2);
};


function mostrarpokemon(datospokemon, contenedornumero) {
    let infoDivId = `pokemoninfo${contenedornumero}`;
    let infoDiv = document.getElementById(infoDivId);
    
    // Función para crear las barras de stats (mantener sin cambios)
    const createStatBar = (name, value, maxVal = 150) => {
        // Usamos un valor máximo diferente (100) para las propiedades básicas como ID, Peso, Altura
        const maxStatValue = (name === 'HP' || name === 'Attack' || name === 'Defense' || name === 'Speed') ? maxVal : 100;
        const widthPercent = (value / maxStatValue) * 100;
        
        return `
            <div class="stat-row">
                <div class="stat-label">${name} ${value}</div>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${widthPercent > 100 ? 100 : widthPercent}%"></div>
                </div>
            </div>
        `;
    };

    // 1. Generar el HTML para las PROPIEDADES BÁSICAS (Número, Altura, Peso)
    // Usamos el valor real dividido para mantener la escala
    const basicPropsHTML = [
        createStatBar('Nº', datospokemon.id, 150), // Número del Pokémon
        createStatBar('Altura', datospokemon.height / 10, 30), // Altura en metros
        createStatBar('Peso', datospokemon.weight / 10, 100)  // Peso en kilogramos
    ].join('');


    // 2. Generar el HTML para las ESTADÍSTICAS DE COMBATE (HP, Attack, etc.)
    const statsHTML = datospokemon.stats.map(stat => {
        // Mapeo de nombres de stats largos a cortos
        const nameMap = {
            'hp': 'HP',
            'attack': 'Attack',
            'defense': 'Defense',
            'speed': 'Speed',
            'special-attack': 'Sp. Atk',
            'special-defense': 'Sp. Def'
        };
        const statName = nameMap[stat.stat.name] || stat.stat.name;
        
        return createStatBar(statName, stat.base_stat); // Usa 150 como max por defecto
    }).join('');


    // Estructura HTML final de la tarjeta
    infoDiv.innerHTML = `
        <div class="pokemon-result">
            <div class="pk-header">
                <div class="pk-name">${datospokemon.name.toUpperCase()}</div>
                </div>
            
            <img src="${datospokemon.sprites.other['official-artwork']?.front_default || datospokemon.sprites.front_default}" 
                 alt="${datospokemon.name}" 
                 class="pk-img">
            
            <div class="pk-stats">
                <h2>Datos Básicos</h2>
                ${basicPropsHTML} 

                <h2 style="margin-top: 15px;">Estadísticas</h2>
                ${statsHTML}
            </div>
            
            <div class="pk-type">Tipo(s): ${datospokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</div>
        </div>
    `;
}
// Mantener el resto del código (Buscarpokemon, mostrarError, window.onload) sin cambios.