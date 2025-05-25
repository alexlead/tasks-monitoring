class Status {
    id
    title
    color
    statusDelete

    constructor({ id, title, color, statusDelete }) {
        this.id = id;
        this.title = title;
        this.color = color;
        this.statusDelete = statusDelete;
    }
    setId(id) {
        this.id = id
    }

    getId() {
        return this.id;
    }
    setTitle(title) {
        this.title = title
    }

    getTitle() {
        return this.title;
    }
    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }
    setStatusDelete(statusDelete) {
        this.statusDelete = statusDelete;
    }

    getStatusDelete() {
        return this.statusDelete;
    }

}
export default Status