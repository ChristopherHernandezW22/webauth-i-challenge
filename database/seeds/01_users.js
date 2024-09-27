exports.seed = function(knex) {
  return knex("users")
  .insert([
    {
      username: "Chris", 
      password: "12345"
    },
    { 
      username: "Bruce",
      password: "$1337$"
    },
    { 
      username: "Steve", 
      password: "SC316" 
    },
  ]);
};