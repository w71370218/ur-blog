import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import connect from "../../../lib/connect";
import Users from "../../../models/users";
import bcrypt from "bcrypt";

connect();

export default NextAuth({
    providers: [
        CredentialProvider({
            name: 'credentials',
            async authorize(credentials, req) {
                const username = credentials.username;
                const password = credentials.password;

                const user = await Users.findOne({ username });
                if (!user) {
                    throw new Error("此帳號尚未註冊")
                }
                if (user) {
                    return await signInUser({ password, user })
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/signin',
    },
    secret: 'secrect',
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.username = user.username
                token.id = user.id
                token.role = user.role
                token.lastLoginTime = user.lastLoginTime,
                    token.createdTime = user.createdTime
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.username = token.username
                session.user.id = token.id
                session.user.role = token.role
                session.user.lastLoginTime = token.lastLoginTime,
                    session.user.createdTime = token.createdTime
            }
            return session;
        },
    },
});

const signInUser = async ({ password, user }) => {
    if (!password || password === '') {
        throw new Error("請輸入密碼")
    }
    const isMacth = await bcrypt.compare(password, user.password);
    if (!isMacth) {
        throw new Error("密碼輸入錯誤")
    }

    var now_time = new Date().toString();

    user.lastLoginTime = now_time
    await user.save()
    const logedInUser = {
        username: user.username,
        id: user.id,
        role: user.role,
        lastLoginTime: user.lastLoginTime,
        createdTime: user.createdTime
    }

    return logedInUser
}