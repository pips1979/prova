from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserProfileView, LogoutView, ProfileView,ReservationView

urlpatterns = [
	path("register/", RegisterView.as_view(), name="register"),
	path("login/", TokenObtainPairView.as_view(), name="login"),
	path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
	path("logout/", LogoutView.as_view(), name="logout"),
	path("profile/", ProfileView.as_view(), name="profile"),
	path("reservation/", ReservationView.as_view(), name="reservation"),
]
