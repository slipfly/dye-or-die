export const myRoutes = {
    default: '/',
    materials: '/materials',
    new: '/new',
    portfolio: '/portfolio'
} as const;

export const MainNavigationButtons = {
    new: 'New',
    materials: 'Materials',
    portfolio: 'Portfolio'
} as const;

export const CONTROL_BUTTONS = {
    MaterialsPage: [
        {
            name: 'Add',
            type: 'button'
        },
        {
            name: 'Edit',
            type: 'button'
        },
        {
            name: 'Remove',
            type: 'button'
        }
    ],
    AddMaterials: [
        {
            name: 'Save',
            type: 'submit'
        },
        {
            name: 'Cancel',
            type: 'reset'
        }
    ]
} as const;