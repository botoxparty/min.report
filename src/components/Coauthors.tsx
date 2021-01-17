import * as React from 'react';
import { Link } from 'react-router-dom';
import { PostCoauthor } from '../services/wordpress';
interface Props {
    coauthors: [PostCoauthor],
    seperator?: string;
}
function Coauthors({coauthors, seperator}: Props) {
    return <>{coauthors.map((author, i) => <React.Fragment key={author.name}><Link to={`/author/${author.name}`}>
    {author.description}
  </Link>
  {i !== coauthors.length - 1 && ` ${seperator || 'and'} `}
  </React.Fragment>)}</>
}

export default Coauthors;