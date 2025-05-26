class Task {
    id
    title
    description
    createdDate
    statusId
    statusDelete

    constructor({ id, title, description, createdDate, statusId, statusDelete }) {
        this.id = id
        this.title = title
        this.description = description
        this.createdDate = createdDate
        this.statusId = statusId
        this.statusDelete = statusDelete
    }
    getStatusDelete() {
        return this.statusDelete;
    }
    setStatusDelete(statusDelete) {
        this.statusDelete = statusDelete;
    }

    getStatusId() {
        return this.statusId;
    }
    setStatusId(statusId) {
        this.statusId = statusId;
    }

    getCreatedDate() {
        return this.createdDate;
    }
    setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }

    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }


}
export default Task