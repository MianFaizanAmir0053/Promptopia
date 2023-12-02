import User from "@models/user";
import { connectToDatabase } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { Cookie } from "next/font/google";

function generateString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function isAlphaNumeric(str) {
  // Regex to check valid
  // alphanumeric string
  let regex = new RegExp(
    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  );

  // if str
  // is empty return false
  if (str == null) {
    return "false";
  }

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) == true) {
    return str;
  } else {
    const string = str.concat(generateString(5));
    return string.replace(" ", "_").toLowerCase();
  }
}

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
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        console.log(profile, "profile");
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          const username = isAlphaNumeric(
            profile.name.replace(" ", "").toLowerCase()
          );
          await User.create({
            email: profile.email,
            username: username,
            image: profile.avatar_url ? profile.avatar_url : profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
