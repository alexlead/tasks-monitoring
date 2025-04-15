class TaskRequest {
    id
    requestTitle
    requestLink
    requestDescription
    requestStatus
    requestType
    parentId
    createdDate
    changedDate

    constructor({ id, requestTitle,
        requestLink,
        requestDescription,
        requestStatus,
        requestType,
        parentId,
        createdDate,
        changedDate }) {
        this.id = id;
        this.requestTitle = requestTitle;
        this.requestLink = requestLink;
        this.requestDescription = requestDescription;
        this.requestStatus = requestStatus;
        this.requestType = requestType;
        this.parentId = parentId;
        this.createdDate = createdDate;
        this.changedDate = changedDate;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    getRequestTitle() {
        return this.requestTitle;
    }
    setRequestTitle(requestTitle) {
        this.requestTitle = requestTitle;
    }

    getRequestLink() {
        return this.requestLink;
    }
    setRequestLink(requestLink) {
        this.requestLink = requestLink;
    }

    getRequestDescription() {
        return this.requestDescription;
    }
    setRequestDescription(requestDescription) {
        this.requestDescription = requestDescription;
    }

    getRequestStatus() {
        return this.requestStatus;
    }
    setRequestStatus(requestStatus) {
        this.requestStatus = requestStatus;
    }

    getRequestType() {
        return this.requestType;
    }
    setRequestType(requestType) {
        this.requestType = requestType;
    }

    getParentId() {
        return this.parentId;
    }
    setParentId(parentId) {
        this.parentId = parentId;
    }

    getCreatedDate() {
        return this.createdDate;
    }
    setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }

    getChangedDate() {
        return this.changedDate;
    }
    setChangedDate(changedDate) {
        this.changedDate = changedDate;
    }


}
export default TaskRequest