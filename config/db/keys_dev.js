// mLab connection string
// module.exports = {
//   mongoURI: "mongodb://user:letmein123@ds145926.mlab.com:45926/heroku_j4thq6c2",
//   secretOrKey: "secret"
// };
// mongodb Atlas connections string
const dbUrl = `mongodb+srv://field:${encodeURIComponent(
  "letmein123"
)}@gfp-cluster.whcxw.mongodb.net/?retryWrites=true&w=majority`;

module.exports = {
  mongoURI: dbUrl,
  secretOrKey: "secret"
};
