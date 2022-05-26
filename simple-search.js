/**
 * @param items - items to search amongst. Expecting { value, searchable }
 * @param - inputEl - the input element we will watch
 * @param - selectEl - the select element in which to put the results
 */
const SimpleSearch = (items, inputEl, selectEl) => {

  // Actually fills in the selectEl with options
  const fillOptions = (items, selectEl) => {
    let optionsHTML = '';
    items.forEach(r => {
      optionsHTML += `<option value="${r.value}">${r.searchable}</option>`;
    });
    selectEl.innerHTML = optionsHTML;
  };

  // Start with all items
  fillOptions(items, selectEl);

  // Listen for keyup and update the list on the fly
  inputEl.addEventListener('keyup', e => {
    const value = e.target.value;
    const results = items.filter(i => i.searchable.indexOf(value) !== -1);
    fillOptions(results, selectEl);
  });
};

