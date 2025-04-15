class TaskBoardMeta {
    id
    boardId

    metaKey
    metaValue

    constructor({ id, boardId, metaKey, metaValue }) {

        this.id = id;
        this.boardId = boardId;
        this.metaKey = metaKey;
        this.metaValue = metaValue;

    }
    getMetaKey() {
        return this.metaKey;
    }
    setMetaKey(metaKey) {
        this.metaKey = metaKey;
    }

    getMetaValue() {
        return this.metaValue;
    }
    setMetaValue(metaValue) {
        this.metaValue = metaValue;
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    getBoardId() {
        return this.boardId;
    }
    setBoardId(boardId) {
        this.boardId = boardId;
    }


}
export default TaskBoardMeta