$(document).on('click','#create',function(){
   var old_a=JSON.parse(localStorage.amount)
   localStorage.setItem('amount', old_a+1);
   $.ajax({
     url:'/yonetici/masalar',
     data:{
            'name':$('#name').val()
          },
     success:function(){
       window.location.href = "/yonetici/masalar";
     }
   })
})
