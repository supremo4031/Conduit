import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './ArticlePage.scss';

export default function ArticlePage(props) {
	const history = useHistory();

	const slug = props.match.params.slug;

	const [article, setArticle] = useState({
		description: '',
		title: '',
		body: '',
	});

	useEffect(() => {
		async function getArticle() {
			try {
				const res = await axios.get(
					`http://localhost:4000/api/articles/${slug}`, {
						withCredentials: true,
					}
				);
				if (res.status === 200) {
					setArticle(res.data.article);
					console.log(res.data);
				}
			} catch (e) {
				history.push('/error');
			}
		}

		getArticle();
	}, [slug, history]);

	return (
		<div className="row">
			<div className="col-3"></div>
			<div className="col-6 articledetails">
				<h1>{article.title}</h1>
				<p>{article.body}</p>
			</div>
			<div className="col-3"></div>
		</div>
	);
}
