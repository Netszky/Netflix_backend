const User = require('../../models/userModel')
const bcrypt = require('bcrypt');

module.exports = {
    Query: {
        getUsers: () => {
            return User.find({});
        },
        getUser: (parent, args) => {
            return User.findById(args.id).populate("sub");
        },
        getUserProfil: (parent, args, context) => {
            return User.findById(context.userId).populate("profil");
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            let password = bcrypt.hashSync(args.User.password, 10);
            let user = await new User({
                firstname: args.User.firstname,
                password: password,
                isAdmin: false,
                email: args.User.email,
                profil: args.User.profil
            })
            return user.save()
        },
        updateUser: (parent, args) => {
            return User.findByIdAndUpdate(args.id, {
                
                    firstname: args.firstname,
                    email: args.email,
                    password: args.password,
                    $addToSet: {
                        profil: args.profil
                    },
                    isSub: args.isSub,
                    isAdmin: args.isAdmin,
                    stripeID: args.stripeID

                    
                
            },{omitUndefined:true}
            )
        },
        deleteUser: async (parent, args) => {
            const exist = await User.exists({ _id: args.id })
            if (exist) {
                await User.findByIdAndDelete(args.id)
                return {
                    message: "Document supprimé",
                    code: 204
                }

            } else {
                return {
                    message: "Document non trouvé",
                    test: args.id,
                    code: 404
                }
            }
        }
    }
}