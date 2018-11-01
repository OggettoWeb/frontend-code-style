module.exports = {
    title: 'Руководство фронтенд-разработчика по оформлению кода',
    description: '',
    base: '/frontend-code-style/',
    themeConfig: {
        sidebar: [{
                title: 'Верстка',
                collapsable: false,
                children: [
                    '/html',
                    '/less',
                    '/forms'
                ]
            },
            {
                title: 'JS, jQuery',
                collapsable: false,
                children: [
                    '/js',
                    '/jquery'
                ]
            },
            {
                title: 'Архитектура',
                collapsable: false,
                children: [
                    '/commonjs',
                    '/components'
                ]
            }
        ]
    }
};