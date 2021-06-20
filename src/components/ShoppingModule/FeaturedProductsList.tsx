import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import wordpress, { WordpressProduct } from '../../services/wordpress';

import { Link } from 'react-router-dom';
import BuyNowModal from './BuyNowModal';
import media from '../../media';

const SCFeaturedProductsList = styled.div`
  margin-top: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted grey;
  margin-bottom: 1rem;
`;

const ProductImage = styled.img`
  height: 250px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  ${media.max.medium} {
    flex-direction: column;
  }
  h1 {
    font-size: 2rem;
  }
  div {
    padding-left: 1rem;
    ${media.max.medium} {
      padding-right: 1rem;
    }
  }
  .buy {
    display: flex;
    align-items: center;
    button {
      font-size: 1.5rem;
      font-weight: bold;
      height: 100%;
    }
  }
`;

const buyOrPreorder = (product: WordpressProduct) =>
  product.stripe.preorder ? 'Preorder' : 'Buy now';

function FeaturedProductsList() {
  const [products, setProducts] = useState<Array<WordpressProduct>>([]);

  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    async function loadProducts() {
      const { data } = await wordpress.getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <SCFeaturedProductsList>
      {products.map((product) => (
        <div>
          <ContentWrapper>
            <Link to={product.permalink}>
              <ProductImage
                alt={product.yoast_title}
                src={product.featured_img_x.thumb}
              />
            </Link>

            <div>
              <Link to={product.permalink}>
                <h1
                  dangerouslySetInnerHTML={{ __html: product.title.rendered }}
                ></h1>
              </Link>
              <h2 className='buy'>
                <button onClick={() => setShowModal(true)}>
                  {buyOrPreorder(product)} - ${product.stripe.price}{' '}
                  {product.stripe.currency}
                </button>
              </h2>
              <Link to={product.permalink}>
                <p
                  className='excerpt'
                  dangerouslySetInnerHTML={{ __html: product.excerpt.rendered }}
                ></p>
              </Link>
            </div>
          </ContentWrapper>
          {showModal && (
            <BuyNowModal
              product={product}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      ))}
    </SCFeaturedProductsList>
  );
}

export default FeaturedProductsList;
