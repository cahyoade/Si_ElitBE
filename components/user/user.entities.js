class User {
	constructor(id, name, card_id, password, birth_date, grade, telephone_number, role, nis, is_active, inactive_reason, gender, class_type, origin, residence_in_semarang) {
		this.id = id;
		this.name = name;
		this.card_id = card_id;
		this.password = password;
		this.birth_date = birth_date;
		this.grade = grade;
		this.telephone_number = telephone_number;
		this.role = role;
		this.nis = nis;
		this.is_active = is_active;
		this.inactive_reason = inactive_reason;
		this.gender = gender;
		this.class_type = class_type;
		this.origin = origin;
		this.residence_in_semarang = residence_in_semarang;
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			card_id: this.card_id,
			password: this.password,
			birth_date: this.birth_date,
			grade: this.grade,
			telephone_number: this.telephone_number,
			role: this.role,
			nis: this.nis,
			is_active: this.is_active,
			inactive_reason: this.inactive_reason,
			gender: this.gender,
			class_type : this.class_type,
			origin: this.origin,
			residence_in_semarang: this.residence_in_semarang
		};
	}
}

export default User;