const MenuConfig = [
    {
        heading: "",
        svgIcon:"",
        pages: [
            {
                name: 'Dashboard',
                route: '/dashboard',
                svgIcon: 'svgicons/custom/dashboard.svg',
                permission: '',
            },
            {
                name: 'Inbox',
                route: '/inbox',
                svgIcon: 'svgicons/custom/dashboard.svg',
                permission: 'access inbox',
            },
            {
                name: 'Post',
                route: '/post',
                svgIcon: 'svgicons/custom/post.svg',
                permission: 'access post',
            },
        ]
    },
    {
        heading: "User Management",
        svgIcon: 'svgicons/custom/user-management.svg',
        pages: [
            {
                name: 'User',
                route: '/',
                svgIcon: 'svgicons/custom/user.svg',
                permission: 'access user',
            },
            {
                name: 'Role',
                route: '/roles',
                svgIcon: 'svgicons/custom/role.svg',
                permission: 'access role',
            },
            {
                name: 'Permission',
                route: '/permissions',
                svgIcon: 'svgicons/custom/permission.svg',
                permission: 'access permission',    
            },
            {
                name: 'Activity Log',
                route: '/activity-log',
                svgIcon: 'svgicons/custom/activity-log.svg',
                permission: 'access activity log',
            }
        ]
    }
]
export { MenuConfig };