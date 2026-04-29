import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/New-project" : "",
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/New-project",
        assetPrefix: "/New-project",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
