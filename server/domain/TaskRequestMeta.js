class TaskRequestMeta {
    id
    requestId

    metaKey
    metaValue
    constructor({ id, requestId, metaKey, metaValue }) {

        this.id = id;
        this.requestId = requestId;
        this.metaKey = metaKey;
        this.metaValue = metaValue;


    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    getRequestId() {
        return this.requestId;
    }
    setRequestId(requestId) {
        this.requestId = requestId;
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
}
export default TaskRequestMeta