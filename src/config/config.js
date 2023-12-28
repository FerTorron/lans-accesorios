import dotenv from "dotenv"

dotenv.config()

export default {
    mongoUrl: process.env.MONGO_URL,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    githubUrl: process.env.GITHUB_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleUrl: process.env.GOOGLE_URL,
    nodeENV: process.env.NODE_ENV,
    gmailNodemailer: process.env.GMAIL_NODEMAILER,
    emailUrl: process.env.EMAIL_URL,
    tokenSecret: process.env.TOKEN_SECRET
}