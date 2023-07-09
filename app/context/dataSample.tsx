export type dataSampleProps = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export const dataSample: dataSampleProps[] = [
  {
    login: "ryanmcdermott",
    id: 5114666,
    node_id: "MDQ6VXNlcjUxMTQ2NjY=",
    avatar_url: "https://avatars.githubusercontent.com/u/5114666?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/ryanmcdermott",
    html_url: "https://github.com/ryanmcdermott",
    followers_url: "https://api.github.com/users/ryanmcdermott/followers",
    following_url:
      "https://api.github.com/users/ryanmcdermott/following{/other_user}",
    gists_url: "https://api.github.com/users/ryanmcdermott/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/ryanmcdermott/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/ryanmcdermott/subscriptions",
    organizations_url: "https://api.github.com/users/ryanmcdermott/orgs",
    repos_url: "https://api.github.com/users/ryanmcdermott/repos",
    events_url: "https://api.github.com/users/ryanmcdermott/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/ryanmcdermott/received_events",
    type: "User",
    site_admin: false,
    name: "Ryan McDermott",
    company: "@google ",
    blog: "https://twitter.com/ryconoclast",
    location: "Bay Area",
    email: null,
    hireable: null,
    bio: "Occasional open source developer. I'm sorry for my slow responses to issues and PRs.",
    twitter_username: null,
    public_repos: 42,
    public_gists: 5,
    followers: 3822,
    following: 4,
    created_at: "2013-07-29T16:38:31Z",
    updated_at: "2023-07-07T03:15:54Z",
  },
  {
    login: "ryanb",
    id: 161,
    node_id: "MDQ6VXNlcjE2MQ==",
    avatar_url: "https://avatars.githubusercontent.com/u/161?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/ryanb",
    html_url: "https://github.com/ryanb",
    followers_url: "https://api.github.com/users/ryanb/followers",
    following_url: "https://api.github.com/users/ryanb/following{/other_user}",
    gists_url: "https://api.github.com/users/ryanb/gists{/gist_id}",
    starred_url: "https://api.github.com/users/ryanb/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/ryanb/subscriptions",
    organizations_url: "https://api.github.com/users/ryanb/orgs",
    repos_url: "https://api.github.com/users/ryanb/repos",
    events_url: "https://api.github.com/users/ryanb/events{/privacy}",
    received_events_url: "https://api.github.com/users/ryanb/received_events",
    type: "User",
    site_admin: false,
    name: "Ryan Bates",
    company: "RailsCasts",
    blog: "http://railscasts.com",
    location: "Southern Oregon",
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 65,
    public_gists: 63,
    followers: 7628,
    following: 96,
    created_at: "2008-02-07T22:42:25Z",
    updated_at: "2022-10-13T21:43:50Z",
  },
  {
    login: "ryan",
    id: 96321,
    node_id: "MDQ6VXNlcjk2MzIx",
    avatar_url: "https://avatars.githubusercontent.com/u/96321?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/ryan",
    html_url: "https://github.com/ryan",
    followers_url: "https://api.github.com/users/ryan/followers",
    following_url: "https://api.github.com/users/ryan/following{/other_user}",
    gists_url: "https://api.github.com/users/ryan/gists{/gist_id}",
    starred_url: "https://api.github.com/users/ryan/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/ryan/subscriptions",
    organizations_url: "https://api.github.com/users/ryan/orgs",
    repos_url: "https://api.github.com/users/ryan/repos",
    events_url: "https://api.github.com/users/ryan/events{/privacy}",
    received_events_url: "https://api.github.com/users/ryan/received_events",
    type: "User",
    site_admin: false,
    name: "Ryan Mudryk",
    company: null,
    blog: "",
    location: "Toronto, ON",
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 0,
    public_gists: 0,
    followers: 10,
    following: 0,
    created_at: "2009-06-17T13:01:43Z",
    updated_at: "2023-01-10T23:42:56Z",
  },
  {
    login: "ryanflorence",
    id: 100200,
    node_id: "MDQ6VXNlcjEwMDIwMA==",
    avatar_url: "https://avatars.githubusercontent.com/u/100200?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/ryanflorence",
    html_url: "https://github.com/ryanflorence",
    followers_url: "https://api.github.com/users/ryanflorence/followers",
    following_url:
      "https://api.github.com/users/ryanflorence/following{/other_user}",
    gists_url: "https://api.github.com/users/ryanflorence/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/ryanflorence/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/ryanflorence/subscriptions",
    organizations_url: "https://api.github.com/users/ryanflorence/orgs",
    repos_url: "https://api.github.com/users/ryanflorence/repos",
    events_url: "https://api.github.com/users/ryanflorence/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/ryanflorence/received_events",
    type: "User",
    site_admin: false,
    name: "Ryan Florence",
    company: "React Training",
    blog: "http://remix.run",
    location: "Utah",
    email: null,
    hireable: null,
    bio: "@remix-run, @ReactTraining, React Router, @reach. Doing my best.",
    twitter_username: "ryanflorence",
    public_repos: 250,
    public_gists: 789,
    followers: 8823,
    following: 0,
    created_at: "2009-06-30T03:46:58Z",
    updated_at: "2023-06-12T18:22:40Z",
  },
];
