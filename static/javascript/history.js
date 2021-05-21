$(document).on('click','#filter',function(){
  var courier=$('#courier option:selected').val()
  var customer=$('#customer option:selected').val()
  var product=$('#product option:selected').val()
  var date1 = $('#date1').val()
  var date2 = $('#date2').val()
  if (date2<date1){
    alert('Tarihi Düzelt')
  }
  else{
  $.ajax({
    url:'/yonetici/gecmis',
    data:{
           'courier':courier,
           'customer':customer,
           'product':product,
           'date1':date1,
           'date2':date2,
         },
    success:function(data){
      $('.table .rows').remove()
      for(i in (JSON.parse(data['cartitems']))){
        product=JSON.parse(data['products'])[i]['fields']['name']
        quantity=JSON.parse(data['cartitems'])[i]['fields']['quantity']
        customer=JSON.parse(data['carts'])[i]['fields']['customer']
        created_on=JSON.parse(data['cartitems'])[i]['fields']['created_on']
        total_price=JSON.parse(data['cartitems'])[i]['fields']['total_price']
        courier=JSON.parse(data['couriers'])[i]['fields']['name']
        var date = new Date(created_on)
        const options = {year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' }
        ddd=date.toLocaleDateString('tr-TR', options)
        $('.table').append(
          "<tr class='rows'><td class='product'>"+product+"</td><td class='quantity'>"+quantity+"</td><td class='customer'>"+customer+"</td><td class='created_on'>"+ddd+"</td><td class='total_price'>"+total_price+"</td><td class='courier'>"+courier+"</td></tr>"
        )
      }
    }
  })
}
})


$(document).ready(function () {
  $('.a').hide()
})

$(document).on('click','.a',function(){
  $(this).hide()
  $('#excel').show()
})

$(document).on('click','#excel',function(){
  product=[]
  quantity=[]
  customer=[]
  created_on=[]
  total_price=[]
  courier=[]
  $( ".rows").each(function(){
    product.push($(this).find('.product').text())
    quantity.push($(this).find('.quantity').text())
    customer.push($(this).find('.customer').text())
    created_on.push($(this).find('.created_on').text())
    total_price.push($(this).find('.total_price').text())
    courier.push($(this).find('.courier').text())
  })
  $.ajax({
    url:'/yonetici/excel',
    data:{
            'product':product,
            'quantity':quantity,
            'customer':customer,
            'created_on':created_on,
            'total_price':total_price,
            'courier':courier,
         },
   })
  $(this).hide()
  $('.a').show()
})


$(document).on("change", "input[name='cb']", function () {
    if (this.checked) {
      $("#date1").prop('disabled', true);
      $("#date2").prop('disabled', true);
      $("input[type=date][id$=date1]").val('')
      $("input[type=date][id$=date2]").val('')
    }
    else{
      $("#date1").prop('disabled', false);
      $("#date2").prop('disabled', false);
    }
});
