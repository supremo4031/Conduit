import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import React, {useState} from 'react';
import axios from 'axios';
import validator from 'validator'
import './AuthModal.scss'

export default function AuthModal(props) {

	const textFieldStyle = {
		margin: '5px auto',
	};

	const btnStyle = {
		padding: 10,
		margin: '5px auto',
		backgroundColor: '#1976d2',
	};

	// Hooks part
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState({ firstName: '', lastName: '' });
	const [checked, setChecked] = useState(false);
	const [mismatch, setMismatch] = useState({ error: false, helperText: '' });
	const [emailError, setEmailError] = useState({
		error: false,
		helperText: '',
	});
    const [loginOrRegister, setLoginOrRegister] = useState(true)

	async function logIn() {
		const res = await axios.post(
			'http://localhost:4000/api/users/login',
			{
				email: email,
				password: password,
			},
			{
				withCredentials: true,
			}
		);

		if (res.status !== 200) {
		} else {
			// history.push('/home');
			props.handleModal();
		}

		console.log(res);
	}


	async function signUp() {
		const res = await axios.post(
			'http://localhost:4000/api/users',
			{
				firstName: name.firstName,
				lastName: name.lastName,
				username: username,
				email: email,
				password: password,
			},
			{
				withCredentials: true,
			}
		);

		console.log(res);
		return res;
	}

	const validateSignUp = async () => {
		if (!validator.isEmail(email)) {
			setEmailError({ error: true, helperText: 'Email is Invalid' });
		} else if (password !== confirmPassword) {
			setMismatch({ error: true, helperText: "Password doesn't match" });
		} else {
			const res = await signUp();

			if (res.status !== 201) {
			} else {
				// history.push('/home');
			}
		}
	};

	return (
		<div
			className="modal"
			style={{
				display: props.visibility ? 'block' : 'none',
			}}>
			<div className="modal-content">
				<div className="close-div">
					<span
						className="close"
						onClick={(e) => {
							e.preventDefault();
							props.handleModal();
						}}>
						&times;
					</span>
				</div>
				<div className="modal-header center">
					<div className="login-register-div">
						<input
							type="radio"
							name="tabs"
							id="tab1"
							checked={loginOrRegister}
							onChange={() => {

							}}
							onClick={() => {
								setLoginOrRegister(!loginOrRegister);
							}}
						/>
						<label className="tab-label" htmlFor="tab1">
							Sign In
						</label>
						<input
							type="radio"
							name="tabs"
							id="tab2"
							checked={!loginOrRegister}
							onChange={() => {}}
							onClick={() => {
								setLoginOrRegister(!loginOrRegister);
							}}
						/>
						<label className="tab-label" htmlFor="tab2">
							Sign Up
						</label>
						<section
							id="content1"
							style={{
								display: loginOrRegister ? 'block' : 'none',
							}}>
							<TextField
								variant="outlined"
								label="Email"
								placeholder="Enter email"
								size="medium"
								fullWidth
								required
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								style={{
									margin: '5px auto',
									marginTop: '10px',
								}}
							/>
							<TextField
								variant="outlined"
								label="Password"
								placeholder="Enter password"
								type="password"
								size="medium"
								fullWidth
								required
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								style={textFieldStyle}
							/>

							<FormControlLabel
								className="checkBox"
								style={{
									float: 'left',
								}}
								control={
									<Checkbox
										checked={checked}
										onChange={() => {
											setChecked(!checked);
										}}
										name="Remember Me"
										color="primary"
										style={{
											color: '#1976d2',
										}}
									/>
								}
								label="Remember Me"
							/>

							<Button
								variant="contained"
								fullWidth
								disableElevation
								onClick={() => {
									logIn();
								}}
								style={btnStyle}
								color="primary">
								Sign In
							</Button>
						</section>
						<section
							id="content2"
							style={{
								display: !loginOrRegister ? 'block' : 'none',
							}}>
							<Grid container spacing={1}>
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										label="First Name"
										placeholder="Enter first name"
										size="medium"
										fullWidth
										required
										value={name.firstName}
										onChange={(event) => {
											setName({
												...name,
												firstName: event.target.value,
											});
										}}
										style={{
											margin: '5px auto',
											marginTop: '10px',
										}}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										label="Last Name"
										placeholder="Enter last name"
										size="medium"
										fullWidth
										required
										value={name.lastName}
										onChange={(event) => {
											setName({
												...name,
												lastName: event.target.value,
											});
										}}
										style={{
											margin: '5px auto',
											marginTop: '10px',
										}}
									/>
								</Grid>
							</Grid>
							<TextField
								variant="outlined"
								label="Username"
								placeholder="Enter username"
								size="medium"
								fullWidth
								required
								value={username}
								onChange={(event) => {
									setUsername(event.target.value);
								}}
								style={textFieldStyle}
							/>
							<TextField
								variant="outlined"
								label="Email"
								placeholder="Enter email"
								type="email"
								size="medium"
								fullWidth
								required
								error={emailError.error}
								helperText={emailError.helperText}
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
									setEmailError({
										error: false,
										helperText: '',
									});
								}}
								style={textFieldStyle}
							/>
							<TextField
								variant="outlined"
								label="Password"
								placeholder="Enter password"
								type="password"
								size="medium"
								fullWidth
								required
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								style={textFieldStyle}
							/>
							<TextField
								variant="outlined"
								label="Confirm Password"
								placeholder="Confirm password"
								type="password"
								size="medium"
								fullWidth
								required
								error={mismatch.error}
								helperText={mismatch.helperText}
								value={confirmPassword}
								onChange={(event) => {
									setConfirmPassword(event.target.value);
									setMismatch({
										error: false,
										helperText: '',
									});
								}}
								style={textFieldStyle}
							/>

							<FormControlLabel
								style={{
									float: 'left',
								}}
								control={
									<Checkbox
										checked={checked}
										onChange={() => {
											setChecked(!checked);
										}}
										name="Remember Me"
										color="primary"
										style={{
											color: '#1976d2',
										}}
									/>
								}
								label="Remember Me"
							/>

							<Button
								variant="contained"
								fullWidth
								disableElevation
								onClick={() => {
									// logIn();
									validateSignUp();
								}}
								style={btnStyle}
								color="primary">
								Sign Up
							</Button>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
