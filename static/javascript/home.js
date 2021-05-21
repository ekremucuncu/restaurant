$(document).ready(function () {

     var $populationChart = $("#population-chart");
     $.ajax({
       url: $populationChart.data("url"),
       success: function (data) {

         var ctx = $populationChart[0].getContext("2d");

         new Chart(ctx, {
           type: 'bar',
           data: {
             labels: data.labels,
             datasets: [{
               label: 'Adet',
               backgroundColor: 'blue',
               data: data.data
             }]
           },
           options: {
             responsive: true,
             legend: {
               position: 'bottom',
             },
             scales: {
                  yAxes: [{
                      display: true,
                      ticks: {
                          beginAtZero: true,
                      }
                  }]
            },
             title: {
               display: true,
               text: 'Bugün satılan toplam ürün adeti'
             }
           }
         });

       }
     });
});


$(document).on('click','#cancel',function(){
  $( ".order_row").each(function( index ) {
    $(this).remove()
  })
});


$(document).on('click','#order',function(){


  var data=[]
  var pay_method = $('.pay_method').val()
  $( ".add_row").each(function( index ) {
  var name = $(this).find('.add_product_name').text()
  var quantity= parseInt($(this).find('.add_quantity').text())
  var price = parseInt($(this).find('.add_product_price').text())
  var product= {
                'product':name,
                'quantity':quantity,
                'price':price
               }
  if (quantity!=0){
    data.push(product)
  }
  });

  var printContents = document.getElementById('print_area').innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  $.ajax({
            url:'/yonetici',
            type:'GET',
            data: {
                    'order':JSON.stringify(data),
                    'pay_method': pay_method
                  },
                  success:function(response){
                    location.reload();
                    var old_a=JSON.parse(localStorage.amount)
                    localStorage.setItem('amount', old_a+1);
                  }
  })
});


$(document).on('click','#show',function(){
    $( ".add_row").each(function( index ) {
    var quantity= parseInt($(this).find('.add_quantity').text())
    if (quantity!=0){
      var name = $(this).find('.add_product_name').text()
      var price = parseInt($(this).find('.add_product_price').text())
      $('#order_table').find('#row_head').after(
        "<tr class='order_row'><td style='width:7vw;' class='order_product_name'>"+name+"</td><td class='order_product_price'style='text-align:center;width:7vw;'>"+price+' TL'+"</td><td class='order_quantity' id='add_quantity' style='text-align:center'>"+quantity+"</td><td class='order_total_price' style='text-align:center'>"+price*quantity+' TL'+"</td></tr>"
    )}
  });

});


$(document).on('click','#reset',function(){
  $('.add_row').each(function(){
    $(this).find('.add_quantity').html('0')
 })
 $('.price').html('0 TL')
})


$(document).on('click','.add_change',function(){
 sign=$(this).attr('id').split("-")[0]
 id=$(this).attr('id').split("-")[1]
 quantity=parseInt($('#add_quantity-'+id).text())
 if (sign=='plus'){
   quantity=quantity+1
 }
 else{
   if(quantity!=0){
     quantity=quantity-1
   }
 }
 $('#add_quantity-'+id).html(quantity)
 var price=0
 $('.add_row').each(function(){
   price = price +parseInt($(this).find('.add_quantity').text())*parseInt($(this).find('.add_product_price').text().split(" ")[0])
})
$('.price').html(price+' TL')
})




$(document).on('click', '#courier_submit', function(){
  var courier = $('#name').val()
  $.ajax({
            url:'/yonetici/',
            type:'POST',
            data:{
                    'courier':courier,
                  },
            success:function(response){
              alert('Kurye Eklendi')
              $('#name').val('')
            }

  })
})
