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
		body: [''],
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
					console.log(res.data.article);
					setArticle(res.data.article);
					console.log(res.data);
				}
			} catch (e) {
				console.log(e);
				history.push('/error', {
					error: e
				});
			}
		}

		getArticle();
	}, [slug, history]);

	return (
		<div className="row">
			<div className="col-3"></div>
			<div className="col-6 articledetails">
				<h1>{article.title}</h1>
				<div>
					{
						article.body.map((body) => {
							return (
								<div className="article-body-div">
									<p>{body}</p>
								</div>
							);
						})
						// article.body
					}
				</div>
				<div style={{
					marginBottom: '100px'
				}}></div>
			</div>
			<div className="col-3"></div>
		</div>
	);
}
