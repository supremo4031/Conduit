import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AuthModal from '../AuthPage/AuthModal';
import './PostPage.scss';
import Tag from './Tag';

export default function PostPage() {
	const history = useHistory();

	const [title, setTitle] = useState('');
	const [tags, setTags] = useState([]);
	const [tagList, setTagList] = useState([]);
	const [tag, setTag] = useState('');
	const [body, setbody] = useState([]);
	const [bodyId, setBodyId] = useState(1);
	const [bodyTextArea, setBodyTextArea] = useState([{ id: 0, body: '' }]);
	const [id, setId] = useState(0);
	const [error, setError] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
	const [modal, setModal] = useState(false);
	const [nextFocus, setNextFocus] = useState(0);
	const [prevFocus, setPrevFocus] = useState(-1);

	const closeModal = () => setModal(false);
	const openModal = () => setModal(true);

	const handleTags = (newTags) => {
		setTags(newTags);
		const temp = [];
		newTags.forEach((t) => {
			temp.push(t.tag);
		});
		setTagList(temp);
	};

	let titleTextarea;

	const changeTitleTextArea = () => {
		titleTextarea.style.height = 'auto';
		titleTextarea.style.height = titleTextarea.scrollHeight + 'px';
	};

	async function createArticle() {
		try {

			bodyTextArea.forEach((b) => {
				body.push(b.body);
			})

			const desc = body[0].substring(0, 190);

		    const res = await axios.post(
				'http://localhost:4000/api/articles',
				{
					article: {
						title: title,
						body: body,
						description: desc,
						tagList: [],
					},
				},
				{
					withCredentials: true,
				}
			);
			if (res.status === 201) {
				history.replace('/');
			} else if (res.status === 401) {
		        openModal()
			}
		} catch (e) {
		    setError(4);
		    setErrorMessage(e.toString());
		    const err = e.toString();
		    const p = err.split(' ');
		    p.map((er) => {
		        if(er === '401')
		            openModal();
		        return er
		    })
		}
	}

	const validateArticle = () => {
		if(title === '') {
		    setError(1);
		    setErrorMessage('* Title cannot be empty');
		} else if(body[0] === '') {
		    setError(2);
		    setErrorMessage('* body cannot be empty');
		} else if(tagList.length === 0) {
		    setError(3);
		    setErrorMessage('* Minimum one tag needed');
		} else {
		    createArticle();
		}
	};

	const changeFocus = (value) => {
		if (bodyTextArea[value].descTextarea) {
			bodyTextArea[value].descTextarea.focus();
		}
	};

	return (
		<div
			style={{
				backgroundColor: '#eee',
			}}>
			<div
				style={{
					height: '70px',
					backgroundColor: '#198def',
				}}></div>
			<div
				className="row"
				style={{
					minHeight: '100vh',
					backgroundColor: '#eee',
				}}>
				<div
					className="col-20p"
					style={{
						paddingTop: '30px',
					}}>
					<div className="title-text-div">Title</div>
				</div>
				<div>
					{modal ? (
						<AuthModal closeModal={closeModal}></AuthModal>
					) : null}
				</div>
				<div className="col-60p post-edit">
					<div className="post-title-div">
						<textarea
							name="title"
							rows="1"
							cols="30"
							autoFocus={nextFocus === 0}
							type="text"
							maxLength="70"
							value={title}
							ref={(ref) => (titleTextarea = ref)}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
								}
							}}
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									changeFocus(0);
								}
							}}
							onChange={(e) => {
								e.preventDefault();
								changeTitleTextArea();
								setTitle(e.target.value);
								if (error === 1 || error >= 4) setError(0);
							}}
							className="cg post-title"
							placeholder="Title"
						/>
					</div>
					<div>
						{bodyTextArea.map((b) => {
							console.log('<-- rendered -->');
							return (
								<div className="post-desc-div">
									<textarea
										key={b.id}
										name="body"
										rows="1"
										cols="55"
										value={b.body}
										ref={(ref) => (b.descTextarea = ref)}
										onKeyPress={(e) => {
											if (
												e.key === 'Enter' ||
												e.key === 'ArrowUp' ||
												e.key === 'ArrowDown'
											) {
												e.preventDefault();
											}
										}}
										onFocus={(e) => {
											setNextFocus(b.id + 1);
											setPrevFocus(b.id - 1);
										}}
										onKeyUp={(e) => {
											if (e.key === 'Enter') {
												e.preventDefault();
												changeFocus(nextFocus);
											} else if (e.key === 'ArrowUp') {
												e.preventDefault();
												if (b.id !== 0) {
													changeFocus(prevFocus);
												}
											} else if (e.key === 'ArrowDown') {
												e.preventDefault();
												if (
													bodyTextArea.length >
													nextFocus + 1
												) {
													changeFocus(nextFocus);
												}
											}
										}}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												e.preventDefault();
												if (
													b.id ===
													bodyTextArea.length - 1
												) {
													setBodyId(bodyId + 1);
													setBodyTextArea([
														...bodyTextArea,
														{
															id: bodyId,
															body: '',
														},
													]);
												}
											} else if (e.key === 'Backspace') {
												if (
													b.body.length === 0 &&
													b.id > 0
												) {
													e.preventDefault();
													let tempArea = [
														...bodyTextArea,
													];
													tempArea = tempArea.filter(
														(d) => {
															return (
																d.id !== b.id
															);
														}
													);
													setBodyTextArea(tempArea);
													changeFocus(prevFocus);
												}
											} else if (
												e.key === 'ArrowUp' ||
												e.key === 'ArrowDown'
											) {
												e.preventDefault();
											}
										}}
										onChange={(e) => {
											e.preventDefault();
											b.descTextarea.style.height =
												'auto';
											b.descTextarea.style.height =
												b.descTextarea.scrollHeight +
												'px';
											let tempArea = [...bodyTextArea];
											tempArea[b.id] = {
												id: b.id,
												body: e.target.value,
												descTextarea: b.descTextarea,
											};
											setBodyTextArea(tempArea);
											if (error === 2 || error >= 4)
												setError(0);
										}}
										className="nsk post-desc"
										placeholder="Tell your story..."
									/>
								</div>
							);
						})}
					</div>
					<div
						className="post-page-tags"
						style={{
							marginTop: '50px',
							borderTop: '1px solid #aaa',
						}}>
						<div className="tag-tags">
							{tags.map((item) => {
								return (
									<Tag
										key={item.id.toString()}
										id={item.id}
										name={item.tag}
										handleTags={handleTags}
										tags={tags}></Tag>
								);
							})}
						</div>
						<div className="tag-input">
							<input
								type="text"
								placeholder="Add tag"
								onKeyUp={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										if (tag !== '') {
											setId(id + 1);
											setTags([
												...tags,
												{ tag: tag, id: id },
											]);
											setTagList([...tagList, tag]);
											setTag('');
										}
									}
								}}
								onChange={(e) => {
									e.preventDefault();
									setTag(e.target.value);
									if (error === 3 || error >= 4) setError(0);
								}}
								value={tag}></input>
						</div>
						<div
							style={{
								display: 'inline-block',
							}}>
							<button
								className="post-add-button"
								onClick={() => {
									validateArticle();
								}}>
								POST
							</button>
						</div>
						<div
							className="error-div"
							style={{
								display: error !== 0 ? 'inline-block' : 'none',
							}}>
							<b>{errorMessage}</b>
						</div>
					</div>
				</div>
				<div className="col-20p"></div>
			</div>
		</div>
	);
}
