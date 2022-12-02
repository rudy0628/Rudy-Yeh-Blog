import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getPosts = async () => {
	const query = gql`
		query GetPosts {
			postsConnection {
				edges {
					node {
						createdAt
						slug
						title
						excerpt
						image
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.postsConnection.edges;
};

export const getRelatedPosts = async (categories: string[], slug: string) => {
	const query = gql`
		query GetRelatedPosts($slug: String!, $categories: [String!]) {
			posts(
				where: {
					slug_not: $slug
					AND: { categories_some: { slug_in: $categories } }
				}
				last: 5
			) {
				title
				excerpt
				image
				createdAt
				slug
			}
		}
	`;

	const result = await request(graphqlAPI, query, { categories, slug });

	return result.posts;
};

export const getPostDetails = async (slug: string) => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				author {
					bio
					name
					id
					photo
				}
				createdAt
				slug
				title
				excerpt
				image
				categories {
					name
					slug
				}
				content
				prevPost {
					post {
						slug
						title
					}
				}
				nextPost {
					post {
						slug
						title
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.post;
};

export const getCategories = async () => {
	const query = gql`
		query getCategories {
			categories(first: 999999) {
				name
				slug
				id
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.categories;
};

export const getAuthor = async (name: string) => {
	const query = gql`
		query GetAuthor($name: String!) {
			author(where: { name: $name }) {
				id
				name
				photo
			}
		}
	`;

	const result = await request(graphqlAPI, query, { name });

	return result.author;
};

export const getPostLikes = async (slug: string | string[] | undefined) => {
	const query = gql`
		query GetPostLikes($slug: String!) {
			likes(where: { post: { slug: $slug } }) {
				id
				author {
					id
					name
					photo
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.likes;
};

export const getPostComments = async (slug: string | string[] | undefined) => {
	const query = gql`
		query GetPostComments($slug: String!) {
			comments(
				where: { post: { slug: $slug } }
				orderBy: createdAt_ASC
				last: 99999999
			) {
				author {
					id
					name
					photo
				}
				id
				comment
				createdAt
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.comments;
};
