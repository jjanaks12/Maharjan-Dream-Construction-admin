import capitalize from "./capitalize";

export default function humanize(word: string): string {
    return capitalize(word.replaceAll('_', ' '))
}