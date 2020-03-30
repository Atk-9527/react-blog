import React, { useEffect, useState } from 'react';
import List from '../components/list/index';
import Axios from 'axios';
import servicePath from '../config/apiURL';
import { withRouter } from 'next/router';

const MyList = (props) => {
  const [articleList, setArticleList] = useState(props.list);
  const [articleType, setArticleType] = useState(props.type);
  const [queryId, setQueryId] = useState(props.router.query.id);
  const [type, setType] = useState();
  const [pageType, setPageTpye] = useState('/list');
  useEffect(() => {
    setArticleList(props.list);
  }, [props.list]);
  useEffect(() => {
    setArticleType(props.type);
  }, [props.type]);
  useEffect(() => {
    setQueryId(props.router.query.id);
  }, [props.router.query.id]);
  useEffect(() => {
    getType(articleType, queryId);
  }, [queryId]);
  const getType = (articleType, queryId) => {
    if(articleType.length != 0) {
        for(let obj of articleType) {
            for(let key in obj) {
                if(key == 'id') {
                    if(obj[key] == queryId) {
                      setType(obj['typeName']);
                    }
                }
            }
        }
    } else {
        return setType('unknown');
    }
}
  return (
    <>
      <List articleList={articleList} articleType={type} queryId={queryId} pageType={pageType}/>
    </>
  )
}

MyList.getInitialProps = async (context) => {
  const id = context.query.id;
    const list = await Axios(`${servicePath.getArticleListById}/${id}`).then(res => {
      return res.data.data;
    });
    const type = await Axios(servicePath.getTypeInfo).then(res => {
      return res.data.data;
    });
    const data = {
      list: list,
      type: type,
    }
  return data; 
}

export default withRouter(MyList);