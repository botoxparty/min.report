import http from './http';

const WP_URL = 'https://admin.min.report/wp-json';

const getPosts = (path?: string) =>
  http.get(`${WP_URL}/wp/v2/posts?per_page=20`);

const getPostsByAuthor = (author: string) =>
  http.get(`${WP_URL}/wp/v2/author_x?slug=${author}`);

const getPost = (path: string) =>
  http.get(`${WP_URL}/wp/v2/post_x?slug=${path}`);

export default {
  getPosts,
  getPost,
  getPostsByAuthor,
};

export interface WordpressPost {
  author_x: {
    id: number;
    name: string;
    slug: string;
  };
  categories: Array<number>;
  comment_status: string;
  content: {
    rendered: string;
    protected: boolean;
  };
  date: string;
  date_gmt: string;
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  featured_img_x: {
    thumb: string;
    medium: string;
    large: string;
  };
  format: string;
  guid: {
    rendered: string;
  };
  id: number;
  link: string;
  meta: Array<any>;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: Array<number>;
  template: string;
  title: {
    rendered: string;
  };
  type: string;
  yoast_meta: {
    yoast_wpsea_title: string;
    yoast_wpseo_canonical: string;
    yoast_wpseo_company_logo: string;
    yoast_wpseo_company_name: string;
    yoast_wpseo_company_or_person: 'person' | 'company';
    yoast_wpseo_facebook_description: string;
    yoast_wpseo_facebook_image: string;
    yoast_wpseo_facebook_title: string;
    yoast_wpseo_facebook_type: string;
    yoast_wpseo_metadesc: string;
    yoast_wpseo_person_name: string;
    yoast_wpseo_social_url: string;
    yoast_wpseo_title: string;
    yoast_wpseo_twitter_description: string;
    yoast_wpseo_twitter_image: string;
    yoast_wpseo_twitter_title: string;
    yoast_wpseo_website_name: string;
  };
  yst_prominent_words: Array<string>;
}
