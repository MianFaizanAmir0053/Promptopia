import User from "@models/user";
import {connectToDatabase} from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";



export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async session({session}) {
            const user = await User.findOne({email: session.user.email});
            session.user.id = user._id.toString();
            return session;
        },
        async signIn({profile}) {
            try {
                await connectToDatabase();
                const userExists = await User.findOne({email: profile.email});
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image:
                            account.provider == "google"
                                ? profile.picture
                                : profile.avatar_url,
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})
export {handler as GET, handler as POST};