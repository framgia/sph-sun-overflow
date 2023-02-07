import parse from 'html-react-parser';

export function parseHTML(htmlString: string = '<div><div/>') {
    return parse(htmlString);
}
