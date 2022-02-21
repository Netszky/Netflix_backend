const ProfilImage = require('../../models/imageProfil');

module.exports = {
    Query : {
        getProfilsImages: () => {
            return ProfilImage.find({});
        },
    },
    Mutation: {
        createProfilImage: (parent, args) => {
            let profilImage = new ProfilImage({
                url: args.url
            })
            return profilImage.save()
        },
        deleteProfilImage: async (parent, args) => {
            const exist = await ProfilImage.exists({ _id: args.id })
            if(exist) {
                await ProfilImage.findByIdAndDelete(args.id)
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