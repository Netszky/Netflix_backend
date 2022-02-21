const Serie = require('../../models/serieModel');


module.exports =  {
    Query: {
        getSeries: () => {
            return Serie.find({}).populate('categories').populate("director").populate("actor")},
        getSerie: (parent, args, context) => {
            return Serie.findById(args.id).populate('categories').populate("director").populate("actor")
        },
    },

    Mutation: {
        createSerie: (parent,args) => {
            let serie = new Serie({
                create_date: args.Serie.create_date,
                name: args.Serie.name,
                categories: args.Serie.categories,
                actor: args.Serie.actor,
                duration: args.Serie.duration,
                description: args.Serie.description,
                director: args.Serie.director,
                year: args.Serie.year
            })
            return serie.save()
        },
        updateSerie:(parent, args) => {
            return Serie.findByIdAndUpdate(args.Serie.id,{
                create_date: args.Serie.create_date,
                name: args.Serie.name,
                categories: args.Serie.categories,
                actor: args.Serie.actor,
                description: args.Serie.description,
                duration: args.Serie.duration,
                director: args.Serie.director,
                year: args.Serie.year
            },{omitUndefined:true})
        },
        deleteSerie: async (parent, args) => {
           const exist =  await Serie.exists({_id: args.id})

            if(exist) {
                await Serie.findByIdAndDelete(args.id)
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