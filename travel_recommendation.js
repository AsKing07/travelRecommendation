var beaches;
var countries;
var temples;

fetchRecommendations = () => {
    fetch('travel_recommendation_api.json')
        .then(result => result.json())
        .then(data => {
            console.log(data);
            beaches = data.beaches;
            countries = data.countries;
            temples = data.temples;
        })
        .catch(error => console.log('Error:', error));
}

fetchRecommendations();

var searchBtn = document.getElementById('btnSearch');

function keyWordSearch() {
    console.log('search button clicked');

    let input = document.getElementById('searchInput').value.toLowerCase(); // Normalisation de l'entrée utilisateur
    console.log(input);

    // Recherche spécifique pour les plages
    if (input.includes('beach') || input === 'beaches') {
        displayRecommendations(beaches);

    // Recherche spécifique pour les temples
    } else if (input.includes('temple') || input === 'temples') {
        displayRecommendations(temples);

    // Recherche spécifique pour les pays
    } else if (input.includes('countr') || input === 'countries') {
        displayAllCountries(); // Affiche toutes les données des pays
    } else {
        // Recherche d'un pays spécifique par nom
        let countryFound = countries.find(country => country.name.toLowerCase() === input);

        if (countryFound) {
            displayCountryDetails(countryFound); // Affiche les données du pays trouvé
        } else {
            alert('No recommendations found'); // Alerte si aucun résultat
        }
    }
}

// Fonction pour afficher toutes les données des pays
function displayAllCountries() {
    console.log('Displaying all countries');
    let allCountries = countries.map(country => ({
        name: country.name,
        description: `Includes ${country.cities.length} cities.`,
        imageUrl: country.cities[0]?.imageUrl || ''
    }));
    displayRecommendations(allCountries);
}

// Fonction pour afficher les détails d'un pays spécifique
function displayCountryDetails(country) {
    console.log(`Displaying details for country: ${country.name}`);
    let countryDetails = country.cities.map(city => ({
        name: city.name,
        description: city.description,
        imageUrl: city.imageUrl
    }));
    displayRecommendations(countryDetails);
}


var clearBtn = document.getElementById('btnClear');

clear = () => {
    let searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    let recommendationsSection = document.getElementsByClassName('recommendations')[0];
    recommendationsSection.classList.add('hidden');

// clear the input field
document.getElementById('searchInput').value = '';

}

clearBtn.addEventListener('click', clear);

// Fonction pour afficher toutes les données des pays
function displayAllCountries() {
    console.log('Displaying all countries');
    let allCities =  [];
    countries.forEach(country =>{
        country.cities.forEach(city => {
            allCities.push({
                name: city.name,
                description: city.description,
                imageUrl: city.imageUrl
            })
        })

    })
    
 
    displayRecommendations(allCities);
}

// Fonction pour afficher les détails d'un pays spécifique
function displayCountryDetails(country) {
    console.log(`Displaying details for country: ${country.name}`);
    let countryDetails = country.cities.map(city => ({
        name: city.name,
        description: city.description,
        imageUrl: city.imageUrl
    }));
    displayRecommendations(countryDetails);
}

function displayRecommendations(items) {
    console.log('Displaying recommendations');

    let recommendationsSection = document.getElementsByClassName('recommendations')[0];
    recommendationsSection.classList.remove('hidden'); // Affiche la section des résultats si elle est masquée

    let searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Réinitialise les résultats affichés précédemment

    // Parcours des éléments à afficher
    items.forEach(item => {
        console.log(item.name);

        // Création d'une carte pour chaque élément
        let card = document.createElement('div');
        card.classList.add('searchResultCard');

        // Ajout de l'image si disponible
        if (item.imageUrl) {
            let image = document.createElement('img');
            image.src = item.imageUrl;
            image.alt = item.name; // Texte alternatif pour l'image
            image.classList.add('searchResultImage');
            card.appendChild(image);
        }

        // Ajout du titre
        let title = document.createElement('h3');
        title.textContent = item.name;
        card.appendChild(title);

        // Ajout de la description si disponible
        if (item.description) {
            let description = document.createElement('p');
            description.textContent = item.description;
            description.classList.add('searchResultDescription');
            card.appendChild(description);
        }

        // Bouton d'action
        let button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = 'Visit';
        button.addEventListener('click', () => {
            alert(`You selected: ${item.name}`);
        });
        card.appendChild(button);

        // Ajout de la carte au conteneur des résultats
        searchResults.appendChild(card);
    });
}


searchBtn.addEventListener('click', keyWordSearch);