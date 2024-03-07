import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  name: string;
  type: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, name, type }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://git-inspect.web.app/icon.png"
      />
      <meta property="og:url" content="https://git-inspect.web.app" />
      <meta property="og:type" content="website" />

      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
