$(document).ready(function () {
  var myVar = setInterval(myTimer, 10000)
  function myTimer() {
      $.ajax({
                url:'/yonetici/alert',
                type:'GET',
                data:{},
      })

      $.getJSON("/yonetici/alert",function(data){
        var old_a=JSON.parse(localStorage.amount)
        var new_a=data['amount']
        if(old_a!=new_a){
          alert('Yeni Sipariş var')
          localStorage.setItem('amount', data['amount']);
        }
      })
    }

})
