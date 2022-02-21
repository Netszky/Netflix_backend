const Person = require('../../models/personModel');

module.exports =  {
    Query: {
        getPersons: () => {
            return Person.find({})},
        getPerson: (parent, args, context) => {
            return Person.findById(args.id)
        },
    },

    Mutation: {
        createPerson: (parent,args) => {
            let person = new Person({
               name: args.name
            })
            return person.save()
        },
        updatePerson:(parent, args) => {
            return Person.findByIdAndUpdate(args.id,{
               name: args.name
            },{omitUndefined:true})
        },
        deletePerson: async (parent, args) => {
           const exist =  await Person.exists({_id: args.id})

            if(exist) {
                await Person.findByIdAndDelete(args.id)
                return {
                    message: "Document supprimé",
                    test: args.id,
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