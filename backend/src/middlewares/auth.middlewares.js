//GLOBALS

import jwt from "jsonwebtoken";
import User from "../modules/users/user.schema.js";
import { JWT_KEY } from "../config/variable.js";


//just token verification
export const AuthGuard = async (request, response, next) => {
	try {
		// Reading token from headers
		// For Bearer token
		let token = request.headers.authorization.split(" ")[1];
		// Decoding token
		let decoded = jwt.verify(token, JWT_KEY);
		
		// Check if user has an account
		let user = await User.findById(decoded.id);
		if (!user) return response.status(401).send("Unauthorized");
		request.user = user;
		next();
	} catch (error) {
		return response.status(401).send("Unauthorized");
	}
};

export const RoleGuard = (role) => {
	return async (request, response, next) => {
		try {
			let user = request.user;
			if (user.role != role) return response.status(403).send("Wrong role");
			next();
		} catch (error) {
			return response.status(500).send("Server Error");
		}
	};
};
