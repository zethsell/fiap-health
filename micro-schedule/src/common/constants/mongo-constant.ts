import 'dotenv/config';

export const mongoConstant = {
  url: process.env.MONGO_URL,
  options: {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  },
};
