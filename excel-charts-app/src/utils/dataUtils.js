export function getUniqueValues(data, key) {
    return [...new Set(
        data.map((row) => row[key]).filter(Boolean)
    )];
}
