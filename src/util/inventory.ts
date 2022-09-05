
export function getUserItems(req) {
	return req.session.user?.currentGame?.backpack;
}

