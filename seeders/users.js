"use strict";

const Users = require("../models/users");

module.exports = {
  create: () => {
    const list = [
      {
        name: "User1",
        username: "user1",
        password: "user1",
        email: "user1@gmail.com",
        createAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "user2",
        username: "user2",
        password: "user2",
        email: "user2@gmail.com",
        createAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "user3",
        username: "user3",
        password: "user3",
        email: "user2@gmail.com",
        createAt: new Date(),
        updatedAt: new Date()
      }
    ];

    list.forEach(async data => {
      const users = await new Users(data);
      await users.save();
    });
  },

  drop: async () => {
    const users = await Users.find();
    if (users.length) await Users.collection.drop();
  }
};
