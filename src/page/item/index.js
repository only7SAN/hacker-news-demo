import React, { useEffect, useState, useCallback } from 'react';
import Api from '../../api';
import { html2Escape } from '../../tool';
import { useQuery } from '../../tool';
import CommentItem from './comment-item';

// item 页面
const Item = () => {
  const query = useQuery();

  const [commentText, setCommentText] = useState('');
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    Api.getItem(query.get('id')).then((data) => {
      setDetail(data);
    })
  };

  const handleTextChange = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const submit = useCallback(() => {
    if (commentText) {
      Api.writeComment({ parentId: detail.id, text: html2Escape(commentText) }).then(() => {
        // 重置页面内容
        getDetail();
      }).catch((err) => { console.log('评论失败')})
    } else {
      console.log('please write something');
    }
  }, [commentText]);

  return detail && (
    <div className="detail">
      <div className="detail-top">
        <div>** {detail.title}</div>
        <textarea cols={40} rows={8} value={commentText} onChange={handleTextChange} />
        <div>If you haven't already, would you mind reading about HN's approach to comments and site guidelines?</div>
        <button onClick={submit}>add comment</button>
      </div>
      {
        detail && detail.kids && detail.kids.length > 0 && detail.kids.map(kid => (
          <CommentItem key={kid} kid={kid} id={detail.id} />
        ))
      }
    </div>
  );
}

export default Item;
