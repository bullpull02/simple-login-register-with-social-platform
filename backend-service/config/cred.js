const discord = {
    client_id : "1080379668143804418",
    client_secret : "o0jOmoSaTREmsJVFLUWH_FBMb-HQ9_Oy",
    callback_url : "http://localhost:8000/api/v1/user/sessions/oauth/discord"
}
const google = {
    client_id : "1071226693678-ckfpvtck6kirqh6m9um4a59t4984rs2d.apps.googleusercontent.com",
    client_secret : "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",
    callback_url : "http://localhost:8000/api/v1/user/sessions/oauth/google"
}
const twitter = {
    consumerKey: "KKBIawUSE_OWNPJwM",
    consumerSecret: "BJCahJjoUSE_OWNTStPFAj",
    callbackURL: "http://localhost:8000/api/v1/user/sessions/oauth/twitter",
}
const github = {
    client_id: "c07d57a8e9fe1ea18c4d",
    client_secret: "55c65a49ce29784c0b993e9f1e76a206f026253d",
    callbackURL: "http://localhost:3000"
}
module.exports = {discord,google,twitter,github}