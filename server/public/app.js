$("#btnGet").click(function(){
    let username = $("#userRepo").val()
    $.getJSON("http://localhost:3000/list/"+username)
    .then(listUser)
});

function listUser(results){
   results.data.forEach(data=>{
       const dataList = $('<li>' + data.name + '</li>')
       $('.list').append(dataList)
   })
}

$("#btnUser").click(function(){
    let username = $("#user").val()
    $.getJSON("http://localhost:3000/users/"+username)
    .then(user=>{
        $("#username").text(JSON.stringify(user.data.items[0].login))
        $("#ID").text(JSON.stringify(user.data.items[0].id))
        $("#html").text(JSON.stringify(user.data.items[0].html_url))
    })
})

$("#btnPost").click(function(){
    let token = $("#token").val()
    let repoName = $("#repo").val()
    $.post(`http://localhost:3000/create/${token}/${repoName}`, function( ) {
        alert("processing...")
      })
      .done(data=>{
            console.log(data)
            $('#status').text("SUCCESS!").css('color', 'green')    
        
      })
      .fail(err=>{
        $('#status').text("TOKEN IS INVALID!").css('color', 'red')
        console.log(`Error: ${err} `)
      })
})