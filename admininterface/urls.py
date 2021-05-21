from django.urls import path
from . import views

app_name='admininterface'

urlpatterns=[
    path('',views.main,name='home'),
    path('population-chart/', views.chart, name='population-chart'),
    path('urun/', views.CreateProduct.as_view(),name='products'),
    path('urun/<int:pk>',views.UpdateProduct.as_view(),name='change'),
    path('urun/<int:pk>/delete',views.delete,name='delete'),
    path('siparis/',views.ViewCart.as_view(),name='view_cart'),
    path('masalar/',views.sell,name='sell'),
    path('masalar/<int:pk>',views.table_view,name='table'),
    path('gecmis',views.history,name='history'),
    path('excel',views.excel,name='excel'),
    path('download',views.download,name='download'),
    path('alert/',views.alert,name='alert')
]
