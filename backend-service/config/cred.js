const discord = {
    client_id : "1080379668143804418",
    client_secret : "o0jOmoSaTREmsJVFLUWH_FBMb-HQ9_Oy",
    callback_url : "http://localhost:8000/api/v1/user/sessions/oauth/discord"
}
const google = {
    client_id : "42056636488-5pcnca03i14e5s0747qfqjbiddluf1ng.apps.googleusercontent.com",
    client_secret : "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",
    callback_url : "http://localhost:8000/api/v1/user/sessions/oauth/google"
}
const twitter = {
    consumerKey: "TWITTER_CONSUMER_KEY",
    consumerSecret: "TWITTER_CONSUMER_SECRET",
    callbackURL: "http://localhost:8000/api/v1/user/sessions/oauth/twitter",
}
module.exports = {discord,google,twitter}