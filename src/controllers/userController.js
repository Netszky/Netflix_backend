const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtConfig = require('../configs/jwt.config');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Methode de création de user
 */
exports.register = (req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        firstname: req.body.firstname,
        email: req.body.email,
        isAdmin: false,
        isSub: false,
        password: hashPassword
    })
    user.save()
        .then((data) => {
            let userToken = jwt.sign({
                id: data._id,
                isAdmin: data.isAdmin
            }, jwtConfig.secret,
                {
                    expiresIn: 80000
                },

            )
            res.send({ data, userToken })
            const mailjet = require('node-mailjet')
                .connect('2fc6c1eb1282df906149de7974b5f65a', '77daf3005abc15c0e150412225994293')
            const request = mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [
                        {
                            "From": {
                                "Email": "julien.chigot@ynov.com",
                                "Name": "Netflix"
                            },
                            "To": [
                                {
                                    "Email": data.email,
                                    "Name": data.firstname
                                }
                            ],
                            "Subject": "Registering successful",
                            "TextPart": "My first Mailjet email",
                            "HTMLPart": "<h1>Hello Thanks for registering to Netflix !" ,
                            // "CustomID": "AppGettingStartedTest"
                        }
                    ]
                })
            request
                .then((result) => {
                    console.log(result.body)
                })
                .catch((err) => {
                    console.log(err.statusCode)
                })
        })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message || "Error"
            })
        })
}

exports.login = (req, res) => {
    const email = req.body.email
    User.findOne({
        email: req.body.email
    }).then((data) => {
        console.log(data.password)
        if (bcrypt.compareSync(req.body.password, data.password)) {
            let userToken = jwt.sign({
                id: data._id,
                isAdmin: data.isAdmin,
                isSub: data.isSub
            },
                jwtConfig.secret,
                {
                    expiresIn: 80000
                }
            )
            res.send({
                token: userToken,
                auth: true,
                user: data
            })
        } else {
            res.status(401).send({
                message: "Password invalid",
                auth: false,
                token: null
            })
        }
    }).catch((err) => {
        console.log(err.message);
        return res.status(401).send({
            error: 401,
            message: err.message || "User Unknown"
        })
    })


}
exports.getUser = (req, res) => {
    User.findById(req.user.id)
        .then((data) => {
            res.send({
                user: data
            }
            )
        })
        .catch((err) => {
            return res.status(500).send({
                error: 500,
                user: "Not Found"
            })
        })
}
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.user.id, req.body, {
        new: true
    })
        .then(data => {
            res.status(200).send({ user: data })
        })
        .catch(err => res.status(500).send({ err: err }))
}

exports.verify = (req, res) => {
    if (req.user) {
        res.status(200).send({ verified: true })
    }
}
exports.verifySub = (req, res) => {
    console.log(req.user.id)
    User.findOne({
        _id: req.user.id
    }).then((data)=> {
        if (data.isSub) {
            res.status(200).send({ verified: true })
        } else {
            res.status(200).send({ verified: false })
        }
    }).catch((err) => console.log(err))
}
exports.verifyAdmin = (req, res) => {
    if (req.user.isAdmin) {
        res.status(200).send({ verified: true })
    } else {
        res.status(200).send({ verified: false })
    }
}

exports.getOrder = (req, res) => {
    User.findById(req.user.id)
        .populate('orders')
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
}