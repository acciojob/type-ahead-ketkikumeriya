//your JS code here. If required.
const input = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');

let debounceTimeout;

input.addEventListener('input', () => {
  const query = input.value.trim();

  // Clear previous debounce timer
  clearTimeout(debounceTimeout);

  // If input is empty, clear suggestions and return
  if (query === '') {
    clearSuggestions();
    return;
  }

  // Set a debounce timeout
  debounceTimeout = setTimeout(() => {
    fetchSuggestions(query);
  }, 500);
});

function fetchSuggestions(query) {
  fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(suggestions => {
      showSuggestions(suggestions);
    })
    .catch(error => {
      console.error('Error fetching suggestions:', error);
    });
}

function showSuggestions(suggestions) {
  clearSuggestions();

  suggestions.forEach(suggestion => {
    const li = document.createElement('li');
    li.textContent = suggestion;
    li.addEventListener('click', () => {
      input.value = suggestion;
      clearSuggestions();
    });
    suggestionsList.appendChild(li);
  });
}

function clearSuggestions() {
  suggestionsList.innerHTML = '';
}
