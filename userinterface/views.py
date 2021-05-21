from django.shortcuts import render,redirect
from django.views.generic import ListView
from admininterface.models import Product,CartItem,Cart
from .forms import CartForm
from django.http import QueryDict
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail
from yurt.settings import EMAIL_HOST_USER



class HomeView(ListView):
    model=Product
    template_name='userinterface/home.html'

    def get(self,request):
        products=Product.objects.filter(status=True).order_by('-id')
        return render(request,'userinterface/home.html',{'object_list':products})




def cart(request):
    formname=CartForm()
    j=0
    if request.method=="POST":
        form=CartForm(QueryDict(request.POST['form']))
        if form.is_valid():
            cart_form=form.save()
            cart=Cart.objects.get(id=cart_form.id)
            order=[]
            ttp=0
            for i in request.POST.lists():
                if 'csrf' in i[1][0]:
                    continue
                if j%2==0:
                    product=Product.objects.get(name=i[1][0])
                else:
                    quantity=i[1][0]
                    total_price=int(quantity)*product.price
                    cart_item=CartItem(product=product,cart=cart,quantity=quantity,total_price=total_price)
                    order.append([cart_item.product.name,cart_item.quantity,total_price])
                    ttp+=total_price
                    cart_item.save()
                j+=1
            if form['email'].value()!='':
                subject = 'Güneşli Ferah Kuran Kursu Kermes Siparişi'
                message = 'Siparişiniz için teşekkür ederiz, siparişiniz en kısa sürede hazırlanacaktır.'
                for i in order:
                    message+='\n'
                    message+=str(i[0])+', '+str(i[1])+' Adet, '+str(i[2])+' TL'
                message+='\nToplam: '+str(ttp)+' TL\n'
                recepient = str(form['email'].value())
                send_mail(subject,
                    message, EMAIL_HOST_USER, [recepient], fail_silently = False)
            return redirect('home')
        else:
            return JsonResponse({'error':form.errors})
    return render(request,'userinterface/cart.html',{'form':formname})
