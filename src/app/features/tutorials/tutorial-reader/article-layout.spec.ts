import { organizeArticle } from './article-layout';

describe('organizeArticle', () => {
  it('keeps steps, images and code in their original section and order', () => {
    const root = document.createElement('div');
    root.innerHTML = `<p>Introdução</p><h2 id="iam">IAM</h2>
      <ol start="2"><li>Abra os usuários.</li></ol><p><img src="/iam.png" alt="Usuários"></p>
      <h3>Credenciais</h3><pre><code>exemplo</code></pre>
      <h2 id="sqs">SQS</h2><p>Crie a fila.</p><p><img src="/sqs.png" alt="Fila"></p>`;
    const steps = root.querySelector('ol');
    const images = Array.from(root.querySelectorAll('img'));

    organizeArticle(root);

    const sections = root.querySelectorAll('.article-section');
    expect(sections).toHaveLength(2);
    expect(sections[0].getAttribute('aria-labelledby')).toBe('iam');
    expect(sections[0].querySelector('ol')).toBe(steps);
    expect(steps?.start).toBe(2);
    expect(Array.from(root.querySelectorAll('img'))).toEqual(images);
    expect(sections[0].querySelector('img')).toBe(images[0]);
    expect(sections[1].querySelector('img')).toBe(images[1]);
    expect(sections[0].querySelector('h3 + pre')?.textContent).toBe('exemplo');
    expect(root.firstElementChild?.textContent).toBe('Introdução');
    expect(root.querySelector('figcaption')?.textContent).toBe('UsuáriosAmpliar');
  });

  it('is safe to run again and preserves author-supplied figures and inline images', () => {
    const root = document.createElement('div');
    root.innerHTML = `<h2 id="secao">Seção</h2><p><img src="/foto.png" alt="Foto"></p>
      <figure><img src="/diagrama.png"><figcaption>Diagrama original</figcaption></figure>
      <p>Veja <img src="/inline.png"> neste texto.</p>`;
    organizeArticle(root);
    const firstPass = root.innerHTML;
    organizeArticle(root);
    expect(root.innerHTML).toBe(firstPass);
    expect(root.querySelectorAll('figure')).toHaveLength(2);
    expect(root.querySelectorAll('img')).toHaveLength(3);
    expect(root.textContent).toContain('Diagrama original');
  });
});
