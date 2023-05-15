import parse from 'html-react-parser'

export function parseHTML(
    htmlString: string = '<div><div/>',
    displayAlt: boolean = false
): string | JSX.Element | JSX.Element[] {
    return parse(htmlString ?? '', {
        replace(domNode) {
            if (!displayAlt) return

            const newDOMNode = domNode as typeof domNode & {
                name: string
                attribs: {
                    alt: string
                    src: string
                }
            }

            if (newDOMNode.type === 'tag' && newDOMNode.name === 'img') {
                const { alt } = newDOMNode.attribs
                const filename = alt.split('/').pop()
                return <span title={filename}>{filename}</span>
            }
        },
    })
}
