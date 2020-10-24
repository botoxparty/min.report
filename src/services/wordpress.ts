import http from './http';

const WP_URL = 'https://admin.min.report/wp-json';

const getMixes = () =>
  http.get(`${WP_URL}/wp/v2/mix?per_page=20`);

const getPosts = (page: number) =>
  http.get(`${WP_URL}/wp/v2/posts?per_page=10&page=${page}`);

const getPostsByAuthor = (author: string) =>
  http.get(`${WP_URL}/wp/v2/author_x?slug=${author}`);

const getPost = (path: string) =>
  http.get(`${WP_URL}/wp/v2/post_x?slug=${path}`);

const getPostPreview = (id: string) =>
  http.get(`${WP_URL}/wp/v2/preview_x?preview_id=${id}`);

export default {
  getPosts,
  getPost,
  getMixes,
  getPostsByAuthor,
  getPostPreview,
};

interface WordpressBasic {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  template: string;
  tags: Array<number>;
  yoast_meta: Array<any>;
  yoast_title: string;
  yst_prominent_words: Array<string>;
  featured_media: number;
  featured_img_x: {
    thumb: string;
    medium: string;
    large: string;
  };
}

export interface WordpressPost extends WordpressBasic {
  author_x: {
    id: number;
    name: string;
    slug: string;
  };
  categories: Array<number>;
  comment_status: string;
  format: string;
  ping_status: string;
  sticky: boolean;
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
  };
}


export interface WordpressMix extends WordpressBasic {
    linked_post: any;
    soundcloud_url: string;
    dj: any;
}
