import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const isGithubPagesRoot = process.env.GITHUB_PAGES_ROOT === "true";
const githubPagesBasePath =
  process.env.GITHUB_PAGES_BASE_PATH ??
  (isGithubPages && !isGithubPagesRoot ? "/New-project" : "");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
  },
  ...(isGithubPages
    ? {
        output: "export",
        ...(githubPagesBasePath
          ? {
              basePath: githubPagesBasePath,
              assetPrefix: githubPagesBasePath,
            }
          : {}),
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
