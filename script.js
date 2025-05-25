const typeaheadInput = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');
let timeoutId;

typeaheadInput.addEventListener('input', () => {
    clearTimeout(timeoutId);
    const query = typeaheadInput.value;

    if (query) {
        timeoutId = setTimeout(() => {
            fetchSuggestions(query);
        }, 500);
    } else {
        // Clear suggestions if input is empty
        suggestionsList.innerHTML = '';
    }
});

function fetchSuggestions(query) {
    const url = `https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${query}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateSuggestions(data);
        })
        .catch(error => console.error('Error fetching suggestions:', error));
}

function updateSuggestions(suggestions) {
    suggestionsList.innerHTML = ''; // Clear previous suggestions
    suggestions.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        li.addEventListener('click', () => {
            typeaheadInput.value = term; // Fill input with clicked suggestion
            suggestionsList.innerHTML = ''; // Clear suggestions
        });
        suggestionsList.appendChild(li);
    });
}
