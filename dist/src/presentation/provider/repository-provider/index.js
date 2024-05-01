"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepositoryProvider = exports.LikeRepositoryProvider = exports.FollowRepositoryProvider = exports.PostRepositoryProvider = exports.ImageRepositoryProvider = exports.TransactionManagerProvider = exports.AuthenticateRepositoryProvider = exports.UserRepositoryProvider = void 0;
const authenticate_1 = require("@domain/repository/authenticate");
const user_1 = require("@domain/repository/user");
const post_1 = require("@domain/repository/post");
const image_1 = require("@domain/repository/image");
const like_1 = require("@domain/repository/like");
const comment_1 = require("@domain/repository/comment");
const transaction_1 = require("@domain/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
const post_2 = require("@infrastructure/repository/post");
const transaction_2 = require("@infrastructure/repository/transaction");
const image_2 = require("@infrastructure/repository/image");
const authenticate_2 = require("@infrastructure/repository/authenticate");
const follow_1 = require("@domain/repository/follow");
const follow_2 = require("@infrastructure/repository/follow");
const like_2 = require("@infrastructure/repository/like");
const comment_2 = require("@infrastructure/repository/comment");
exports.UserRepositoryProvider = {
    provide: user_1.IUserRepository,
    useClass: user_2.UserRepository,
};
exports.AuthenticateRepositoryProvider = {
    provide: authenticate_1.IAuthenticateRepository,
    useClass: authenticate_2.AuthenticateRepository,
};
exports.TransactionManagerProvider = {
    provide: transaction_1.default,
    useClass: transaction_2.default,
};
exports.ImageRepositoryProvider = {
    provide: image_1.IImageRepository,
    useClass: image_2.default,
};
exports.PostRepositoryProvider = {
    provide: post_1.IPostRepository,
    useClass: post_2.PostRepository,
};
exports.FollowRepositoryProvider = {
    provide: follow_1.IFollowRepository,
    useClass: follow_2.FollowRepository,
};
exports.LikeRepositoryProvider = {
    provide: like_1.ILikeRepository,
    useClass: like_2.LikeRepository,
};
exports.CommentRepositoryProvider = {
    provide: comment_1.ICommentRepository,
    useClass: comment_2.CommentRepository,
};
//# sourceMappingURL=index.js.map