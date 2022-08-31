const { API } = require('../util/constant')
const { post_data } = require('../util/dao')

const uuid = require("uuid");

const route_controller = {
    method: "POST",
    path: API.CONTEXT + API.VERSION + API.MERCHANT,
    options: {
        handler: async (req, h) => {
            let oid = uuid.v4();
            let payload = req.payload;

            let cols = ["oid", "name_en", "name_bn", "company_name_en", "company_name_bn", "status", "created_by"]
            let scols = cols.join(', ');

            let params = ["$1", "$2", "$3", "$4", "$5", "$6", "$7"]
            let sparams = params.join(', ');

            const query = `insert into ${process.env.TABLE_NAME} (${scols}) values (${sparams})`


            let datas = [oid, payload.name_en, payload.name_bn, payload.company_name_en, payload.company_name_bn, "Active", payload.created_by]

            let sql = { text: query, values: datas }

            let data = await post_data(req.pg, sql);
            return h.response(data).code(201)
        }
    }
}

module.exports = route_controller