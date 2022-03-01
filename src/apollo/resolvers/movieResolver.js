const Movie = require('../../models/movieModel');


module.exports = {
    Query: {
        getMovies: () => {
            return Movie.find({}).populate('categories').populate("director").populate("actor")
        },
        getMovie: (parent, args, context) => {
            return Movie.findById(args.id).populate('categories').populate("director").populate("actor")
        },
        getMoviesByCategory: (parent, args, context) => {
            const result=  Movie.find({}).populate('categories').populate("director").populate("actor")
            return result.find({categories: args.categories});
        },
        getMoviesByCategories: (parent, args, context) => {
            const result = Movie.find({}).populate('categories').populate("director").populate("actor");
            return result.find({categories: {$elemMatch: { name: args.categories}}});
        }
    },

    Mutation: {
        createMovie: (parent, args) => {
            let movie = new Movie({
                create_date: args.Movie.create_date,
                description: args.Movie.description,
                name: args.Movie.name,
                categories: args.Movie.categories,
                actor: args.Movie.actor,
                duration: args.Movie.duration,
                director: args.Movie.director,
                year: args.Movie.year,
                image: args.Movie.image,
                url: args.Movie.url
            })
            return movie.save()
        },
        updateMovie: (parent, args) => {
            return Movie.findByIdAndUpdate(args.Movie.id, {
                create_date: args.Movie.create_date,
                name: args.Movie.name,
                description: args.Movie.description,
                $addToSet: {
                    categories: args.Movie.categories,
                },
                $addToSet: {
                    actor: args.Movie.actor,
                },
                $addToSet: {
                    director: args.Movie.director,
                },
                duration: args.Movie.duration,
                year: args.Movie.year,
                image: args.Movie.image,
                url: args.Movie.url

            },{omitUndefined:true})
        },
        deleteMovie: async (parent, args) => {
            const exist = await Movie.exists({ _id: args.id })
            if (exist) {
                await Movie.findByIdAndDelete(args.id)
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