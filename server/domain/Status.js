class Status {
    id
    title

    constructor({ id, title }) {
        this.id = id;
        this.title = title;
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

}
export default Status