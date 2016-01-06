from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    # Examples:
    # url(r'^$', 'dashproj.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$',TemplateView.as_view(template_name='login.html')),
    url(r'^admin/', include(admin.site.urls)),
]
