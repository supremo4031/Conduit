import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Articles from './Articles';
import './HomePage.scss';
import { useHistory, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import AuthModal from './AuthModal';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function HomePage(props) {
	const history = useHistory();

	const [name, setName] = useState({ firstName: '', lastName: '' });
	const [username, setUsername] = useState('');
	const [articles, setArticles] = useState([]);
	const [modal, setModal] = useState(false);

	const query = useQuery();
	let page_no = query.get('page');
	console.log(page_no);
	if(!page_no)
		page_no = 1;

	useEffect(() => {
		async function getCurrentUser() {
			try {
				const res = await axios.get('http://localhost:4000/api/user', {
					withCredentials: true,
				});

				const user = res.data.user;
				if (res.status === 200) {
					setName({
						firstName: user.firstName,
						lastName: user.lastName,
					});
					setUsername(user.username);

					console.log(res);
				}
			} catch (e) {
				// history.push('/login');
				handleModal()
			}
		}

		getCurrentUser();
		async function getArticles() {
			const res = await axios.get(
				`http://localhost:4000/api/articles?page=${page_no}`,
				{
					withCredentials: true,
				}
			);

			if (res.status === 200) {
				setArticles(res.data.article);
			}
		}
		getArticles();
	}, [page_no, history]);

	const handleModal = () => {
		setModal(!modal);
	};

	return (
		<>
			<NavBar
				username={username}
				name={name.firstName}
				handleModal={handleModal}
			/>
			<AuthModal visibility={modal} handleModal={handleModal} />
			<div className="row homepage">
				<div className="col-10p"></div>
				<div className="col-50p">
					{articles.map((article) => {

						// console.log(article);

						let dateValue = new Date(article.createdAt)
							.toString()
							.split(' ');
						const date = dateValue[1] + ' ' + dateValue[2];

						return (
							<Articles
								key={article.slug.toString()}
								author={article.author.name}
								title={article.title}
								description={article.description}
								date={date}
								slug={article.slug}
								duration={
									Math.round(Math.random(10) * 10) +
									' min read'
								}
							/>
						);
					})}
				</div>
				<div className="col-30p"></div>
				<div className="col-10p"></div>
			</div>
		</>
	);
}
