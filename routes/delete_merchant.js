const { API } = require('../util/constant')
const { delete_data } = require('../util/dao')

const route_controller = {
    method: "DELETE",
    path: API.CONTEXT + API.VERSION + API.MERCHANT + API.ID,
    options: {
        handler: async (req, h) => {
            const query = `delete from ${process.env.TABLE_NAME} where oid=$1 returning 1`

            let datas = [req.params.id]

            let sql = { text: query, values: datas }

            let data = await delete_data(req.pg, sql);
            return h.response(data).code(200)
        }
    }
}

module.exports = route_controller
