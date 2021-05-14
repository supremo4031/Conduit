import React from 'react'

export default function ErrorPage(props) {

	console.log(props);

	const error = props.location.state.error;

    return (
		<div style={{
			display: 'block',
			height: '100vh',
			width: '100%',
			justifyContent: 'center'
		}}>
			<h2>Oops! Something went wrong!!</h2>
			<h2>{error ? error : null}</h2>
		</div>
	);
}
