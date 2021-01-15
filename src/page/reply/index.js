import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import Api from '../../api';
import {html2Escape, useQuery} from '../../tool';

import './style.css';

// 回复页面
const Reply = () => {
  const query = useQuery();
  const history = useHistory();

  const [replyText, setReplyText] = useState('');
  const [detail, setDetail] = useState(null);
  const [commentDetail, setCommentDetail] = useState(null);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    Promise.all([
      Api.getItem(query.get('id')),
      Api.getComment(query.get('kid')),
    ]).then(([data, commentData]) => {
      setDetail(data);
      setCommentDetail(commentData);
    })
  };

  const handleTextChange = (e) => {
    setReplyText(e.target.value);
  };

  const submit = () => {
    if (replyText) {
      Api.replyComment({ parentId: detail.id, text: html2Escape(replyText) }).then(() => {
        // 返回评论页面
        history.push(`/item?id=${query.get('id')}`);
      }).catch((err) => { console.log('回复失败')})
    } else {
      console.log('please write something');
    }
  };

  return detail && commentDetail && (
    <div className="reply-container">
      <div className="reply-title">{detail.by} on: {detail.title} </div>
      <div className="reply-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(commentDetail.text) }} />
      <textarea className="reply-textarea" cols={40} rows={8} value={replyText} onChange={handleTextChange} />
      <div>If you haven't already, would you mind reading about HN's approach to comments and site guidelines?</div>
      <button className="reply-btn" onClick={submit}>reply</button>
    </div>
  );
};

export default Reply;
