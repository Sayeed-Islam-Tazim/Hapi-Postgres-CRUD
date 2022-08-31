'use strict'

const get_data = async (pool, query) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const res = await client.query(query)
        await client.query("COMMIT");
        return {
            status: true,
            code: 200,
            message: res.rows
        };
    } catch (err) {
        await client.query("ROLLBACK");
        return `error in get all merchants ${err}`;
    } finally {
        client.release();
    }
}

const get_singleData = async (pool, query) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const res = await client.query(query)
        if (res.rowCount > 0) {
            await client.query("COMMIT");
            return {
                status: true,
                code: 200,
                message: res.rows
            };
        }
        else {
            await client.query("ROLLBACK");
            return 'There is no such merchant with this oid'
        }
    } catch (err) {
        await client.query("ROLLBACK");
        return `error in get merchants ${err}`;
    } finally {
        client.release();
    }
}

const post_data = async (pool, query) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const res = await client.query(query);
        await client.query("COMMIT");
        return {
            status: true,
            code: 201,
            message: "Merchant Added Successfully!"
        };
    } catch (err) {
        await client.query("ROLLBACK");
        return `error in post merchants ${err}`
    } finally {
        client.release();
    }
}

const update_data = async (pool, query) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const res = await client.query(query);

        if (res.rowCount > 0) {
            await client.query("COMMIT");
            return {
                status: true,
                code: 200,
                message: "Merchant Updated Successfully!"
            };
        } else {
            await client.query("ROLLBACK");
            return "There is no such merchant with this oid"
        }
    } catch (err) {
        await client.query("ROLLBACK");
        return "There is no merchant"
    } finally {
        client.release();
    }
}

const delete_data = async (pool, query) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const res = await client.query(query);
        if (res.rowCount > 0) {
            await client.query("COMMIT");
            return {
                status: true,
                code: 200,
                message: "Merchant Deleted Successfully!"
            };
        } else {
            await client.query("ROLLBACK");
            return "There is no such merchant with this oid";
        }
    } catch (err) {
        await client.query("ROLLBACK");
        return "There is no merchant"
    } finally {
        client.release();
    }
}

module.exports = {
    get_data: get_data,
    get_singleData: get_singleData,
    post_data: post_data,
    update_data: update_data,
    delete_data: delete_data
}