$( document ).ready(function() {
  a=JSON.parse(localStorage.data)
  var money=0
  a.forEach(function (item, number) {
    money=money+parseInt(item['price'])*parseInt(item['quantity'])
    $('.table').find('tr:last').before(

      "<tr class='row_product'><td class='name'>"+item['product']+"</td><td style='text-align:center' class='price' id='price"+number+"'>"+item['price']+ " TL</td><td></td><td><button class='change btn btn-success btn-sm' type='button' name='button' id='plus-"+number+"'>+</button></td><td><span style='margin-right:1vw;margin-left:1vw;' class='quantity' id='number"+number+"'>"+item['quantity']+"</span></td><td><button class='change btn btn-sm btn-success' type='button' id='minus-"+number+"'>-</button></td><td><button type='button' class='btn btn-danger btn-sm'>Sil</button></td></tr>"
    )
    $('#money').html(money+' TL')
  });

});

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
      $(this).closest('tr').remove()
    }
  }
  $('#money').html(totalsum+' TL')
  $('#number'+number).html(sayi)

})

$(document).on('click', '.btn-danger', function(){
  var dif=parseInt($(this).closest('tr').find('.price').text().split(" ")[0])*parseInt($(this).closest('tr').find('.quantity').text().split(" ")[0])
  var totalsum=parseInt($('#money').text().split(" ")[0])
  totalsum=totalsum-dif
  $('#money').html(totalsum+' TL')
  $(this).closest('tr').remove()
})




$(document).on('click','#submit',function(){
  var data=[]
  var form=$("#createForm").serialize()
  $( ".row_product" ).each(function( index ) {
  var name = $(this).find('.name').text()
  var quantity= parseInt($(this).find('.quantity').text())
  var product= {
                'product':name,
                'quantity':quantity,
               }
  data.push(product)
  });
  $.ajax({
            url:'/sepetim',
            type:'POST',
            data:{
                    'form':form,
                    'cartitem':data
                  },
            success:function(response){
              if (response['error']){
                console.log(response['error'])
                if (response['error']['customer']){
                  $('#id_customer_error').remove()
                  $('#id_customer').after('<p id="id_customer_error">'+response['error']['customer'][0]+'</p>')
                }
                else{
                  $('#id_customer_error').remove()
                }
                if (response['error']['address']){
                  $('#id_address_error').remove()
                  $('#id_address').after('<p id="id_address_error">'+response['error']['address'][0]+'</p>')
                }
                else{
                  $('#id_address_error').remove()
                }
                if (response['error']['number']){
                  $('#id_number_error').remove()
                  if(response['error']['number'][0]=='Enter a valid phone number (e.g. (0212) 345 67 89) or a number with an international call prefix.')
                  {
                    $('#id_number').after('<p id="id_number_error">Lütfen geçerli bir numara girin.</p>')
                  }
                  else{
                    $('#id_number').after('<p id="id_number_error">'+response['error']['number'][0]+'</p>')
                  }
                }
                else{
                  $('#id_number_error').remove()
                }
              }
              else{
                localStorage.removeItem('data')
                window.location="/"
                alert('Siparişiniz alındı')
              }
            }

  })
})
