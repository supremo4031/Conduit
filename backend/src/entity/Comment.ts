import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";


@Entity('comments')
export class Comment {
	@PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true
    })
	id: number;

	@Column()
	body: string;

	@ManyToOne(() => Article, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	article: Article;

	@ManyToOne(() => User, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	author: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	constructor(body: string, article: Article, author: User) {
		this.body = body;
		this.article = article;
		this.author = author;
	}
}