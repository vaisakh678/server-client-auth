const crypto = require("crypto");

const sha256 = (text: string) => {
	return crypto.createHash("sha256").update(text).digest("hex");
};

export default sha256;

