function watchFootnoteScroll(updateNotes: Function) {
  setTimeout(() => {
    const contentBody = document.querySelector('.article-content');
    const citations = Array.from(
      contentBody ? contentBody.querySelectorAll('cite') : []
    );

    const res = citations.map((cite) => {
      const anchor = cite.parentElement?.querySelector('a');
      return {
        cite,
        anchor,
      };
    });

    console.log('Update notes', citations);
    updateNotes(res);
  }, 50);
}

export default watchFootnoteScroll;

// setTimeout(() => {
//   const contentBody = document.querySelector('.article-content');
//   const arrayoflinks = Array.from(
//     contentBody ? contentBody.querySelectorAll('a') : []
//   ).filter((lnk: HTMLAnchorElement) => lnk.href.includes('ftn'));

//   console.log(arrayoflinks);

//   for (let i = 0; i < arrayoflinks.length; i++) {
//     const curr = arrayoflinks[i];
//     const matching = curr.href.includes('ftnref')
//       ? contentBody?.querySelector(
//           `a[href="${curr.href.replace('ftnref', 'ftn')}"]`
//         )
//       : contentBody?.querySelector(
//           `a[href="${curr.href.replace('ftn', 'ftnref')}"]`
//         );

//     curr.addEventListener('click', (e) => {
//       e.preventDefault();
//       if (!matching) {
//         return;
//       }
//       const yOffset = -30;
//       const y =
//         matching.getBoundingClientRect().top + window.pageYOffset + yOffset;

//       // window.scrollTo({ top: y, behavior: 'smooth' });

//       const cite = curr.parentElement?.parentElement?.querySelector('cite');

//       console.log(cite);
//       cite?.classList.add('active');
//       matching.classList.add('fn-active');
//       curr.classList.add('fn-active');
//     });

//     curr.addEventListener('blur', (e) => {
//       e.preventDefault();
//       arrayoflinks.forEach((link) => {
//         link.classList.remove('fn-active');
//         const cite = curr.parentElement?.parentElement?.querySelector('cite');
//         cite?.classList.remove('active');
//       });
//     });
//   }
// }, 50);
