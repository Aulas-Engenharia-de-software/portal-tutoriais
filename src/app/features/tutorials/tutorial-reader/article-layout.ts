/** Adds reading landmarks without changing the Markdown's content or sequence. */
export function organizeArticle(root: HTMLElement): void {
  const document = root.ownerDocument;
  const headings = Array.from(root.children).filter((node) => node.tagName === 'H2');

  for (const heading of headings) {
    const section = document.createElement('section');
    section.className = 'article-section';
    if (heading.id) section.setAttribute('aria-labelledby', heading.id);
    root.insertBefore(section, heading);

    let node: ChildNode | null = heading;
    while (node && (node === heading || node.nodeName !== 'H2')) {
      const next: ChildNode | null = node.nextSibling;
      section.appendChild(node);
      node = next;
    }

    const body = document.createElement('div');
    body.className = 'article-section-body';
    while (heading.nextSibling) body.appendChild(heading.nextSibling);
    section.appendChild(body);
  }

  for (const image of Array.from(root.querySelectorAll('img'))) {
    if (image.closest('figure, a')) continue;
    const paragraph = image.parentElement;
    if (
      paragraph?.tagName !== 'P' ||
      paragraph.childElementCount !== 1 ||
      paragraph.textContent?.trim()
    )
      continue;

    const figure = document.createElement('figure');
    figure.className = 'article-image';
    paragraph.replaceWith(figure);
    figure.appendChild(image);

    const caption = document.createElement('figcaption');
    const description = document.createElement('span');
    description.textContent = image.alt || 'Imagem do tutorial';
    const zoom = document.createElement('span');
    zoom.className = 'image-zoom';
    zoom.textContent = 'Ampliar';
    zoom.setAttribute('aria-hidden', 'true');
    caption.append(description, zoom);
    figure.appendChild(caption);
  }
}
