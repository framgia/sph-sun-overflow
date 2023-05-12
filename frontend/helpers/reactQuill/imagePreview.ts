import Quill from 'quill'
const Inline = Quill.import('formats/image')

class ImagePreviewBlot extends Inline {
    static blotName = 'imagePreview'
    static tagName = 'span'
    static create(value: { alt: string; src: string }): HTMLElement {
        const node = super.create()
        node.setAttribute('data-src', value.src)
        node.setAttribute('data-alt', value.alt)
        node.innerHTML = `!image(${value.src})`
        return node
    }

    static value(node: HTMLElement): { alt: string; src: string } {
        return {
            alt: node.getAttribute('data-alt') ?? '',
            src: node.getAttribute('data-src') ?? '',
        }
    }
}

export default ImagePreviewBlot
