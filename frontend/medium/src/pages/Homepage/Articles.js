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
			<div className="col-8 article-left">
				<div>
					<img
						src={article}
						alt="conduit"
						height="20px"
						width="20px"
						style={{
							verticalAlign: 'middle',
						}}
					/>
					<span className="articleauthor rb">{props.author}</span>
				</div>
				<h3 className="articletitle">{props.title}</h3>
				<p className="articledesc">{props.description}</p>
				<div className="articledate">
					<span display="inline">{props.date} </span>
					<span display="inline"> &middot; </span>
					<span display="inline">{props.duration}</span>
					<span display="inline"> &middot; </span>
					<span display="inline">Based on your reading history</span>
					<span
						display="inline"
						style={{
							fontSize: '15px',
						}}>
						{' '}
						&#9733;
					</span>
					<div
						style={{
							float: 'right',
						}}>
						<svg width="25" height="25">
							<path
								d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z"
								fillRule="evenodd"></path>
						</svg>
					</div>
					<div
						style={{
							float: 'right',
						}}>
						<svg width="25" height="25" viewBox="0 0 25 25">
							<path
								d="M19 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14.66h.01c.01.1.05.2.12.28a.5.5 0 0 0 .7.03l5.67-4.12 5.66 4.13a.5.5 0 0 0 .71-.03.5.5 0 0 0 .12-.29H19V6zm-6.84 9.97L7 19.64V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v13.64l-5.16-3.67a.49.49 0 0 0-.68 0z"
								fillRule="evenodd"></path>
						</svg>
					</div>
				</div>
			</div>
			<div className="col-4">
				<img
					src={article}
					alt="article"
					className="articleimage"
					style={{
						float: 'right',
					}}></img>
			</div>
		</div>
	);
}
