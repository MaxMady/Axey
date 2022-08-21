function _toTitleCase(str) {
    if (typeof str !== "string") return null;
    return str.replace(/\b\w/g, w => w.toUpperCase());
}
module.exports = {
    _toTitleCase,
}