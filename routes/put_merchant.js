const { API } = require('../util/constant')
const { update_data } = require('../util/dao')

const route_controller = {
    method: "PUT",
    path: API.CONTEXT + API.VERSION + API.MERCHANT + API.ID,
    options: {
        handler: async (req, h) => {
            const query = `update ${process.env.TABLE_NAME} set name_en = $1, name_bn = $2, company_name_en = $3, company_name_bn = $4,updated_by = $5,updated_on=current_timestamp where oid = $6`

            let payload = req.payload;

            let datas = [payload.name_en, payload.name_bn, payload.company_name_en, payload.company_name_bn, payload.updated_by, req.params.id]

            let sql = { text: query, values: datas }
            let data = await update_data(req.pg, sql);
            return h.response(data).code(200)
        }
    }
}

module.exports = route_controller