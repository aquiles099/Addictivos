import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Usuarios',
    icon: 'person-outline',
    link: '/pages/admin/table-user',
    /*
    children: [
      {
        title: 'Administrador',
        link: '/pages/tables/smart-table/1',
      },
      {
        title: 'Comercio',
        link: '/pages/tables/smart-table/2',
      },
      {
        title: 'Analista',
        link: '/pages/tables/smart-table/3',
      },
      {
        title: 'Contable',
        link: '/pages/tables/smart-table/4',
      },
      {
        title: 'Cliente',
        link: '/pages/tables/smart-table/5',
      },
      {
        title: 'Empleado',
        link: '/pages/tables/smart-table/6',
      },
    ],*/
  },
  {
    title: 'Comercios',
    icon: 'briefcase-outline',
    link: '/pages/admin/table-commerce',
  },

  {
    title: 'Compañias',
    icon: 'layers-outline',
    link: '/pages/admin/table-company'
  },
  {
    title: 'Compras',
    icon: 'shopping-cart-outline',
    link: '/pages/admin-purchases/table-purchase'
  },
  {
    title: 'Secciones',
    icon: 'percent-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Ofertas',
        link: '/pages/admin-deal/table-deals',
      },
      {
        title: 'Promoción',
        link: '/pages/layout/stepper',
      },
      {
        title: 'Opciones de precio',
        link: '/pages/admin-deal/table-option',
      },

    ],
  },
  {
    title: 'Reporte',
    icon: 'browser-outline',
    children: [
      {
        title: 'Ventas',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Usuarios',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Suscripciones',
        link: '/pages/modal-overlays/popover',
      },

    ],
  },
  {
    title: 'Sistema',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Categoria',
        link: '/pages/admin-categories/table-categories',
      },
      {
        title: 'Plataforma de Pago',
        link: '/pages/admin-payment/table-payment',
      },

    ],
  },

  {
    title: 'Home',
    icon: 'browser-outline',
    link: '/',
  },

];
