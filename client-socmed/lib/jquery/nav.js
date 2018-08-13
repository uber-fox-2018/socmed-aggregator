function searchRepositories () {
    let repositories = $('#repositories').val()
    let language = $('#language').val()
    console.log($('#repositories').val(), $('#language').val())
    window.location.replace(`search.html?repository=${repositories}&language=${language}`)
}