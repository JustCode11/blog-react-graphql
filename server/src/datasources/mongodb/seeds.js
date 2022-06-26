const mongoose = require("mongoose");
const { Entry, Comment, User, Tag } = require("./models");

const seedUser = [
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb13000001"),
        username: "TestUser1",
        firstname: "Max",
        lastname: "Mustermann",
        email: "maxmustermann@mail.com",
        password: "$2b$10$fKy007ln7AYjEWjL0Cs8We0yipilgl5oz2wtXNvzADtoTVesNLbIi" // "123456"
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb13000002"),
        username: "TestUser2",
        firstname: "Erika",
        lastname: "Mustermann",
        email: "erikamustermann@mail.com",
        password: "$2b$10$fKy007ln7AYjEWjL0Cs8We0yipilgl5oz2wtXNvzADtoTVesNLbIi" // "123456"
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb13000003"),
        username: "TestUser3",
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@mail.com",
        password: "$2b$10$fKy007ln7AYjEWjL0Cs8We0yipilgl5oz2wtXNvzADtoTVesNLbIi" // "123456"
    }
];

const seedTag = [
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb14000001"),
        description: "JavaScript"
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb14000002"),
        description: "Python"
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb14000003"),
        description: "C#"
    }
];

const seedEntry = [
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb15000001"),
        title: "JavaScript Beispiel",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, ab.",
        user: mongoose.Types.ObjectId("4edd40c86762e0fb13000001"),
        tags: [
            mongoose.Types.ObjectId("4edd40c86762e0fb14000001")
        ]
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb15000002"),
        title: "Csharp JavaScript Beispiel",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        user: mongoose.Types.ObjectId("4edd40c86762e0fb13000002"),
        tags: [
            mongoose.Types.ObjectId("4edd40c86762e0fb14000001"),
            mongoose.Types.ObjectId("4edd40c86762e0fb14000003")
        ]
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb15000003"),
        title: "Dritter Beispiel Blogeintrag",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        user: mongoose.Types.ObjectId("4edd40c86762e0fb13000003"),
        tags: [
            mongoose.Types.ObjectId("4edd40c86762e0fb14000001")
        ]
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb15000004"),
        title: "Vierter Beispiel Blogeintrag",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        user: mongoose.Types.ObjectId("4edd40c86762e0fb13000001"),
        tags: [
            mongoose.Types.ObjectId("4edd40c86762e0fb14000002")
        ]
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb15000005"),
        title: "Fünfter Beispiel Blogeintrag",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        user: mongoose.Types.ObjectId("4edd40c86762e0fb13000002"),
        tags: [
            mongoose.Types.ObjectId("4edd40c86762e0fb14000002")
        ]
    }
];

const seedComment = [
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb16000001"),
        content: "Lorem ipsum dolor sit amet.",
        user: mongoose.Types.ObjectId("4edd40c86762e0fb13000002"),
        entry: mongoose.Types.ObjectId("4edd40c86762e0fb15000001")
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb16000002"),
        content: "2 Lorem ipsum dolor sit amet.",
        user: mongoose.Types.ObjectId("4edd40c86762e0fb13000001"),
        entry: mongoose.Types.ObjectId("4edd40c86762e0fb15000001")
    },
    {
        _id: mongoose.Types.ObjectId("4edd40c86762e0fb16000003"),
        content: "Adipisicing elit. Corporis, aliquam.",
        user: mongoose.Types.ObjectId("4edd40c86762e0fb13000001"),
        entry: mongoose.Types.ObjectId("4edd40c86762e0fb15000002")
    }
];

const seedUserDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUser);
};

const seedTagDB = async () => {
    await Tag.deleteMany({});
    await Tag.insertMany(seedTag);
};

const seedEntryDB = async () => {
    await Entry.deleteMany({});
    await Entry.insertMany(seedEntry);
};

const seedCommentDB = async () => {
    await Comment.deleteMany({});
    await Comment.insertMany(seedComment);
};

module.exports = {
    seedUserDB,
    seedTagDB,
    seedEntryDB,
    seedCommentDB
}