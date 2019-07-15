import Mock from 'mockjs'

const data = Mock.mock({
    'items': [{
        path: "/example",
        name: 'example',
        state: 1,
        component: "Layout",
        meta: {
            title: "第一"
        },
        children: [
            {
                path: "table",
                name: 'table',
                component: "table/index",
                meta: {
                    title: "第一表格",
                }
            },
            {
                path: "tree",
                name: 'tree',
                component: "tree/index",
                meta: {
                    title: "第一树",
                }
            }
        ]
    },{
        path: '/form',
        name: 'form',
        component: 'Layout',
        state: 1,
        meta: { title: '一个表格'},
        children: [
            {
            path: 'index',
            name: 'form1',
            component: "form/index",
            meta: { title: '第一表单'}
            }
        ]
    },]
})

export default [
    {
        url: '/role/list',
        type: 'get',
        response: config=> {
            const items = data.items
            return {
                code: 20000,
                data: {
                    role: 'admin',
                    items: items
                }
            }
        }
    },
    {
        url: '/activate',
        type: 'post',
        response: config=> {
            const items = data.items
            // items[0].state = 1
            // items[0].state == 1 ? items[0].state = 0 : items[0].state = 1
            // items[0].children[0].state == 1 ? items[0].children[0].state = 0 : items[0].children[0].state = 1
            // items[1].state == 1 ? items[1].state = 0 : items[1].state = 1
            return {
                code: 20000,
                msg: '激活码失效',
                data: {
                    role: 'admin',
                    items: items
                }
            }
        }
    }
]