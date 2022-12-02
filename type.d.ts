export interface IPost {
	node: {
		categories: {
			name: string;
			slug: string;
		}[];
		createdAt: string;
		excerpt: string;
		image: {
			url: string;
		};
		slug: string;
		title: string;
	};
}

export interface IPostDetail {
	author: {
		bio: string;
		id: string;
		name: string;
		photo: string;
	};
	categories: {
		name: string;
		slug: string;
	}[];
	content: string;
	createdAt: string;
	excerpt: string;
	image: {
		url: string;
	};
	slug: string;
	title: string;
	prevPost: {
		post: {
			slug: string;
			title: string;
		};
	};
	nextPost: {
		post: {
			slug: string;
			title: string;
		};
	};
}

interface IComment {
	author: {
		id: string;
		name: string;
		photo: string;
	};
	id: string;
	comment: string;
	createdAt: string;
}

interface IRelatedPost {
	title: string;
	excerpt: string;
	image: {
		url: string;
	};
	createdAt: string;
	slug: string;
}

interface ICategory {
	id: string;
	name: string;
	slug: string;
}
