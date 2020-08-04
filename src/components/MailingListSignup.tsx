import * as React from 'react';
import styled from 'styled-components';
import jsonp from 'jsonp';
import media from '../media';

const MAIL_URL = `//report.us17.list-manage.com/subscribe/post?u=199663d13b4fa414415fef608&id=786719a6f5`;
const getAjaxUrl = (url: string) => url.replace('/post?', '/post-json?');

const SCMailingListSignup = styled.form`
  padding: 0.5em;
  text-align: center;
  position: sticky;
  bottom: 0;
  background-color: #202267;
  z-index: 9999;
  color: white;
  a {
    color: white;
    border-bottom: 1px dotted white;
  }
  .signup-form {
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.max.medium} {
      flex-direction: column;
      label {
        margin-bottom: 0.25em;
      }
    }
  }
  .hide {
    position: absolute;
    right: 1em;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    svg {
      cursor: pointer;
    }
  }
  label {
    margin: 0 1em;
  }
  input {
    border: 1px dotted gray;
    font-family: 'Times';
    font-size: 1rem;
    padding: 0.25em;
  }
`;

function MailingListSignup() {
  const [status, setStatus] = React.useState<any>('');
  const [message, setMessage] = React.useState<any>(null);
  const [hidden, setHidden] = React.useState(
    localStorage.getItem('signedup') === 'true'
  );

  const emailRef = React.useRef<HTMLInputElement>(null);

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef && emailRef.current ? emailRef.current.value : '';

    const url = getAjaxUrl(MAIL_URL) + '&EMAIL=' + email;

    setStatus('sending');
    setMessage('');

    jsonp(
      url,
      {
        param: 'c',
      },
      (err, data) => {
        if (err) {
          setStatus('error');
          setMessage(err);
        } else if (data.result !== 'success') {
          setStatus('error');
          setMessage(data.msg);
        } else {
          setStatus('success');
          setMessage(data.msg);
          localStorage.setItem('signedup', 'true');
          setTimeout(() => {
            setHidden(true);
          }, 5000);
        }
      }
    );
  };

  const complete = status === 'error' || status === 'success';

  if (hidden) return <></>;
  return (
    <SCMailingListSignup onSubmit={subscribe}>
      {complete ? (
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      ) : (
        <div className='signup-form'>
          <label>Sign up to the mailing list</label>
          <input
            type='email'
            name='email'
            ref={emailRef}
            placeholder='Email address'
          ></input>
        </div>
      )}
    </SCMailingListSignup>
  );
}

export default MailingListSignup;
