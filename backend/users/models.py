from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    # ...
    # Überschreiben des groups-Feldes mit einem eindeutigen related_name
    groups = models.ManyToManyField(
        Group,
        related_name="customuser_set",  # Eindeutiger Name, um Konflikte zu vermeiden
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    
    # Überschreiben des user_permissions-Feldes mit einem eindeutigen related_name
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_permissions_set",  # Eindeutiger Name
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )
    # ...
