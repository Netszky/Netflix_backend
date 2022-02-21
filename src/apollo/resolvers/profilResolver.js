const Profil = require('../../models/profilModel');

module.exports = {
    Query: {
        getProfils: () => {
            return Profil.find({})
        },
        getProfil: (parent, args) => {
            return Profil.findById(args.id).populate("wishlist");
        }
    },
    Mutation: {
        createProfil: async (parent, args) => {
            let profil = await new Profil({
                name: args.name,
                image: args.image,
                wishlist: args.wishlist
            })
            return profil.save()
        },
        updateProfil: (parent, args, context) => {
            return Profil.findByIdAndUpdate(args.id, args, { omitUndefined: true })
        },
        updateWishlist: (parent, args, context) => {
            return Profil.findByIdAndUpdate(args.id, {
                wishlist: args.wishlist
            }, {omitUndefined:true}
            )
        },

        deleteProfil: async (parent, args) => {
            const exist = await Profil.exists({ _id: args.id })

            if (exist) {
                await Profil.findByIdAndDelete(args.id)
                return {
                    message: "Document supprimé",
                    code: 204
                }

            } else {
                return {
                    message: "Document non trouvé",
                    code: 404
                }
            }
        }
    }
}