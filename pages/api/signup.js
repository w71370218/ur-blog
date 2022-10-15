import connect from "../../lib/connect"
import clientPromise from "../../lib/mongodb";
import Users from "../../models/users"
import bcrypt from "bcrypt";

connect();

export default async function handler(req, res) {
    const body = req.body;
    const userExist = await Users.findOne({ username: body.username });

    if (userExist) {
        res.status(200).json({ message: '此帳號已經註冊' })
        return;
    }
    const mongoClient = await clientPromise

    const db = mongoClient.db("ur-blog");
    const records = db.collection("records");
    var myquery = { name: "users" };
    const result = await records.findOne(myquery);

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(body.password, salt);

    var now_time = new Date().toString();

    const user = new Users(
        {
            username: body.username,
            password: hashpass,
            id: result.count + 1,
            role: "user",
            createdTime: now_time,
            lastLoginTime: now_time

        }
    );

    await user.save()
    var newvalues = { $set: { count: result.count + 1, updateTime: now_time } };
    records.updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("Record document updated");
    });

    res.status(200).json({ message: "註冊成功" })
}