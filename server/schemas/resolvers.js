let {User, Book} = require('../models');
let {AuthenticationError} = require('apollo-server-express');
let {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
            
        }
    },

    Mutation: {
        login: async(parent, {email, password})=> {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword) {
                throw new AuthenticationError('Incorrect credentials')
            }

            let token = signToken(user);
            return{token, user};
        },
    }
}