import clientPromise from "../mongodb";

const findRecord = async (category) => {

    const mongoClient = await clientPromise

    const db = mongoClient.db("ur-blog");
    const records = db.collection("records");

    var myquery = { name: category };
    const result = await records.findOne(myquery);
    return result
}

export default findRecord;