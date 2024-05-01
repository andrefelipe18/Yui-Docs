import { Octokit } from "@octokit/rest";

interface MarkDownFile {
  path: string;
}

const config = useRuntimeConfig();
const octokit = new Octokit({ auth: config.github_api_token });

export async function getMarkdownFiles(owner: string, repo: string, path: string = ''): Promise<MarkDownFile[]> {
  try {
    const data = await getRepoContent(owner, repo, path);
    const files = Array.isArray(data) ? data : [data]; //Odeio TS
    return await processFiles(files, owner, repo);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getRepoContent(owner: string, repo: string, path: string) {
  const response = await octokit.repos.getContent({ owner, repo, path });
  return response.data;
}

async function processFiles(files: any[], owner: string, repo: string): Promise<MarkDownFile[]> {
  let markdownFiles: MarkDownFile[] = [];

  for (const file of files) {
    if (file.type === "dir") {
      const filesInDir = await getMarkdownFiles(owner, repo, file.path);
      markdownFiles = markdownFiles.concat(filesInDir);
    } else if (file.name.endsWith(".md")) {
      markdownFiles.push({ path: file.path });
    }
  }

  return markdownFiles;
}