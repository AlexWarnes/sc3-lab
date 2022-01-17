import { v4 as uuidv4 } from 'uuid';

// Generate a unique id
export const uuid = () => uuidv4();

export const zTimestamp = (): string => {
	const created = new Date();
	let minutes = created.getMinutes();
	return `${created.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const deepCopy = (thing: any) => JSON.parse(JSON.stringify(thing));

export const sameVector3 = (vectorA, vectorB): boolean => {
	if (!vectorA || !vectorB) {
		return vectorA === vectorB;
	}

  for (let idx = 0; idx < 3; idx++){
    if (vectorA[idx] !== vectorB[idx]) {
			return false;
		}
  }

	return true;
};
