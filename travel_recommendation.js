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

    let input = document.getElementById('searchInput').value.toLowerCase(); // Simplification de la logique
    console.log(input);

    if (input.includes('beach') || input === 'beaches') {
        displayRecommendations(beaches);
    } else if (input.includes('countr') || input === 'countries') {
        displayRecommendations(countries);
    } else if (input.includes('temple') || input === 'temples') {
        displayRecommendations(temples);
    } else {
        alert('No recommendations found');
    }
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

displayRecommendations = (template) => {
    console.log('displaying recommendations');
    let recommendationsSection = document.getElementsByClassName('recommendations')[0];
    recommendationsSection.classList.remove('hidden');
    let searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    let itemsToDisplay = [];
    if(template === countries)
        {
         countries.forEach(country =>{
            itemsToDisplay = itemsToDisplay.concat(country.cities);
         })   
        }
    else
    {
        itemsToDisplay = template;
    }
    console.log(itemsToDisplay)

    itemsToDisplay.forEach(item => {
        console.log(item.name);
        let card = document.createElement('div');
        card.classList.add('searchResultCard');

        let image = document.createElement('img');
        image.src = item.imageUrl;
        image.classList.add('searchResultImage');
        card.appendChild(image);

        let title = document.createElement('h3');
        title.textContent = item.name;
        card.appendChild(title);

        let description = document.createElement('p');
        description.textContent = item.description;
        description.classList.add('searchResultDescription');
        card.appendChild(description);

        let button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = 'Visit';
        card.appendChild(button);

        searchResults.appendChild(card);
    });
}

searchBtn.addEventListener('click', keyWordSearch);