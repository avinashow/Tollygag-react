import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GetPostCommentTO } from '../api/api.types';
import { getPostComments } from '../api/get-post-comment.api';

import CircularProgress from '@material-ui/core/CircularProgress';

type CommentsProps = any;

export function CommentsSection(props: CommentsProps) {

  const { id } = useParams();
  const [postComments, setPostComments] = useState< GetPostCommentTO[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPostComments({ id }).then(data => {
      setPostComments(data);
    }).catch(error => {
      // TODO error handling
    }).finally(() => {
      setLoading(false);
    })

  }, []);


  if (loading || !postComments) {
    return (
      <CircularProgress />
    );
  }

  return (
    <div>
      {postComments[0].body}
    </div>
  );
}