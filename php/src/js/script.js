$(document).ready(function() {
  $("#buscar").click(function() {
    $.getJSON("http://localhost:41071/pessoa", function(data, status) {
      $("#resultado").html("");
      var items = [];
      $.each(data, function(key, val) {
        console.log(key);
        items.push("<tr><td>" + val.nome + "</td><td><button class=\"excluir\" id=\""+ val.id + "\">Excluir</button></td><td><button  class=\"alterar\" name=\""+val.nome+"\"id=\""+ val.id + "\">Alterar</button></td></tr>");
      });

      $("<table/>", {
        class: "vermelho",
        border: "1",
        html: items
      }).appendTo("#resultado");

      //Excluir
      $(".excluir").click(function() {
        var id = $(this).attr('id');
        $.ajax({           
          type: "DELETE",
          url: "http://localhost:41071/pessoa/"+id,
          data: "",
          success: function(data) {
            //alert("Registro " + id + " excluido com sucesso!");
          },
          contentType: "application/json",
          dataType: "json"
        }).then(res => {
          $("#buscar").click();
        });
      });  
      
      //Alterar
      $(".alterar").click(function() {
        var id = $(this).attr('id');
        console.log(id);
        var nome = $(this).attr('name');
        $("#alteraNome").show("slow");
        $("#alteraNome").val(nome);
        $(".confirmar").attr('id', id);
        $(".confirmar").show("slow");
        
      });
    });
  });

  $(".confirmar").click(function() {
    let sNome = $("#alteraNome").val();
    var id = $(this).attr('id');
    $.ajax({           
      type: "PATCH",
      url: "http://localhost:41071/pessoa/"+id,
      data: JSON.stringify ({nome: sNome}),
      success: function(data) {
        //alert("Registro " + id + " alteradocom sucesso!");
      },
      contentType: "application/json",
      dataType: "json"
    }).then(res => {
      $("#buscar").click();
      $("#alteraNome").hide("slow");
      $(".confirmar").hide("slow");
    });
  });

  $("#gravar").click(function() {
    //enviado
    let sNome = $("#nome").val();    
    $.ajax({           
      type: "POST",
      url: "http://localhost:41071/pessoa",
      data: JSON.stringify ({nome: sNome}),
      success: function(data) {
        //alert("data: " + data);
      },
      contentType: "application/json",
      dataType: "json"
    }).then(res => {
      $("#buscar").click();
    });
  });
});
