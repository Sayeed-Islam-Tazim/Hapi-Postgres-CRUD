const { API } = require('../util/constant');
const { get_singleData } = require('../util/dao')


const route_controller = {
    method: 'GET',
    path: API.CONTEXT + API.VERSION + API.MERCHANT + API.ID,
    options: {
        handler: async (req, h) => {
            const query = `select * from ${process.env.TABLE_NAME} where oid = $1`

            let datas = [req.params.id]

            let sql = { text: query, values: datas }

            let data = await get_singleData(req.pg, sql);
            return h.response(data).code(200);
        }
    }
}

module.exports = route_controller