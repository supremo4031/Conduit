import React from 'react';
import './Tag.scss';

export default function Tag(props) {

    let tags = props.tags;
    // console.log(props.id);

	return (
		<div className="tag rw">
			{props.name}
			<span
				className="cross"
                onClick={() => {
                    tags = tags.filter((t) => {
						return t.id !== props.id;
                    })
                    props.handleTags(tags);
                }}
				style={{
					fontSize: '17px',
					paddingLeft: '9px',
				}}>
				&times;
			</span>
		</div>
	);
}
