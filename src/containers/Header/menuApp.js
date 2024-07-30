export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-employees', link: '/system/employees-manage'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/admin-manage'
            },
        ]
    },
    { //Quản lý movie
        name: 'menu.admin.movie',
        menus: [
            {
                name: 'menu.admin.manage-movie', link: '/system/movie'
            }
        ]
    },
    { //Quản lý movie
        name: 'menu.admin.revenue',
        menus: [
            {
                name: 'menu.admin.movie-revenue', link: '/system/manage-movie-revenue',
            },
            {
                name: 'menu.admin.employees-revenue', link: '/system/manage-employees-revenue',
            },
            {
                name: 'menu.admin.bill', link: '/system/manage-bill'
            }
        ]
    },
];