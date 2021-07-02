const withImages = require("next-images");
const { createSecureHeaders } = require("next-secure-headers");

module.exports = withImages({
    poweredByHeader: false,
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    async headers() {
        return [{ source: "/(.*)", headers: createSecureHeaders() }];
    },
});
