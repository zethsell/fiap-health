export const menuContent = (i18n: any) => ({
    "menu": {
        "dashboard": {
            "title": i18n.t('menu.dashboard.title'),
            "exchange": i18n.t('menu.dashboard.exchange'),
            "travel": i18n.t('menu.dashboard.travel'),
            "financial": i18n.t('menu.dashboard.financial'),
            "reservationIssues": i18n.t('menu.dashboard.reservationIssues')
        },
        "financial": {
            "title": "Financial",
            "registrations": {
                "title": i18n.t('menu.financial.registrations.title'),
                "bank": i18n.t('menu.financial.registrations.bank')
            }
        },
        "contacts": {
            "title": "Contacts"
        },
        "exchange": {
            "title": "Exchange",
            "registrations": {
                "title": i18n.t('menu.exchange.registrations.title'),
                "language": i18n.t('menu.exchange.registrations.language'),
            }
        },
        "travel": {
            "title": "Travel"
        },
        "insurance": {
            "title": "Insurance"
        },
        "aerial": {
            "title": "Aerial"
        },
        "sites": {
            "title": "Sites"
        },
        "settings": {
            "title": i18n.t('menu.settings.title'),
            "permissions": {
                "title": i18n.t('menu.settings.permissions.title'),
                "permission-groups": i18n.t('menu.settings.permissions.permission-groups'),
                "user-groups": i18n.t('menu.settings.permissions.user-groups'),
                "users": i18n.t('menu.settings.permissions.users')
            },
            "logs": "Logs"
        }
    }
})