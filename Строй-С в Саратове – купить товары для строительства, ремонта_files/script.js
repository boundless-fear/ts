$('.search-tag').on('click', (e) => {
    const elem = $(e.target);
    let searchElementString = '#inner-search-search'
    let searchElement = $(searchElementString)
    if (searchElement.length === 0) {
        searchElementString = '#search'
        searchElement = $(searchElementString)
    }

    const value = searchElement.val();
    const lastIndex = value.lastIndexOf(" ");

    elem.closest('.search-tags').hide();
    const valueWithoutLastWord = value.substring(0, lastIndex);
    searchElement.val(valueWithoutLastWord + " " + elem.text() + " ")
    $('#search').val(valueWithoutLastWord + " " + elem.text() + " ")

    searchElement.focus()

    search(searchElementString)
})