$(document).on('click', '.submit', function(){
  var id=$(this).attr('id').split("-")[1].split("+")[0]
  var courier=$( "#select_courier option:selected" ).text()
  $.ajax({
    url:'/yonetici/siparis',
    data:{
            status: $(this).attr('id').split("-")[1].split("+")[1],
            id    : id,
            courier:courier
          },
    success: function(data){
                      setTimeout(function(){
                           location.reload();
                      }, 5);
                }
  })
})


$(document).on('click','.btn-block',function(){
  var id=$(this).attr('id').split("-")[1]
  var totalsum=0
  $('#card'+id).find('.price').each(function(){
    totalsum = totalsum + parseInt($(this).text().split(" ")[0])
  })
  $('#totalsum'+id).html(totalsum+' TL')
})


$(document).on('click','.delete',function(){
  var dif = parseInt($(this).closest('tr').find('.price').text().split(" ")[0])
  var idd=$(this).attr('id').split("-")[1].split("+")[1]
  var totalsum=parseInt($('#totalsum'+idd).text().split(" ")[0])
  totalsum=totalsum-dif
  $('#totalsum'+idd).html(totalsum+' TL')
  $(this).closest('tr').remove()
})

// bura
$(document).on('click','.add_add',function(){
  id=$(this).attr('id').split("-")[1]
  $('#add_table-'+id).find('.add_row').each(function(){
    if($(this).find('.add_quantity').text()!=0){
      name=$(this).find('.add_product_name').text()
      total_price=parseInt($(this).find('.add_product_price').text())*parseInt($(this).find('.add_quantity').text())
      quantity=$(this).find('.add_quantity').text()
      totalsum=parseInt($('#totalsum'+id).text().split(" ")[0])
      totalsum=totalsum+total_price
      $('#totalsum'+id).html(totalsum+" TL")
      $('#table-'+id).find('tr:last').before(
        "<tr class='rows'><td class='product_name large'>"+name+"</td><td id='price-"+name+"' class='price large'>"+total_price+" TL</td><td><button id='minus-"+name+"+"+id+"' type='button' class='change btn btn-primary btn-sm'>-</button></td><td id='quantity-"+name+"' class='small'>"+quantity+"</td><td><button id='plus-"+name+"+"+id+"' type='button' class='change btn btn-primary btn-sm'>+</button></td><td class='small'><button id='delete-"+name+"+"+id+"' type='button' class='delete btn btn-danger btn-sm'>Sil</button></td></tr>"
      )
    }
  })
})


$(document).on('click','.add_change',function(){
 sign=$(this).attr('id').split("-")[0]
 id=$(this).attr('id').split("-")[1].split("_")[0]
 cart=$(this).attr('id').split("-")[1].split("_")[1]
 sc=id+"_"+cart
 quantity=parseInt($('#add_quantity-'+sc).text())
 if (sign=='plus'){
   quantity=quantity+1
 }
 else{
   if(quantity!=0){
     quantity=quantity-1
   }
 }
 $('#add_quantity-'+sc).html(quantity)
})



$(document).on('click','.add',function(){
  id=$(this).attr('id').split("-")[1]
  $('.add_row:hidden').each(function() {
    $(this).show();
  })
  $(this).closest('.table').find('.rows').each(function(){
    var product_item=$(this).find('.product_name').text()
    $('#addProduct'+id).find('.add_row').each(function(){
      var product=$(this).find('.add_product_name').text()
      if (product==product_item){
        $(this).hide()
      }
    })
  })
})


$(document).on('click','.change',function(){
  var sign=$(this).attr('id').split("-")[0]
  var id=$(this).attr('id').split("-")[1].split("+")[0]
  var quantity=parseInt($('#quantity-'+id).text())
  var total_price=parseInt($('#price-'+id).text().split(" ")[0])
  var price=total_price/quantity
  var idd=$(this).attr('id').split("-")[1].split("+")[1]
  var totalsum=parseInt($('#totalsum'+idd).text().split(" ")[0])
  if (sign=="plus"){
    quantity=quantity+1
    total_price=total_price+price
    totalsum=totalsum+price
  }
  else{
    if(quantity!=0){
      quantity=quantity-1
      total_price=total_price-price
      totalsum=totalsum-price
      if (quantity==0){
        $(this).closest('tr').remove()
      }
    }
  }
  $('#quantity-'+id).html(quantity)
  $('#price-'+id).html(total_price+' TL')
  $('#totalsum'+idd).html(totalsum+' TL')
})


$(document).on('click','.allow',function(){
  id=$(this).attr('id').split("-")[1]
  $('#card'+id).find('.change').prop('disabled',false)
  $('#card'+id).find('.delete').prop('disabled',false)
  $('#card'+id).find('.add').prop('disabled',false)
  $('#card'+id).find('.submit_main').prop('disabled',true)
  console.log()
  $(this).html('Değişiklikleri Kaydet')
  $(this).removeClass('allow')
  $(this).addClass('notallow')
  data=[]
  $('#table-'+id).find('.rows').each(function(){
    data.push($(this).find('.price').attr('id').split("-")[1])
  })
  localStorage.setItem('data', JSON.stringify(data));

})

$(document).on('click','.notallow',function(){
  id=$(this).attr('id').split("-")[1]
  $('#card'+id).find('.change').prop('disabled',true)
  $('#card'+id).find('.delete').prop('disabled',true)
  $('#card'+id).find('.add').prop('disabled',true)
  $('#card'+id).find('.submit_main').prop('disabled',false)
  $(this).html('Değişiklik Yap')
  $(this).removeClass('notallow')
  $(this).addClass('allow')
  var data=[]
  a=JSON.parse(localStorage.data)
  $('#card'+id).find('.product_name').each(function(){
    var name=$(this).text()
    var total_price=$(this).next('td').text().split(" ")[0]
    var quantity=$(this).next('td').next('td').next('td').text()
    var product={
                  'name':name,
                  'total_price':total_price,
                  'quantity':quantity,
                  'cart':id
                }
    data.push(product)
    var id_item=$(this).next('td').attr('id').split("-")[1]
      for( var i = 0; i < a.length; i++){
      if ( a[i] === id_item) {
          a.splice(i, 1);
      }
      }
    })

  $.ajax({
    url:'/yonetici/siparis',
    data:{
          data:data,
          delete:a
        }
  })
})
