class Permit {
	constructor(user_id, class_id, description, img_url, isApproved) {
		this.user_id = user_id;
		this.class_id = class_id;
		this.description = description;
		this.img_url = img_url;
		this.isApproved = isApproved;
	}

	toJSON() {
		return {
			user_id: this.user_id,
			class_id: this.class_id,
			description: this.description,
			img_url: this.img_url,
			isApproved: this.isApproved,
		};
	}
}

export default Permit;