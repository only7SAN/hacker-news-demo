import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import Api from '../../../api';
import '../style.css';

// comment 节点
const CommentItem = React.memo((props) => {
  const history = useHistory();
  const { kid, id } = props;

  const [detail, setDetail] = useState(null);
  // 展开、隐藏
  const [isOpen, setIsOpen] = useState(true);
  const [hasChild, setHasChild] = useState(false);

  useEffect(() => {
    Api.getComment(kid).then((data) => {
      setDetail(data);
      setHasChild(data.kids && data.kids.length > 0);
    })
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen)
  };

  const goReplyPage = () => {
    history.push(`/reply?id=${id}&kid=${kid}`);
  };

  return detail && (
    <div className="comment">
      <div className="comment-top">
        <div className="comment-title">
          ** {detail.by}
          {hasChild && <div className="comment-change" onClick={handleClick}>{isOpen ? '[收起]' : '[展开]'}</div>}
        </div>
        <div className="comment-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(detail.text) }} />
        <div className="comment-reply-btn" onClick={goReplyPage}>reply</div>
      </div>
      {
        hasChild && (
          <div className={`comment-child ${isOpen ? 'comment-child-open' : 'comment-child-hide'}`}>
            {
              detail.kids.map(item =>(
                <CommentItem key={item} kid={item} id={id} />
              ))
            }
          </div>
        )
      }
    </div>
  );
});

export default CommentItem;
