/**
 * To add new module update plugins/api.ts
 */

import { $Fetch } from 'ofetch';

class HttpFactory {
  private $fetch: $Fetch;

  constructor (fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  /**
    * method - GET, POST, PUT
    * URL
  **/
  async call<T> (method: string, url: string, body?: object | null, extras = {}): Promise<T> {
    const fetchOptions = { method, ...(body ? { body } : {}), ...extras };
    const $res: T = await this.$fetch(url, fetchOptions);
    return $res;
  }
}

export default HttpFactory;
