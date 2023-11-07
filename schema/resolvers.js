const {UserList,MovieList } = require('../FakeData');
const jwt = require('jsonwebtoken')
const _ = require("lodash")


const resolvers = {
    Query: {
        users: (parent,args,context) => {
            if(!context.user){
                return null
            }
            return UserList
        },      

        user: (parent,args,context) => {
            if(!context.user){
                return null
            }
            const id = args.id;
            const user = _.find(UserList, { id : Number(id) })
            return user;
        },

        movies: (parent, args,context) => {
            if(!context.user){
                return null
            }
            return MovieList
        },

        movie: (parent, args,context) => {
            if(!context.user){
                return null
            }
            const name = args.name;
            const movie = _.find(MovieList, { name:name })
            return movie;
        },
    },
    User: {
        favouriteMovies: () => {
            return _.filter(MovieList, (movie) => 
                movie.yearOfPublication >=2000 && movie.yearOfPublication <= 2010
            )
        },
    },

    Mutation: {
        createUser: (parent,args) => {
            const user = args.input;
            const lastId = UserList[UserList.length-1].id;
            user.id = lastId+1;
            UserList.push(user)
            return user
        } ,
        updateUsername: (parent,args) => {
         const {id,newUsername} = args.input;
         let userUpdated;
         UserList.forEach((user) => {
            if(user.id === Number(id)) {
                user.username = newUsername;
                userUpdated = user
            }
         }
         );
            return userUpdated
    },
        deleteUser:  (parent,args) => {
            const id = args.id;
             _.remove(UserList, (user) => user.id === Number(id));
            return null
        },
        login: (_, __, { res }) => {

            const user = {
              id: 1,
              userName: 'ajith',
            };

            const accessToken = jwt.sign({ user }, 'rahul', { expiresIn: '1h' });
            const refreshToken = jwt.sign({ user }, 'rahul', { expiresIn: '1d' });
      
       
            return { accessToken, refreshToken,};
          },


          refreshAccessToken: (parent,args) => {

            const { refreshToken } = args;
            console.log(refreshToken)
      
            if (!refreshToken) {
              throw new Error('Access Denied. No refresh token provided.');
            }
      
            try {
              const decoded = jwt.verify(refreshToken, 'rahul');
              const accessToken = jwt.sign({ user: decoded.user }, 'rahul', { expiresIn: '1h' });
      
              return { accessToken };
            } catch (error) {
              throw new Error('Invalid refresh token.');
            }
          },
    },
}

module.exports = { resolvers };