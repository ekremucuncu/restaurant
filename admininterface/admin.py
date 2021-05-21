from django.contrib import admin
from .models import Product,Cart,CartItem,Table,Courier
# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display =('name','price','status','created_on')

class CartAdmin(admin.ModelAdmin):
    list_display =('id','customer','created_on','status','pay_method')

class CartItemAdmin(admin.ModelAdmin):
    list_display =('product','quantity','total_price','cart')

class TableAdmin(admin.ModelAdmin):
    list_display=('name',)

class CourierAdmin(admin.ModelAdmin):
    list_display =('name','status',)

admin.site.register(Product,ProductAdmin)
admin.site.register(Cart,CartAdmin)
admin.site.register(CartItem,CartItemAdmin)
admin.site.register(Table,TableAdmin)
admin.site.register(Courier,CourierAdmin)
