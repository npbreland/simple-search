/**
 * @param items - items to search amongst. Expecting { value, searchable }
 * @param inputEl - the text input element we will watch
 * @param selectEl - the select element in which to put the results
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
    const results = items.filter(i => {
      // toLowerCase() on both terms makes the search case-insensitive
      return i.searchable.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    fillOptions(results, selectEl);
  });

  // Down arrow key (40) moves focus to selectEl
  inputEl.addEventListener('keydown', e => {
    if (
      e.keyCode === 40 &&
      selectEl.options.length > 0 &&
      // Only do this if insertion point is at end of text
      inputEl.selectionStart === inputEl.value.length
    ) {
      selectEl.selectedIndex = 0;
      selectEl.focus();
    }
  });

  selectEl.addEventListener('keydown', e => {

    if (selectEl.selectedIndex === 0 && e.keyCode === 38) {
      /* If at top of selectEl, up arrow key (38) moves focus to inputEl. Put 
       * the insertion point at the end of the current input. A tiny delay is 
       * needed since Chrome fires the focus event before the cusor is moved.
       * See https://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
       */
      setTimeout(() => {
        // Safe to assume the input text length is less than 10000 chars
        inputEl.selectionStart = inputEl.selectionEnd = 10000;
      }, 0);
      inputEl.focus();

    } else if (e.keyCode === 13) {
      /* When enter (13) is pressed, Take control of form submission, since 
       * Firefox does not submit form if pressing enter inside of a selectEl */
      e.preventDefault();
      const form = selectEl.form;
      if (form.checkValidity()) {
        selectEl.form.submit();
      } else {
        form.reportValidity()
      }
    }
  });
};
