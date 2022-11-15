import jwtDecode from 'jwt-decode';
import { getAuthor } from '../services';

export const createOrGetUser = async (response: any, addUser: any) => {
	const decoded: { name: string; picture: string } = jwtDecode(
		response.credential
	);
	const { name, picture } = decoded;

	// add token into local storage for user authorization
	localStorage.setItem('token', response.credential);

	// remove the token after 3 days
	setTimeout(() => {
		localStorage.removeItem('token');
	}, 3 * 24 * 60 * 60 * 1000);

	// if author existed, get existedAuthor
	const existedUser = await getAuthor(name);
	if (existedUser) {
		addUser(existedUser);
		return;
	}

	// upload the image in assets
	const imageUploadResponse = await fetch(
		`${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}/upload`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `url=${encodeURIComponent(picture)}`,
		}
	);
	const imageUploadData = await imageUploadResponse.json();
	const assetsImageId = imageUploadData.id;

	// add user
	const uploadUserResponse = await fetch('/api/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			assetsImageId,
		}),
	});

	const uploadUserData = await uploadUserResponse.json();
	addUser(uploadUserData.createAuthor);
};

export const TOAST_STYLE: any = {
	position: 'top-center',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'light',
};
