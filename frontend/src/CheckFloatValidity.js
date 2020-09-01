export function checkFloatValidity(float) {
    return /^\d+[.]\d+$/.test(float) || /^\d+$/.test(float);
}
