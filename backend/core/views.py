from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, UserSerializer,ReservationSerializer
from .models import Reservation
from rest_framework import status
User = get_user_model()


class ReservationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # restituisce la prenotazione dell'utente loggato
        try:
            reservation = Reservation.objects.get(user=request.user)
            serializer = ReservationSerializer(reservation)
            return Response(serializer.data)
        except Reservation.DoesNotExist:
            return Response({"detail": "Nessuna prenotazione"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        # modifica prenotazione esistente
        try:
            reservation = Reservation.objects.get(user=request.user)
            serializer = ReservationSerializer(reservation, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Reservation.DoesNotExist:
            return Response({"detail": "Nessuna prenotazione da modificare"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        try:
            reservation = Reservation.objects.get(user=request.user)
            reservation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Reservation.DoesNotExist:
            return Response({"detail": "Nessuna prenotazione da cancellare"}, status=status.HTTP_404_NOT_FOUND)
# 🔹 Registrazione
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# 🔹 Profilo utente (solo autenticato)
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# 🔹 Logout (invalida i token)
class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"success": "Logout effettuato"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
        })