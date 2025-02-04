from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

def grant_admin_rights(modeladmin, request, queryset):
    count = 0
    for user in queryset:
        if user != request.user:
            user.is_staff = True
            user.is_superuser = True
            user.save()
            count += 1
    modeladmin.message_user(request, f"{count} Benutzer wurden zum Admin befördert.")
grant_admin_rights.short_description = "Admin-Rechte für ausgewählte Benutzer vergeben"

def revoke_admin_rights(modeladmin, request, queryset):
    count = 0
    for user in queryset:
        if user == request.user:
            modeladmin.message_user(request, "Sie können sich nicht selbst die Admin-Rechte entziehen.", level="error")
        else:
            user.is_staff = False
            user.is_superuser = False
            user.save()
            count += 1
    modeladmin.message_user(request, f"Admin-Rechte wurden bei {count} Benutzer(n) entzogen.")
revoke_admin_rights.short_description = "Admin-Rechte für ausgewählte Benutzer entziehen"

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    
    # Suchfelder im Admin
    search_fields = ('username', 'email', 'first_name', 'last_name')
    
    # Filter im Admin (z. B. nach Admin-Status, Aktivität und Gruppen)
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    
    # Anzahl der Einträge pro Seite (Paginierung)
    list_per_page = 20

    ordering = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Persönliche Informationen', {'fields': ('first_name', 'last_name')}),
        ('Berechtigungen', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Wichtige Daten', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    actions = [grant_admin_rights, revoke_admin_rights]

    def change_view(self, request, object_id, form_url='', extra_context=None):
        user_obj = self.get_object(request, object_id)
        # Verhindern, dass Admins ihre eigenen Rechte ändern
        if user_obj and request.user == user_obj:
            self.readonly_fields = self.readonly_fields + ('is_staff', 'is_superuser')
        return super().change_view(request, object_id, form_url, extra_context)

admin.site.register(CustomUser, CustomUserAdmin)
