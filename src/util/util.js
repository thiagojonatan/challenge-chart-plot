
export const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const toTitle = (string, separator = '_') => {
    return string
        .split(separator)
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}