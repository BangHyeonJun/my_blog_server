import Movie from "./Movie";

const resolvers = {
    Query: {
        movie: (_, { title }) => {
            return Movie.findOne({ title }); // 데이터베이스에서 특정 하나의 데이터 조회
        }
    },

    Mutation: {
        addMovie: async (_, { title, rating }) => {
            let movie = new Movie({
                title,
                rating
            });
            console.log(movie.save());
            return true; // 데이터베이스에 저장
        }
    }
};

export default resolvers;
