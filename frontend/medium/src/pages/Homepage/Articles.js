import React from 'react';
import article from '../../article.jpg';
import './HomePage.scss';
import { useHistory } from 'react-router-dom';

export default function Articles(props) {

	const history = useHistory();

	return (
		<div
			className="row article"
			onClick={() => {
				history.push(`/article/${props.slug}`);
			}}>
			<div className="col-9">
				<div>
					<img
						src={article}
						alt="conduit"
						height="20px"
						width="20px"
					/>
					<h6 className="articleauthor rb">{props.author}</h6>
				</div>
				<h3 className="articletitle">{props.title}</h3>
				<p className="articledesc">{props.description}</p>
				<br></br>
				<div className="articledate">
					<span display="inline">{props.date} </span>
					<span display="inline"> &middot; </span>
					<span display="inline" float="right">
						{props.duration}
					</span>
					<span display="inline"> &middot; </span>
					<span display="inline" float="right">
						Based on your reading history
					</span>
				</div>
			</div>
			<div className="col-3">
				<img
					src={article}
					alt="article"
					style={{
						float: 'right',
						width: '200px',
    					aspectRatio: 'auto 200 / 134',
    					height: '134px'
					}}></img>
			</div>
		</div>
	);
}
