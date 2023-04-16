$(function () {
    function loadPage(page) {
        currentPage = page;
        getItems(currentPage, limit);
        loadedPagination(currentPage, totalPages);
    }
});
