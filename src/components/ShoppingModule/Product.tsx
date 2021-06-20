import * as React from 'react';
import styled from 'styled-components';
import { useParams, RouteComponentProps, useHistory } from 'react-router-dom';
import wordpress, { WordpressProduct } from '../../services/wordpress';
//@ts-ignore
import InnerHTML from 'dangerously-set-html-content';
import gutenbergCSS, { customGutenbergCSS } from '../gutenbergCSS';
import BuyNowModal from './BuyNowModal';
import media from '../../media';

var ReactGA = require('react-ga');

const SCProduct = styled.div`
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.max.medium} {
    flex-direction: column;
  }
  button {
    font-size: 2.5rem;
  }
}
  .wrapper {
    max-width: 1050px;
    margin: auto;
    padding: 2em 1em 1em 1em;
    h1 {
      font-size: 3rem;
    }
    .article-content {
      ${gutenbergCSS}

      font-size: 1.25em;
      ${customGutenbergCSS}
    }
  }
`;

const buyOrPreorder = (product: WordpressProduct) => product.stripe.preorder ? 'Preorder' : 'Buy now'


function Product({}: RouteComponentProps) {
  const { slug } = useParams<any>();

  const history = useHistory();
  const [product, setProduct] = React.useState<WordpressProduct>();

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    async function loadContent() {
      try {
        const { data } = await wordpress.getProduct(slug);
        setProduct(data);
      } catch (e) {
        const { status } = e.response;
        if (status === 404) {
          history.push('/404');
        } else {
          history.push('/500');
        }
      }
      (window as any).prerenderReady = true;
      setTimeout(() => {
        ReactGA.pageview(history.location.pathname);
      }, 200);
    }

    loadContent();
  }, [slug]);

  if (!product) return null;

  return (
    <SCProduct>
      <div className='wrapper'>
        <div className='header'>
          <h1 dangerouslySetInnerHTML={{ __html: product.title.rendered }}></h1>
          <div className='buy-button'>
            <button onClick={() => setShowModal(true)}>{buyOrPreorder(product)} - ${product.stripe.price} {product.stripe.currency}</button>
          </div>
        </div>
        <InnerHTML
          className='article-content gutenberg-styles'
          html={product.content.rendered}
        />
      </div>
      {showModal && (
        <BuyNowModal product={product} onClose={() => setShowModal(false)} />
      )}
    </SCProduct>
  );
}

export default Product;
