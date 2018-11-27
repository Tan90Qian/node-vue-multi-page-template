import requestPromise from 'request-promise-native';

export default function rp({ url, option = {}, logger, successCode = 1 }) {
  const baseOption = {
    baseUrl: 'http://mnw.com:8888',
    transform(body, response) {
      const { statusCode } = response;
      if (statusCode < 200 || statusCode >= 300) {
        logger && logger.error(`url:${url} msg: statusCode - ${statusCode}`);
        return Promise.reject({
          error: 1,
          msg: `statusCode - ${statusCode}`,
        });
      } else {
        try {
          const { msg, data, code } = JSON.parse(body);
          if (code === successCode) {
            logger &&
              logger.info(`url:${url} cdoe:${code} msg:${msg} data:${JSON.stringify(data)}`);
            /* 请求正常返回 */
            return data;
          } else {
            logger && logger.error(`url:${url} cdoe:${code} msg:${msg}`);
            /* 请求内部错误 */
            return Promise.reject({
              error: 2,
              msg,
            });
          }
        } catch (e) {
          logger && logger.error(`url:${url} msg: body解析失败`);
          /* php无效路由 */
          return Promise({
            error: 3,
            msg: 'body解析失败',
          });
        }
      }
    },
  };

  return requestPromise(url, { ...baseOption, ...option });
}
