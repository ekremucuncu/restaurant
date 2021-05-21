from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Product(models.Model):
    name=models.CharField(max_length=128)
    price=models.IntegerField()
    image=models.ImageField(upload_to='images/')
    status=models.BooleanField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.name

class Courier(models.Model):
    name=models.CharField(max_length=128)
    status=models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Cart(models.Model):
    customer=models.CharField(max_length=128)
    address=models.TextField()
    number=PhoneNumberField(region='TR')
    created_on=models.DateTimeField(auto_now_add=True)
    status=models.IntegerField(default=1)
    pay_method=models.CharField(max_length=100,choices=(('card','Kredi Kartı'),('cash','Nakit')),default='cash')
    courier=models.ForeignKey(Courier,on_delete=models.PROTECT,null=True,blank=True,default=9)
    note=models.TextField(blank=True,null=True)
    email=models.EmailField(blank=True,null=True)

    def __str__(self):
        return str(self.id)


class Table(models.Model):
    name=models.CharField(max_length=128)
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE,related_name='masa')

    def __str__(self):
        return self.name




class CartItem(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE)
    quantity=models.IntegerField()
    total_price=models.IntegerField()
    created_on=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name
