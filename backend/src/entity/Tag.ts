import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './Article';

@Entity('tags')
export class Tag {
	@PrimaryGeneratedColumn({
		type: 'bigint',
	})
	id: number;

	@Column({
		unique: true,
	})
	tagName: string;

	@ManyToMany(() => Article, (articles) => articles.tagList, {
		onUpdate: 'CASCADE',
		cascade: ['insert'],
	})
	articles: Article[];

	constructor(tagName: string) {
		this.tagName = tagName;
	}
}
