import clientPromise from "../mongodb";

const updateRecord = async (record) => {
    const mongoClient = await clientPromise

    const db = mongoClient.db("ur-blog");
    const records = db.collection("records");


    var now_time = new Date().toString();
    var newvalues = { $set: { count: record.count, updateTime: now_time } };
    records.updateOne({ name: record.name }, newvalues, function (err, res) {
        if (err) throw err;
        console.log(`Record: ${record.name} document updated`);
    });
}

export default updateRecord;