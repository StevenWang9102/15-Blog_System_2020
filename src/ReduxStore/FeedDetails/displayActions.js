export const POST_ARTICLE_CLICKED = Symbol("POST_ARTICLE_CLICKED");

export const onPostArticleClicked = (
  title,
  description,
  content,
  tags,
  slug
) => {
  return {
    type: POST_ARTICLE_CLICKED,
    title: title,
    description: description,
    content: content,
    tags: tags,
    slug: slug
  };
};