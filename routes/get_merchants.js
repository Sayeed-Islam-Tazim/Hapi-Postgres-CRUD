const { API } = require('../util/constant')
const { get_data } = require('../util/dao')

const route_controller = {
    method: 'GET',
    path: API.CONTEXT + API.VERSION + API.MERCHANT,
    options: {
        handler: async (req, h) => {
            const query = `select * from ${process.env.TABLE_NAME} order by oid asc`;

            let data = await get_data(req.pg, query);
            return h.response(data).code(200);
        }
    }
}

module.exports = route_controller