const { buildSchema } = require("graphql");
const UserModel = require('../Models/UserModel');

const schema = buildSchema(`  
    type User {
        id: ID!
        username: String!
        name: String!
        email: String!
        age: Int!
        address: String!
    }

    type Query {
        getUsers: [User!]
        getUser(id: ID!): User
    }
        type DeleteUserResponse {
            success: Boolean!
            message: String!
            deletedUser: User
        }

    type Mutation {
        createUser(
            username: String!
            name: String!
            email: String!
            age: Int!
            address: String!
        ): User!

        updateUser(
            id: ID!
            username: String!
            name: String!
            email: String!
            age: Int!
            address: String!
        ): User!

        deleteUser(id: ID!): DeleteUserResponse!
    }
`);

const root = {
    getUsers: async () => await UserModel.find(),

    getUser: async ({ id }) => await UserModel.findById(id),

    createUser: async ({ username, name, email, age, address }) => {
        try {
            const user = new UserModel({ username, name, email, age, address });
            return await user.save();
        } catch (err) {
            if (err.name === 'ValidationError') {
                throw new Error('User validation failed: ' + err.message);
            }
            throw new Error('User Creation Failed');
        }
    },

    updateUser: async ({ id, username, name, email, age, address }) => {
        try { 
            const userFind = await UserModel.findByIdAndUpdate(
                id, { username, name, email, age, address }, 
                { new: true, runValidators: true }
            );
            return userFind;
        } catch (err) {
            if (err.name === 'ValidationError') {
                throw new Error('User validation failed: ' + err.message);
            }
            throw new Error('User Update Failed');
        }
    },

    deleteUser: async ({ id }) => {
        try {
            const userDelete = await UserModel.findById(id);
            if (!userDelete) {
                return {
                    success: false,
                    message: `No user found with ID: ${id}`,
                    deletedUser: null
                };
            }
    
            await UserModel.findByIdAndDelete(id);
            return {
                success: true,
                message: "User deleted successfully",
                deletedUser: userDelete
            };
        } catch (err) {
            return {
                success: false,
                message: 'Error deleting user: ' + err.message,
                deletedUser: null
            };
        }
        throw new Error('User Deletion Failed');
        
        
    
    }
};

module.exports = { schema, root };
