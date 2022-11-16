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
						image {
							url
						}
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
				image {
					url
				}
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
					photo {
						url
					}
				}
				createdAt
				slug
				title
				excerpt
				image {
					url
				}
				categories {
					name
					slug
				}
				content
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.post;
};

export const getAuthor = async (name: string) => {
	const query = gql`
		query GetAuthor($name: String!) {
			author(where: { name: $name }) {
				id
				name
				photo {
					url
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query, { name });

	return result.author;
};

export const getPostLikes = async (slug: string | string[] | undefined) => {
	const query = gql`
		query GetPostLikes($slug: String!) {
			post(where: { slug: $slug }) {
				likes {
					... on Like {
						id
						author {
							id
							name
							photo {
								url
							}
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.post.likes;
};

export const getPostComments = async (slug: string | string[] | undefined) => {
	const query = gql`
		query GetPostComments($slug: String!) {
			comments(
				where: { post: { slug: $slug } }
				first: 9999999
				orderBy: createdAt_ASC
			) {
				author {
					id
					name
					photo {
						url
					}
				}
				comment
				createdAt
				id
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.comments;
};
