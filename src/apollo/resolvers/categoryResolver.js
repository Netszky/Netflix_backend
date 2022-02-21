const Category = require('../../models/categoryModel');

module.exports = {
    Query : {
        getCategories: () => {
            return Category.find({});
        },
        getCategory: (parent, args, context) => {
            return Category.findById(args.id);
        }
    },
    Mutation: {
        createCategory: (parent, args) => {
            let category = new Category({
                name: args.name
            })
            return category.save()
        },
        updateCategory: (parent, args) => {
            return Category.findByIdAndUpdate(args.id, {
                name: args.name
            },{omitUndefined:true})
        },
        deleteCategory: async (parent, args) => {
            if(exist) {
                await Category.findByIdAndDelete(args.id)
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