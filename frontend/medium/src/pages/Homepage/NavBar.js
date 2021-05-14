import React, { useState } from 'react';
import './NavBar.scss';
import conduit from './conduit.png';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';

export default function NavBar(props) {

	const history = useHistory();

	const [searchOption, setSearchOption] = useState('none');

    const authenticated = props.name !== '';

	return (
		<div className="row sticky">
			<div className="col-10p"></div>
			<div className="col-80p">
				<nav>
					<div className="spacing"></div>
					<ul className="topnav">
						<li>
							<a href="/">
								<img
									src={conduit}
									alt="conduit-logo"
									className="conduit-logo"
								/>
							</a>
						</li>
						<li>
							<a href="/" className="conduit-text">
								<h1>Conduit</h1>
							</a>
						</li>
						<li
							className="topnav-right"
							style={{
								display: authenticated ? 'none': 'block',
							}}>
							<a
								href="/"
								onClick={(e) => {
									e.preventDefault();
									props.openModal();
								}}>
								Sign in
							</a>
						</li>
						<li
							className="topnav-right"
							style={{
								display: !authenticated ? 'none': 'block',
							}}>
							<a
								href="/"
								onClick={(e) => {
									e.preventDefault();
								}}>
								{props.username}
							</a>
						</li>
						<li className="topnav-right">
							<a href="/" onClick={(e) => {
                                e.preventDefault();
                                if(authenticated) {
									history.push('/post')
                                } else {
                                    props.openModal();
                                }
                            }}>Post</a>
						</li>
						<li
							className={`topnav-right searchbar ${
								searchOption === 'block' ? 'slide-search' : ''
							}`}
							style={{
								display: searchOption,
							}}>
							<a href="/" onClick={(e) => {
                                e.preventDefault()
                            }}>
								<input
									type="text"
									name=""
									id=""
									placeholder="Search Conduit"
								/>
							</a>
						</li>
						<li className="topnav-right">
							<a
								href="/"
								onClick={(e) => {
									e.preventDefault();
									if (searchOption === 'none') {
										setSearchOption('block');
									} else {
										setSearchOption('none');
									}
								}}>
								<SearchIcon
									style={{
										color: 'grey',
									}}></SearchIcon>
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<div className="col-10p"></div>
		</div>
	);
}
