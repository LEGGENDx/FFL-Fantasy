document.getElementById('language-toggle').addEventListener('click', function() {
    const currentLang = this.innerText;
    if (currentLang === 'Español') {
        this.innerText = 'English';
        document.querySelector('h1').innerText = 'FFL Fantasy Manager';
        document.getElementById('create-league').innerText = 'Crear Nueva Liga';
        document.getElementById('join-league').innerText = 'Unirse a una Liga';
        document.querySelector('h2').innerText = 'Bienvenido al Fantasy de FFL';
        document.querySelector('p').innerText = 'Selecciona una opción del menú para empezar.';
    } else {
        this.innerText = 'Español';
        document.querySelector('h1').innerText = 'FFL Fantasy Manager';
        document.getElementById('create-league').innerText = 'Create New League';
        document.getElementById('join-league').innerText = 'Join League';
        document.querySelector('h2').innerText = 'Welcome to the FFL Fantasy';
        document.querySelector('p').innerText = 'Select an option from the menu to get started.';
    }
});

document.getElementById('create-league').addEventListener('click', function() {
    let leagueName = prompt('Enter the name of your league:');
    if (leagueName) {
        document.getElementById('main-content').innerHTML = `<h2>League: ${leagueName}</h2><p>Your league has been created successfully! Now you can start adding players.</p>`;
        loadPlayers();
    }
});

document.getElementById('league-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let leagueName = document.getElementById('league-name').value;
    if (leagueName) {
        document.getElementById('league-created').innerHTML = `<h2>League: ${leagueName}</h2><p>Your league has been created successfully! Now you can start adding players.</p>`;
        loadPlayers();  // Llamamos a la función que asigna jugadores una vez creada la liga
    }
});

// Función para cargar los jugadores desde el CSV
function loadPlayers() {
    Papa.parse('data/players.csv', {
        download: true,
        header: true,
        complete: function(results) {
            console.log("Players data loaded:", results.data);  // Verifica los datos cargados
            if (results.errors.length > 0) {
                console.error("Error loading CSV:", results.errors);  // Imprime errores si los hay
            }
            assignRandomPlayers(results.data);
        }
    });
}


// Asignar jugadores aleatoriamente
function assignRandomPlayers(players) {
    let team = [];
    for (let i = 0; i < 7; i++) {
        let randomIndex = Math.floor(Math.random() * players.length);
        team.push(players[randomIndex]);
        players.splice(randomIndex, 1);  // Eliminar jugador seleccionado
    }
    console.log(team);  // Verificar que el equipo se esté generando correctamente
    displayTeam(team);  // Mostrar las tarjetas del equipo
}

// Mostrar las tarjetas de los jugadores
function displayTeam(team) {
    let teamHTML = '<h2>Your Team:</h2>';
    team.forEach(player => {
        teamHTML += `
            <div class="player-card">
                <img src="images/${player.photo}" alt="${player.name}" class="player-photo">
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <p>Position: ${player.position}</p>
                    <p>Country: <img src="images/${player.country}" class="player-country"></p>
                    <p>Team: <img src="images/${player.logo}" class="player-team"></p>
                    <p>Points: 0</p>
                </div>
            </div>`;
    });
    document.getElementById('main-content').innerHTML = teamHTML;
}
