module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    processRegister : (req,res) => {
        return res.send(req.body)
    },
    login : (req,res) => {
        return res.render('login')
    },
    processLogin : (req,res) => {
        return res.send(req.body)
    },
}