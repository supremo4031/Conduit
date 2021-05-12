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
exports.Tag = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("./Article");
let Tag = class Tag {
    constructor(tagName) {
        this.tagName = tagName;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: 'bigint',
    }),
    __metadata("design:type", Number)
], Tag.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        unique: true,
    }),
    __metadata("design:type", String)
], Tag.prototype, "tagName", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Article_1.Article, (articles) => articles.tagList, {
        onUpdate: 'CASCADE',
        cascade: ['insert'],
    }),
    __metadata("design:type", Array)
], Tag.prototype, "articles", void 0);
Tag = __decorate([
    typeorm_1.Entity('tags'),
    __metadata("design:paramtypes", [String])
], Tag);
exports.Tag = Tag;
