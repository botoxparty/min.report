function watchFootnoteScroll() {
  setTimeout(() => {
    const contentBody = document.querySelector('.article-content');
    const arrayoflinks = Array.from(
      contentBody ? contentBody.querySelectorAll('a') : []
    ).filter((lnk: HTMLAnchorElement) => lnk.href.includes('ftn'));

    for (let i = 0; i < arrayoflinks.length; i++) {
      const curr = arrayoflinks[i];
      const matching = curr.href.includes('ftnref')
        ? contentBody?.querySelector(
            `a[href="${curr.href.replace('ftnref', 'ftn')}"]`
          )
        : contentBody?.querySelector(
            `a[href="${curr.href.replace('ftn', 'ftnref')}"]`
          );

      curr.addEventListener('click', (e) => {
        e.preventDefault();
        if (!matching) {
          return;
        }
        const yOffset = -30;
        const y =
          matching.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });

        matching.classList.add('fn-active');
        curr.classList.add('fn-active');
      });

      curr.addEventListener('blur', (e) => {
        e.preventDefault();
        arrayoflinks.forEach((link) => link.classList.remove('fn-active'));
      });
    }
  }, 50);
}

export default watchFootnoteScroll;
