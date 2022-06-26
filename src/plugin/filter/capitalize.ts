export default function capitalize(str: string): string {
    return str.split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}