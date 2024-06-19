import { initializeApp } from "firebase/app";
import {
    getAuth,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { Octokit } from "@octokit/rest";
import { firebaseConfig } from "./firebaseConfig";
import { writable } from "svelte/store";
import fileContent from './fileContent.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();
provider.addScope("repo"); // Request the 'repo' scope

export const user = writable(null);
export const githubToken = writable("");
export const githubUsername = writable("");

let octokit;

export const login = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const firebaseUser = result.user;
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
            const token = credential.accessToken as string;
            githubToken.set(token);
            localStorage.setItem("githubToken", token);
        }
        console.log("GitHub Access Token:", credential?.accessToken);
        console.log("User Info:", firebaseUser);
        octokit = new Octokit({ auth: credential?.accessToken });
        await fetchGitHubUsername();
        user.set(firebaseUser);
    } catch (error) {
        console.error("Error during sign-in:", error);
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        user.set(null);
        githubToken.set("");
        localStorage.removeItem("githubToken");
        localStorage.removeItem("githubUser");
    } catch (error) {
        console.error("Error during sign-out:", error);
    }
};

export const createRepo = async (newRepoName: string) => {
    let token;
    githubToken.subscribe(value => token = value)();
    let username;
    githubUsername.subscribe(value => username = value)();
    
    if (newRepoName && token) {
        octokit = new Octokit({
            auth: token,
        });

        try {
            const response = await octokit.request("POST /user/repos", {
                name: newRepoName,
                description: "This is your first repo!",
                homepage: "https://github.com",
                private: false,
                is_template: true,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
            console.log("Repository created successfully:", response.data);

            // Upload contents of the app-template/dist/ directory
            await uploadDirectory(newRepoName);
            await deployAsGithubPage(octokit, username, newRepoName);
        } catch (error) {
            console.error("Error creating repository or uploading files:", error);
        }
    } else {
        console.error("Repository name or GitHub token is missing");
    }
};

export const fetchGitHubUsername = async () => {
    let token;
    githubToken.subscribe(value => token = value)();

    if (token) {
        const octokit = new Octokit({
            auth: token,
        });

        try {
            const { data } = await octokit.request("GET /user");
            githubUsername.set(data.login);
            console.log("GitHub Username:", data.login);
        } catch (error) {
            console.error("Error fetching GitHub username:", error);
        }
    }
};

export const deployAsGithubPage = async (
    octokit: any,
    owner: string,
    repo: string
) => {
    try {
        // Set the main branch as the GitHub Pages source
        const response = await octokit.request(
            "POST /repos/{owner}/{repo}/pages",
            {
                owner: owner,
                repo: repo,
                source: {
                    branch: "main",
                    path: "/",
                },
                headers: {
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            }
        );
        console.log(
            "GitHub Pages deployed from main branch:",
            response.data
        );
    } catch (error) {
        console.error("Error deploying GitHub Pages:", error);
    }
};

const uploadDirectory = async (repo: string) => {
    let token;
    githubToken.subscribe(value => token = value)();
    let username;
    githubUsername.subscribe(value => username = value)();

    const uploadFile = async (file) => {
        try {
            await octokit.request(
                "PUT /repos/{owner}/{repo}/contents/{path}",
                {
                    owner: username,
                    repo: repo,
                    path: file.path,
                    message: `Upload ${file.path}`,
                    content: file.content,
                    headers: {
                        "X-GitHub-Api-Version": "2022-11-28",
                    },
                }
            );
            console.log(`Uploaded ${file.path}`);
        } catch (error) {
            console.error(`Error uploading ${file.path}:`, error);
        }
    };

    for (const file of fileContent) {
        await uploadFile(file);
    }
};

export const createFile = async (newRepoName: string) => {
    await uploadDirectory(newRepoName);
};