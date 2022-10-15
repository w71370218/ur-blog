import connect from "../../lib/connect"
var User = require("../../models/users.js");

connect();

async function handler(req, res) {
    try {
        var now_time = new Date().toString();
        const { username, password } = req.body;
        let user = await User.findOneAndUpdate(
            {
                username: username,
                password: password
            },
            { lastLoginTime: now_time },
            { runValidators: true }
        )


        if (!user) {
            //return res.status(500).json({ msg: 'User was not found' });
            res.status(500).send({ "status": 'User not Found' });
            //return res.json({ "status": 'User not Found' })
        } else {
            await user.save();
            res.redirect('/')
        }
    }
    catch (e) {
        console.error(e)
        res.status(500).json(e);
    }
}

export default handler