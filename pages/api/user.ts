// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { name, assetsImageId } = req.body;
	const graphqlClient = new GraphQLClient(graphqlAPI, {
		headers: {
			authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
		},
	});

	const mutation = gql`
		mutation CreateAuthor($name: String!, $imageId: ID!) {
			createAuthor(
				data: { name: $name, photo: { connect: { id: $imageId } } }
			) {
				name
				id
				photo {
					url
				}
			}
		}
	`;

	try {
		const result = await graphqlClient.request(mutation, {
			name: name,
			imageId: assetsImageId,
		});

		return res.status(200).send(result);
	} catch (e: any) {
		console.log(e);
	}
}
