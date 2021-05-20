const withImages = require("next-images");
const { createSecureHeaders } = require("next-secure-headers");

module.exports = withImages({
    poweredByHeader: false,
    future: {
        webpack5: true,
    },
    async headers() {
        return [{ source: "/(.*)", headers: createSecureHeaders() }];
    },
});
