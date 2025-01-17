import markdownit from "markdown-it";
import DOMPurify from "dompurify";

const MarkdownPreview = ({ content }: { markdown: string }) => {
  const md = markdownit();
  const result = md.render(content);
  const cleanMarkup = DOMPurify.sanitize(result);
  const markup = { __html: cleanMarkup };

  return <div className="bg-white h-svh p-2" dangerouslySetInnerHTML={markup} />;
};

export default MarkdownPreview;
