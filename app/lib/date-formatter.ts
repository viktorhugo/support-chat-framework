export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-ES', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
    });
};