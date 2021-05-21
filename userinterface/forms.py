from django.forms import ModelForm
from admininterface.models import Cart
from django.core.exceptions import ValidationError

class CartForm(ModelForm):
    class Meta:
        model=Cart
        fields=['customer','address','note','email','number','pay_method']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['customer'].widget.attrs.update({'class': 'form-control','placeholder':'Zorunlu'})
        self.fields['address'].widget.attrs.update({'class': 'form-control','rows':'4','placeholder':'Zorunlu'})
        self.fields['note'].widget.attrs.update({'class': 'form-control','rows':'4','placeholder':'Opsiyonel'})
        self.fields['email'].widget.attrs.update({'class': 'form-control','placeholder':'Opsiyonel'})
        self.fields['number'].widget.attrs.update({'class': 'form-control','placeholder':'Zorunlu'})
        self.fields['pay_method'].widget.attrs.update({'class': 'form-control'})
        self.fields['customer'].label='İsim'
        self.fields['address'].label='Adres'
        self.fields['note'].label='Not'
        self.fields['email'].label='Email'
        self.fields['number'].label='Telefon'
        self.fields['pay_method'].label='Ödeme Yöntemi'
