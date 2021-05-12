import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Article } from './Article';

@Entity('users')
export class User {
	@PrimaryColumn()
	email: string;

	@Column({
		unique: true,
	})
	username: string;

	@Column()
	password?: string;

	@Column()
	name: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({
		nullable: true,
	})
	bio?: string;

	@Column({
		nullable: true,
	})
	image?: string;

	@ManyToMany(() => User, (user) => user.followings)
	@JoinTable()
	followers: User[];

	@ManyToMany(() => User, (user) => user.followers)
	followings: User[];

	@ManyToMany(() => Article, (article) => article.favorited, {
		onUpdate: 'CASCADE',
	})
	favoritedArticles: Article[];

	@OneToMany(() => Article, (article) => article.author, {
		onUpdate: 'CASCADE',
	})
	articles: Article[];

	@Column({
		default: 0,
	})
	followersCount: number;

	@Column({
		default: 0,
	})
	followingsCount: number;

	token?: string;

	constructor(
		username: string,
		email: string,
		firstName: string,
		lastName: string,
		password: string,
		followers: User[],
		followings: User[]
	) {
		this.email = email;
		this.password = password;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.name = firstName + ' ' + lastName;
		this.followers = followers;
		this.followings = followings;
	}
}