const crypto = require("crypto");

const md5 = (text: string) => {
	return crypto.createHash("md5").update(text).digest("hex");
};

export default md5;

