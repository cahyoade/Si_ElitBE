class User {
	constructor(id, name, card_id, password, birth_date, grade, telephone_number, role) {
		this.id = id;
		this.name = name;
		this.card_id = card_id;
		this.password = password;
		this.birth_date = birth_date;
		this.grade = grade;
		this.telephone_number = telephone_number;
		this.role = role;
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
		};
	}
}

export default User;