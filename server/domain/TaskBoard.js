class TaskBoard {
    id
    boardTitle
    boardLink
    parentId

    constructor({ id, boardTitle, boardLink, parentId }) {
        this.id = id;
        this.boardTitle = boardTitle;
        this.boardLink = boardLink;
        this.parentId = parentId;

    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    getBoardTitle() {
        return this.boardTitle;
    }
    setBoardTitle(boardTitle) {
        this.boardTitle = boardTitle;
    }

    getBoardLink() {
        return this.boardLink;
    }
    setBoardLink(boardLink) {
        this.boardLink = boardLink;
    }

    getParentId() {
        return this.parentId;
    }
    setParentId(parentId) {
        this.parentId = parentId;
    }



}
export default TaskBoard