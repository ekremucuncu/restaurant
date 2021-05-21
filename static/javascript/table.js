$(document).on('click','.btn-warning',function(){
  if ($(this).html()=='Değişiklik Yap'){
    $('.change').prop('disabled',false)
    $('.delete').prop('disabled',false)
    $('.add').prop('disabled',false)
    $('#payment').prop('disabled',true)
    $(this).html('Değişiklikleri Onayla')
  }
  else{
    $('.change').prop('disabled',true)
    $('.delete').prop('disabled',true)
    $('.add').prop('disabled',true)
    $(this).html('Değişiklik Yap')
    $('#payment').prop('disabled',false)
    var data=[]
    var id = $(this).attr('id')
    $('.rows').each(function(){
      var product= $(this).find('.product_name').text()
      var quantity= $(this).find('.quantity').text()
      var product={
                    'product':product,
                    'quantity':quantity,
                  }
      data.push(product)
    })

    $.ajax({
      url:'/yonetici/masalar/'+id,
      data:{
            'change':'change',
            'table_id':$(this).attr('id'),
            'data':data
      },
    })
    $('#print_area').show()
    var divToPrint = document.getElementById("print_area");
    if($('#print_area').find('tr').text()!=""){
      newWin = window.open("");
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
      newWin.close();
      location.reload()
    }
  }
})

function totalprice(){
  var totalsum=0
  $('.price').each(function(){
    totalsum=totalsum+parseInt($(this).text().split(" ")[0])
  })
  $('#totalsum').html(totalsum+' TL')
}

$(document).ready(function(){
  totalprice()
})

$(document).on('click','.delete',function(){
  $(this).closest('tr').remove()
  totalprice()
})


$(document).on('click','.change',function(){
  var id=$(this).attr('id').split("-")[1]
  var quantity = parseInt($(this).closest('tr').find('.quantity').text())
  var total_price = parseInt($(this).closest('tr').find('.price').text())
  var price = total_price/quantity
  if ($(this).attr('id')=='plus'){
    quantity=quantity+1
    total_price=total_price+price
  }
  else{
    if(quantity!=1){
      quantity=quantity-1
      total_price=total_price-price
    }
    else{
      $(this).closest('tr').remove()
    }
  }
  $(this).closest('tr').find('.quantity').html(quantity)
  $(this).closest('tr').find('.price').html(total_price+" TL")
  totalprice()



  var name=$(this).closest('tr').find('.product_name ').text()
  if($('#print_area td:contains('+name+')').length){
    var quantity_print=parseInt($('#print_area td:contains('+name+')').closest('tr').find('.quantity_print').text())
    var price_print=parseInt($('#print_area td:contains('+name+')').closest('tr').find('.price_print').text().split(" ")[0])
    var price_one=price_print/quantity_print
    if ($(this).attr('id')=='plus'){
      quantity_print=quantity_print+1
      price_print=price_print+price_one
    }
    else{
      if(quantity_print!=1){
        quantity_print=quantity_print-1
        price_print=price_print-price_one
      }
      else{
        $('#print_area td:contains('+name+')').closest('tr').remove()
      }
    }
    $('#print_area td:contains('+name+')').closest('tr').find('.quantity_print').html(quantity_print)
    $('#print_area td:contains('+name+')').closest('tr').find('.price_print').html(price_print+" TL")
  }
  else{
    $('#print_area').append("<tr class='rows_print'><td class='product_name_print large'>"+name+"</td><td class='price_print large'>"+price+" TL</td><td class='quantity_print'>"+1+"</td></tr>")
  }

})

$(document).on('click','#add_add',function(){
  $('.add_quantity').each(function(){
      if($(this).text()!=0){
        quantity=parseInt($(this).text())
        id=$(this).attr('id').split("-")[1]
        name=$('#add_product_name-'+id).text()
        price=parseInt($('#add_price-'+id).text().split(" ")[0])
        $('.general').find('tr:last').before("<tr class='rows'><td class='product_name large'>"+name+"</td><td class='price large'>"+price*quantity+" TL</td><td ><button id='minus' type='button' class='change btn btn-primary btn-sm' >-</button></td><td class='quantity' class='small'>"+quantity+"</td><td ><button id='plus' type='button' class='change btn btn-primary btn-sm' >+</button></td><td class='small'><button type='button' class='delete btn btn-danger btn-sm' >Sil</button></td></tr>")
        $('#print_area').append("<tr class='rows_print'><td class='product_name_print large'>"+name+"</td><td class='price_print large'>"+price*quantity+" TL</td><td class='quantity_print'>"+quantity+"</td></tr>")
      }
  })
  totalprice()
})


$(document).on('click','.add',function(){
  $('.add_row:hidden').each(function() {
    $(this).show();
  })
  $('#addProduct').find('.add_row').each(function(){
    $(this).find('.add_quantity').html('0')
  })
  $('.general').find('.rows').each(function(){
    var product_item=$(this).find('.product_name').text()
    $('#addProduct').find('.add_row').each(function(){
      var product=$(this).find('.add_product_name').text()
      if (product==product_item){
        $(this).hide()
      }
    })
  })
})


$(document).on('click','#finish',function(){
  $.ajax({
      url:'/yonetici/masalar/'+$(this).attr('name'),
      data:{
        'payment':$('select option:selected').attr('value'),
        'table_id':$(this).attr('name')
      },
      success:function(){
        window.location.href = "/yonetici/masalar"
        var old_a=JSON.parse(localStorage.amount)
        localStorage.setItem('amount', old_a+1);
      }
  })
})

$(document).on('click','#payment',function(){
  var last_sum=0
  $('.price').each(function(){
    last_sum=last_sum+parseInt($(this).text().split(" ")[0])
  })
  $('#last').html(last_sum+" TL")
})

$(document).on('click','.add_change',function(){
  var id=$(this).attr('id').split("-")[1]
  var quantity = parseInt($('#add_quantity-'+id).text())
  if ($(this).attr('id').split("-")[0]=='plus'){
    quantity=quantity+1
  }
  else{
    if(quantity!=0){
      quantity=quantity-1
    }
  }
  $('#add_quantity-'+id).html(quantity)
})
