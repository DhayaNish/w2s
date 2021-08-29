module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstname: String,
      lastname: String,
      gender:String,
      email: String,
      mobilenumber:String,
      address:String,
      password:String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v,_id, password,...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const test = mongoose.model("testuser", schema);
  return test;
};