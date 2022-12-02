import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { Loader } from 'react-feather';
import { createOrGetUser } from '../../utils';
import useAuthStore from '../../store/authStore';

const UserBtn = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { addUser, userProfile, removeUser }: any = useAuthStore();

	const loginSuccessHandler = async (response: any) => {
		setIsLoading(true);
		await createOrGetUser(response, addUser);
		setIsLoading(false);
	};

	const logoutHandler = () => {
		removeUser();
		window.localStorage.removeItem('token');
		googleLogout();
	};

	return (
		<div className="fixed bottom-5 right-5 z-40 bg-opacity-0 rounded-full">
			{!userProfile && !isLoading && (
				<GoogleLogin
					onSuccess={loginSuccessHandler}
					onError={() => {
						console.log('Login Failed');
					}}
					shape="circle"
				/>
			)}
			{!userProfile && isLoading && (
				<Loader className="animate-spin" color="#90caf9" />
			)}
			{userProfile && !isLoading && (
				<button
					className="flex flex-row items-center gap-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition duration-500 group overflow-hidden h-9"
					onClick={logoutHandler}
				>
					<img
						src={userProfile.photo}
						alt={userProfile.name}
						className="h-6 w-6 rounded-full"
					/>
					<div>
						{/* log out text */}
						<p className="text-sm text-gray-700 -translate-y-7 group-hover:translate-y-[0.625rem] transition duration-500">
							登出
						</p>
						{/* username text */}
						<p className="text-sm text-gray-700 -translate-y-[0.625rem] group-hover:translate-y-7 transition duration-500">
							{userProfile.name}
						</p>
					</div>
				</button>
			)}
		</div>
	);
};

export default UserBtn;
