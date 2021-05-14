
import React from 'react'
import ReactMarkDown  from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Prism from 'prismjs'
import CodeEditor from './CodeEditor';
import { useState } from 'react';

const gfm = require('remark-gfm');


export default function ExperimentPage() {
	// prism, vs, duotoneLight, base16AteliersulphurpoolLight

	// const components = {
	// 	code({ node, inline, className, children, ...props }) {
	// 		const match = /language-(\w+)/.exec(className || '');
	// 		return !inline && match ? (
	// 			<SyntaxHighlighter
	// 				style={atomDark}
	// 				language={match[1]}
	// 				PreTag="div"
	// 				children={String(children).replace(/\n$/, '')}
	// 				{...props}
	// 			/>
	// 		) : (
	// 			<code className={className} {...props} />
	// 		);
	// 	},
	// };

	// const markdown = `A paragraph with *emphasis* and **strong importance**.`

	const [editorLanguage, setEditorLanguage] = useState('javascript');

	const child1 = `	route.post('/', auth, async (req, res) => {
		try {
						const article = await createArticle(req.body.article,(req as any).user.email;
				if (!article)
					res.status(422).json({
					errors: {
						body: ['Article cannot be created', 'Something went wrong'],
					},
				});
			return res.status(201).json({ article });} catch (e) {
			return res.status(422).json({
				errors: {
					body: ['Article cannot be created', e.message],
				},
			});
		}
	});`;

	const child2 = `int a, b, sum = 0;
	cin >> a >> b;
	for(int i = a; i <= b; i++)
		sum += i;
	cout << sum << endl;`;

	return (
		<div className="row">
			<div className="col-20p"></div>
			<div className="col-60p">
				<div
					contentEditable="true"
					style={{
						fontFamily: 'Cormorant Garamond',
						fontSize: '21px',
						marginTop: '200px',
						border: 'none',
						outline: 'none',
						background: 'transparent'
					}}>
					{/* <ReactMarkDown
				remarkPlugins={[gfm]}
				children={markdown}></ReactMarkDown> */
					/* <p>This is written in consolas</p>

			<pre>
				<SyntaxHighlighter
					language="js"
					style={prism}
					customStyle={{ fontFamily: 'Consolas', fontWeight: '100' }}
					PreTag="div"
					children={child1}
				/>
			</pre>
			<pre>
				<SyntaxHighlighter
					language="cpp"
					PreTag="div"
					children={child2}
				/>
			</pre> */}
					<p>here</p>
					<p>here</p>
					<p>here</p>
					<p>here</p>
				</div>
			</div>
			<div className="col-20p"></div>
		</div>
	);
}
