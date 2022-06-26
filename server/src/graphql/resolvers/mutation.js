const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    login: async (_, { input: { email, password } }, { models, res }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({ email });
        if (!user) {
            throw new AuthenticationError("Der Benutzer wurde nicht gefunden!");
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new AuthenticationError("Falsches Passwort!");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });
        res.clearCookie("authToken");
        res.cookie("authToken", token, {
            maxAge: 14 * 60 * 60 * 1000 // 24 Stunden
        });
        return true;
    },
    signup: async (_, { input }, { models, res }) => {
        input.email = input.email.trim().toLowerCase();
        const hashed = await bcrypt.hash(input.password, 10);
        try {
            const user = await models.User.create({
                username: input.username,
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                password: hashed
            });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });
            res.clearCookie("authToken");
            res.cookie("authToken", token, {
                maxAge: 14 * 60 * 60 * 1000 // 24 Stunden
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error("Fehler beim Erstellen des Benutzers!");
        }
    },
    logout: async (_, __, { user, res }) => {
        if (!user) {
            throw new AuthenticationError("Benutzer nicht gefunden!");
        }
        res.clearCookie("authToken");
        return true;
    },
    addEntry: async (_, { input }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("Benutzer nicht angemeldet!");
        }
        try {
            const entry = await models.Entry.create({
                title: input.title,
                content: input.content,
                user: user.id,
                tags: input.tags
            });
            return entry;
        } catch (err) {
            console.log(err);
            throw new Error("Fehler beim Erstellen des Blogeintrags!");
        }
    },
    deleteEntry: async (_, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("Benutzer nicht angemeldet!")
        }
        try {
            const entry = await models.Entry.findById(id);
            await models.Entry.deleteOne({ _id: id });
            return entry;
        } catch (err) {
            throw new Error("Fehler beim Löschvorgang einers Blogeintrags!");
        }
    },
    editEntry: async (_, { id, input }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("Benutzer nicht angemeldet!")
        }
        try {
            const model = await models.Entry.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        title: input.title,
                        content: input.content,
                        tags: input.tags
                    }
                },
                {
                    new: true
                }
            )
            console.log("model: ", model);
            return model;
        } catch (err) {
            throw new Error("Fehler beim Bearbeiten eines Blogeintrags!");
        }
    },
    addComment: async (_, { input }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("Benutzer nicht angemeldet!");
        }
        try {
            const comment = await models.Comment.create({
                content: input.content,
                user: user.id,
                entry: input.entryId
            });
            return comment;
        } catch (err) {
            throw new Error("Fehler beim Erstellen eines Kommentars!");
        }
    },
    deleteComment: async (_, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("Benutzer nicht angemeldet!");
        }
        try {
            const comment = await models.Comment.findById(id);
            await models.Comment.deleteOne({ _id: id });
            return comment;
        } catch (err) {
            throw new Error("Fehler beim Löschen eines Kommentars!");
        }
    }
}