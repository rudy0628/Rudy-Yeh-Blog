import { GraphQLClient, gql } from 'graphql-request';
import { getPostLikes } from '../../../services';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const graphqlClient = new GraphQLClient(graphqlAPI, {
		headers: {
			authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
		},
	});

	const { slug } = req.query;
	const { id } = req.body;
	const existedLikes = await getPostLikes(slug);
	const userLiked = existedLikes.find((like: any) => like.author.id === id);

	if (!userLiked) {
		// if user not liked
		const mutation = gql`
			mutation UpdatePost($id: ID!, $slug: String!) {
				updatePost(
					data: {
						likes: {
							create: { Like: { data: { author: { connect: { id: $id } } } } }
						}
					}
					where: { slug: $slug }
				) {
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

		try {
			const result = await graphqlClient.request(mutation, {
				id,
				slug,
			});
			return res.status(200).send(result.updatePost.likes);
		} catch (e: any) {
			console.log(e);
		}
	} else {
		// if user liked
		const mutation = gql`
			mutation UpdatePost($id: ID!, $slug: String!) {
				updatePost(
					data: { likes: { delete: { Like: { id: $id } } } }
					where: { slug: $slug }
				) {
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

		try {
			const result = await graphqlClient.request(mutation, {
				id: userLiked.id,
				slug,
			});
			return res.status(200).send(result.updatePost.likes);
		} catch (e: any) {
			console.log(e);
		}
	}
}
