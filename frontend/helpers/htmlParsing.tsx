import parse from 'html-react-parser'

export function parseHTML(
    htmlString: string = '<div><div/>'
): string | JSX.Element | JSX.Element[] {
    return parse(htmlString ?? '')
}
