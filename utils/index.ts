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

	// add user
	const uploadUserResponse = await fetch('/api/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			picture,
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
