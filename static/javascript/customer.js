$(document).on('click', '.add', function(){
  var number=$(this).attr('id')
  $(this).remove()
  $('#card-'+number).append(
    "<button class='change btn btn-success' type='button' id='minus-"+number+"'>-</button><span style='margin-right:1vw;margin-left:1vw;' class='quantity' id='number"+number+"'>1</span><button class='change btn btn-success' type='button' name='button' id='plus-"+number+"'>+</button>"
  )
  var totalsum=parseInt($('#money').text().split(" ")[0])
  totalsum=totalsum+parseInt($('#price'+number).text().split(" ")[0])
  $('#money').html(totalsum+' TL')
  lclstr()
})


$(document).on('click', '.change', function(){
  var id = $(this).attr('id').split("-")
  number=id[1]
  var sayi = parseInt($('#number'+number).text())
  var itemsum;
  var totalsum=parseInt($('#money').text().split(" ")[0])
  if (id[0]=='plus'){
    sayi=sayi+1
    totalsum=totalsum+parseInt($('#price'+number).text().split(" ")[0])
  }
  else{
    totalsum=totalsum-parseInt($('#price'+number).text().split(" ")[0])
    if (sayi>0)
    {
      sayi=sayi-1
    }
    if (sayi==0){
      $('#plus-'+number).remove()
      $('#minus-'+number).remove()
      $('#number'+number).remove()
      $('#card-'+number).append(
        "<button type='button' style='float:left' class='add btn btn-primary' id='"+number+"'>SEPETE EKLE</button>"

      )
    }
  }
  $('#money').html(totalsum+' TL')
  $('#number'+number).html(sayi)
  lclstr()
})

$(document).on('click', '#cart-save', function(){
  lclstr()
  if ($('#money').text().split(" ")[0]!=0){
    $(this).attr("href", "sepetim")
  }
  else{
    alert('Sepetiniz boş')
  }
})

function lclstr(){
  var data=[]
  $( ".card" ).each(function( index ) {
    var name = $(this).find('.name').text()
    var quantity= parseInt($(this).find('.quantity').text())
    var price=parseInt($(this).find('.price').text().split(" ")[0])
    var id = $(this).find('.card-body').attr('id').split("-")[1]
    if (isNaN(quantity)==false){
      var product= {
        'product':name,
        'quantity':quantity,
        'price':price,
        'id':id
      }
      data.push(product)
    }
  });
  localStorage.setItem('data', JSON.stringify(data));
}

$( document ).ready(function() {
  try{
    a=JSON.parse(localStorage.data)
    var money=0
    a.forEach(function (item, number) {
      if (item['quantity']!=0){
      $('#card-'+item['id']).find('.add').remove()
      $('#card-'+item['id']).append(
        "<button class='change btn btn-success' type='button' id='minus-"+item['id']+"'>-</button><span style='margin-right:1vw;margin-left:1vw;' class='quantity' id='number"+item['id']+"'>"+item['quantity']+"</span><button class='change btn btn-success' type='button' name='button' id='plus-"+item['id']+"'>+</button>"
      )
      }
      money=money+parseInt(item['price'])*parseInt(item['quantity'])
      if (isNaN(money))
        {money=0}
      $('#money').html(money+' TL')
    });
    }
  catch{}
});
