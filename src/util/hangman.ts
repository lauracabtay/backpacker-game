
export function includesAll(word: string, array: string[]) : boolean {
	for (const letter of word.split('')) {
		if (!array.includes(letter))
			return false;
	}
	return true;
}

