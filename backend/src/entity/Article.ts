import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Tag } from './Tag';
import { User } from './User';

@Entity('articles')
export class Article {
	@PrimaryColumn({
		length: 120,
	})
	slug: string;

	@Column({
		length: 70,
	})
	title: string;

	@Column({
		length: 200,
		nullable: true,
	})
	description?: string;

	@Column('text',{
		array: true
	})
	body: string[];

	@ManyToMany(() => Tag, (tags) => tags.articles, {
		onUpdate: 'CASCADE',
		cascade: ['insert'],
	})
	@JoinTable()
	tagList: Tag[];

	@Column({
		default: 0,
	})
	favoritesCount: number;

	@ManyToOne(() => User, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	@JoinTable()
	author: User;

	@ManyToMany(() => User, user => user.favoritedArticles, {
		onUpdate: 'CASCADE'
	})
	@JoinTable()
	favorited: User[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	constructor(
		slug: string,
		title: string,
		description: string,
		body: string[],
		tagList: Tag[],
		favorited: User[],
		author: User
	) {
		this.slug = slug;
		this.title = title;
		this.description = description;
		this.body = body;
		this.tagList = tagList;
		this.favorited = favorited;
		this.author = author;
	}
}
