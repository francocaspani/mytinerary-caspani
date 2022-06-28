const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const usersControllers = {
    signUpUser: async (req, res) => {
        let { firstName, lastName, email, password, avatar, country, from } = req.body.userData
        try {
            const userExist = await User.findOne({ email })
            if (userExist) {
                if (userExist.from.indexOf(from) !== -1) {
                    res.json({
                        succes: false,
                        from: from,
                        message: 'You have already an account, please go to log in'
                    })
                } else {
                    const hashPassword = bcryptjs.hashSync(password, 10)

                    userExist.from.push(from)
                    userExist.password.push(hashPassword)
                    res.json({
                        succes: true,
                        from: from,
                        message: 'Now you can log in with' + from
                    })
                }
            } else {
                const hashPassword = bcryptjs.hashSync(password, 10)
                const newUser = await new User({
                    firstName,
                    lastName,
                    email,
                    password: [hashPassword],
                    avatar,
                    country,
                    from: [from]
                })
                if (from !== 'propietary-signup') {
                    await newUser.save()
                    res.json({
                        succes: true,
                        from: from,
                        message: 'Account created succesfully, now you can log in with' + from
                    })
                } else {
                    await newUser.save()
                    res.json({
                        succes: true,
                        from: from,
                        message: 'We have sent to you a verification email, please check your indox to validate you account'
                    })
                }
            }
        } catch (err){
            res.json({
                succes: false,
                message:'Something went wrong, please try again.'
            })
        }
    },
    logInUser: async (req, res) => {
        const { email, password, from} = req.body.loggedUser
        console.log(req.body.loggedUser)
        try {
            const userExist = await User.findOne({ email })
            if (!userExist) {
                res.json({
                    succes: false,
                    message: 'There is not account with that email, please Sign Up first'
                })
            } else {
                if (from !== 'propietary-signup'){
                    let matchPassword = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
                    if (matchPassword.length > 0){
                        const userData = {
                            id: userExist._id,
                            firstName: userExist.firstName,
                            lastName: userExist.lastName,
                            email: userExist.email,
                            from: from
                        }
                        res.json({
                            succes: true,
                            from: from,
                            response: {userData},
                            message: 'Welcome back ' + userData.firstName
                        })
                    } else {
                        res.json({
                            succes: false,
                            from: from,
                            message: 'There is no account connected with that '+from+' account, please Sign Up first'
                        })
                    }
                } else {
                    let matchPassword = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
                    console.log(matchPassword.length);
                    if (matchPassword.length > 0){
                        const userData = {
                            id: userExist._id,
                            firstName: userExist.firstName,
                            lastName: userExist.lastName,
                            email: userExist.email,
                            from: from
                        }
                        res.json({
                            succes: true,
                            from: from,
                            response: {userData},
                            message: 'Welcome back ' + userData.firstName
                        })
                    } else {
                        res.json({
                            succes: false,
                            from: from,
                            message: 'Your email or password are incorrect.'
                        })
                    }
                }
            }
        } catch(error){
            console.log(error)
            res.json({
                succes: false,
                message: 'Something went wrong, please try again.'
                
            })
        }
    }
}

module.exports = usersControllers