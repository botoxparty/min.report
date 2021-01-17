import * as React from 'react';
import styled from 'styled-components';

const AddComment = styled.div`
    display: flex;
    flex-direction: column;
    textarea {
        min-height: 90px;
    }
`;

const SingleComment = styled.div`
    .user {

    }
    .comment {

    }
`;

function Comments() {

    const submitComment = (comment: string) => {

    }

    return <section>
        <h2>Comments</h2>
        <AddComment>
            <textarea></textarea>
            <button>Add comment</button>
        </AddComment>
        <SingleComment>
            <p className="user">Username... days ago</p>
            <p className="comment">This is the whole comment</p>
        </SingleComment>
    </section>
}

export default Comments;