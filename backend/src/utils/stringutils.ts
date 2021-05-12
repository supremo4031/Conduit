


export function slugify(title: string): string {


    let slugarr = [];

    for(let i = 0; i < title.length; i++) {
        if(i >= 30) break;

        let char = title[i].toLowerCase();
        if(char >= 'a' && char <= 'z') slugarr.push(char);
        else slugarr.push('-');
    }

    return slugarr.join('');
}


export function lowercase(title: string): string {

    let lower = []

    for (let i = 0; i < title.length; i++) {
		if (i >= 30) break;

		let char = title[i];
		if (char >= 'A' && char <= 'Z') lower.push(char.toLowerCase());
	}

    return lower.join('');
}


