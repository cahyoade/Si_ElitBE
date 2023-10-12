class Class {
	constructor(id, name, start_date, end_date, manager_id, teacher_id, location) {
		this.id = id;
		this.name = name;
		this.start_date = start_date;
		this.end_date = end_date;
		this.manager_id = manager_id;
		this.teacher_id = teacher_id;
		this.location = location;
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			start_date: this.start_date,
			end_date: this.end_date,
			manager_id: this.manager_id,
			teacher_id: this.teacher_id,
			location: this.location
		};
	}
}

export default Class;