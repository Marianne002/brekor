// app/api/auth/[...nextauth].js
import { connectToDB } from "@mongodb/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/User";
import { compare } from "bcryptjs";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        // Add Google OAuth provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        // Add credentials provider
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials, req) {
                console.log("Credentials received:", credentials);

                await connectToDB();

                // Check if the user already exists in the database
                const user = await User.findOne({ email: credentials.email });
                console.log("User found:", user);

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                // Check if the password is correct
                const isMatch = await compare(credentials.password, user.password);
                console.log("Password match:", isMatch);
                
                if (!isMatch) {
                    throw new Error("Invalid email or password");
                }

                return user;
            }
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    // A database is optional, but required to persist accounts in a database
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            session.user.profileImagePath = sessionUser.profileImagePath;
    
            return session;
        },

        async signIn({ account, profile }) {
            if (account.provider === "google") {
                try {
                    await connectToDB();

                    // Check if the user already exists in the database
                    let user = await User.findOne({ email: profile.email });

                    // If the user does not exist, create a new user
                    if (!user) {
                        user = await User.create({
                          email: profile.email,
                          username: profile.name,
                          profileImagePath: profile.picture,
                          wishlist: [],
                          cart: [],
                          order: [],
                          work: [],
                        });
                    }

                    return user;
                } catch (err) {
                    console.log("Error checking if user exists: ", err.message);
                }
            }
            return true;
        },
    }
});

export { handler as GET, handler as POST };
