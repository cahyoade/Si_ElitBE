class Attendance {
	constructor(user_id, class_id, attend_at, status, lastEditby) {
		this.user_id = user_id;
		this.class_id = class_id;
		this.attend_at = attend_at;
		this.status = status;
		this.lastEditby = lastEditby;
	}

	toJSON() {
		return {
			user_id: this.user_id,
			class_id: this.class_id,
			attend_at: this.attend_at,
			status: this.status,
			lastEditby: this.lastEditby
		};
	}
}

export default Attendance;