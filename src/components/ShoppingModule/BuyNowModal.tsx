import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { WordpressProduct } from '../../services/wordpress';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const BuyNowModalPortal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const BuyNowModalContainer = styled.div`
  background-color: white;
  padding: 1rem;
  position: relative;
  max-width: 300px;
  .close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  h1 {
    margin-top: 0;
    font-size: 2rem;
  }
`;

const BuyNowModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
    margin-bottom: 1rem;
  }
  .input {
    margin-bottom: 1rem;
    display: flex;
    width: 100%;
    label {
      margin-right: 0.5rem;
      flex: 1;
    }
    input {
      max-width: 50%;
    }
  }
  font-size: 1.25rem;
  input,
  button,
  label,
  select,
  option {
    font-size: 1.25rem;
  }
`;



interface Props {
  product: WordpressProduct;
  onClose: any;
}

const allCountries = [
  "AC",
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AQ",
  "AR",
  "AT",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CV",
  "CW",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FK",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PS",
  "PT",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SZ",
  "TA",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VN",
  "VU",
  "WF",
  "WS",
  "XK",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW",
  "ZZ",
]
function BuyNowModal({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);

  const [shipping, setShipping] = useState(
    product.stripe.shipping_options[0].option.stripe_shipping_id
  );

  const [creating, setCreating] = useState(false);

  const goToBuy = async () => {
    setCreating(true);

    const ausOnly = product.stripe.shipping_options[0].option.stripe_shipping_id === shipping;
    const { data: sessionId } = await axios.post(
      'https://75coeinknb.execute-api.us-east-1.amazonaws.com/create',
      {
        prod_id: product.stripe.prod_id,
        price_id: product.stripe.price_id,
        quantity,
        shipping_id: shipping,
        allowed_countries: ausOnly ? ["AU"] : allCountries
      }
    );
  
    const st = await loadStripe(
      'pk_live_51IzAyBLmKCFNwhPQESBbLvzHlTKx5lT2r3issUtWNblmdQ8F8i0diRLsnMv4O7MRYI6JTCKmH2UtB3dT76PJ8VDp00Mzm8a6lP'
    );

    st?.redirectToCheckout({ sessionId });
    // setCreating(false);
  };

  return (
    <BuyNowModalPortal>
      <BuyNowModalContainer>
        <button className='close' onClick={onClose}>
          x
        </button>
        <h1 dangerouslySetInnerHTML={{ __html: product.title.rendered }}></h1>
        <BuyNowModalContent>
          <img src={product.featured_img_x.thumb} />
          <div className='input'>
            <label>Price</label>
            <span>${product.stripe.price} {product.stripe.currency}</span>
          </div>
          <div className='input'>
            <label>Quantity</label>
            <input
              type='number'
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
            />
          </div>
          <div className='input'>
            <label>Shipping</label>
            <select
              value={shipping}
              onChange={(e) => {
                setShipping(e.target.value);
              }}
            >
              {product.stripe.shipping_options.map((soption) => (
                <option
                  key={soption.option.label}
                  value={soption.option.stripe_shipping_id}
                >
                  {soption.option.label} - ${soption.option.price}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() =>
              goToBuy()
            }
            disabled={creating}
          >
            {creating ? "Creating order..." : "Continue to Payment"}
          </button>
        </BuyNowModalContent>
      </BuyNowModalContainer>
    </BuyNowModalPortal>
  );
}

export default BuyNowModal;
