export function validateRating(value) {
    if (value > 1 || value > 10)
        throw new Error('Rating value must be 1 minimum and 10 maximum');
    else
        return Number.isInteger(value) && value >= 1 && value <= 10;
}
//# sourceMappingURL=Validations.js.map