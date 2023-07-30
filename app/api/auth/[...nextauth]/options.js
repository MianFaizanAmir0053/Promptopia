// import GoogleProvider from 'next-auth/providers/google'
// import GitHubProvider from 'next-auth/providers/github'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import User from '@models/user';
// import {connectToDatabase} from '@utils/database';

// export const options = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),
//         // CredentialsProvider({
//         //     name: "Credentials",
//         //     credentials: {
//         //         email: {
//         //             label: "Email:",
//         //             type: "text",
//         //         }
//         //     },
//         //     async authorize(credentials) {
//         //         try {
//         //             await connectToDatabase();

//         //             const user = await User.findOne({
//         //                 email: credentials?.email,
//         //             });

//         //             console.log(user, "user");

//         //             if (!user) {
//         //                 await User.create({
//         //                     email: credentials?.username,
//         //                     username: credentials?.username,
//         //                 });
//         //                 console.log("user created", user);
//         //             }

//         //             console.log("user found", user);

//         //             return true

//         //         } catch (error) {
//         //             console.log(error);
//         //             return false;
//         //         }
//         //     }
//         // })
//     ],


//     callbacks: {
//         async session({session}) {
//             const user = await User.findOne({email: session.user.email});
//             session.user.id = user._id.toString();
//             return session;
//         },
//         async signIn({profile}) {
//             try {
//                 await connectToDatabase();
//                 const userExists = await User.findOne({email: profile.email});
//                 if (!userExists) {
//                     await User.create({
//                         email: profile.email,
//                         username: profile.name.replace(" ", "").toLowerCase(),
//                         image: profile.picture
//                     });
//                     console.log("user created", userExists);
//                 }
//                 return true;
//             } catch (error) {
//                 console.log(error);
//                 return false;
//             }
//         }
//     }
// }