import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, keywords }) => {
    const siteTitle = "Krishna Juice Shop";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "Krishna Juice Shop - Serving the freshest and most hygienic juices, shakes, and smoothies in Jagatpura, Jaipur. Over 10 years of experience in providing quality and freshness.";
    const defaultKeywords = "juice shop, fresh juice, milkshakes, smoothies, Krishna Juice Shop, Jagatpura, Jaipur, healthy drinks, fruit juice";
    const defaultImage = 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80';
    const canonical = typeof window !== 'undefined' ? window.location.href : undefined;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description || defaultDescription} />
            <meta name='keywords' content={keywords || defaultKeywords} />

            {/* End standard metadata tags */}
            <link rel="canonical" href={canonical} />
            <meta property="og:image" content={defaultImage} />
            <meta name="image" content={defaultImage} />
            {/* Facebook tags */}
            <meta property="og:type" content={type || "website"} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            {/* End Facebook tags */}
            {/* Twitter tags */}
            <meta name="twitter:creator" content={name || siteTitle} />
            <meta name="twitter:card" content={type || "summary_large_image"} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {/* End Twitter tags */}
            {/* JSON-LD Structured Data for Local Business */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": siteTitle,
                    "image": [defaultImage],
                    "@id": canonical,
                    "url": canonical,
                    "telephone": "+919939429446",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "A-102 Anand Bihar Colony, near Jagatpura Fatak",
                        "addressLocality": "Jagatpura",
                        "addressRegion": "Jaipur",
                        "postalCode": "302017",
                        "addressCountry": "IN"
                    },
                    "priceRange": "₹",
                    "openingHours": ["Mo-Su 10:00-21:00"]
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
