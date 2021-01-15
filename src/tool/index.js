import { useLocation } from 'react-router-dom';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

//HTML标签转义（< -> &lt;）
export const html2Escape = (sHtml) => {
  return sHtml.replace(/[<>&"]/g,function(c){
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
  });
};

//HTML标签反转义（&lt; -> <）
export const escape2Html = (str) => {
  var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){
    return arrEntities[t];
  });
};

export function formatTime(time, option) {
  if (`${time}`.length === 10) {
    time = parseInt(time, 10) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 300) {
    return 'last';
  }
  if (diff < 3600) {
    // less 1 hour
    return `${Math.floor(diff / 60)} minutes ago`;
  }
  if (diff < 3600 * 24) {
    return `${Math.floor(diff / 3600)} hours ago`;
  }
  if (diff < 3600 * 24 * 2) {
    return 'tomorrow';
  }
  if (option) {
    return Date.parse(time);
  }

  return `${Number.parseInt(diff / 3600 / 24, 10)} days ago`;
}
