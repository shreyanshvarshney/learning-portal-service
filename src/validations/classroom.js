exports.validatePaginationParams = (pageSize, pageIndex) => {
    if (pageSize < 0 || pageIndex < 0) {
        return false;
    }
    return true;
}