"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("./Article");
const User_1 = require("./User");
let Comment = class Comment {
    constructor(body, article, author) {
        this.body = body;
        this.article = article;
        this.author = author;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true
    }),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Article_1.Article, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Article_1.Article)
], Comment.prototype, "article", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", User_1.User)
], Comment.prototype, "author", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
Comment = __decorate([
    typeorm_1.Entity('comments'),
    __metadata("design:paramtypes", [String, Article_1.Article, User_1.User])
], Comment);
exports.Comment = Comment;
