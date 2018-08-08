// get all my repository
$('#data').click(function() {
  $.ajax({
    url: 'http://localhost:3030/api/myrepository',
    method: 'GET' 
  })
  .done(function(data) {
    $('#alert').html(swal("Get all my repository success!", "arisupriatna14", "success"))
    $('table').append(`
      <tr>
        <th>Image</th>
        <th>URL</th>
      </tr>
    `)
    $.each(data.myRepository, function(i, value) {
      $('table').append(`
        <tr>
        <td><img src="${value.owner.avatar_url}" width="100">
        <br></td>
        <td><a href="${value.owner.html_url}" style="text-decoration: none">${value.name}</a></td>
      </tr> <br>`)
    })
  })
  .fail(function(error) {
    $('#alert').html(swal(`${error}`, "arisupriatna14", "error"))
  })
})

// create repository
$('#submit').click(function() {
  event.preventDefault()
  const newRepo = $('#reponame').val()
  if (newRepo.length > 0) {
    $.ajax({
      url: 'http://localhost:3030/api/createrepos',
      method: 'POST',
      data: {name: newRepo}
    })
    .done(function() {
      $('#alert').html(swal("Create new repository success", "arisupriatna14", "success"))
    })
    .fail(function(error) {
      $('#alert').html(swal("Create new repository failed", "arisupriatna14", "error"))
    })
  } else {
    $('#alert').html(swal("The repository name cannot be empty", "arisupriatna14", "warning"))
  }
  
})

// search repository
$('#search').click(function() {
  event.preventDefault()
  const searchRepo = $('#repository').val()
  $.ajax({
    url: 'http://localhost:3030/api/repospublic',
    method: 'GET',
    data: {repoName: searchRepo}
  })
  .done(function(data) {
    $('table').append(`
      <tr>
        <th>Image</th>
        <th>URL</th>
      </tr>
    `)
    $('#alert').html(swal(`${data.message}`, "arisupriatna14", "success"))
    $.each(data.repositories.items, function(i, value) {
      $('table').append(`
        <tr>
        <td><img src="${value.owner.avatar_url}" width="100"></td>
        <td><a href="${value.owner.html_url}" style="text-decoration: none">${value.name}</a></td>
        </tr> 
      `)
    })
  })
  .fail(function(error) {
    $('#alert').html(swal(`${error}`, "arisupriatna14", "error"))
  })
})