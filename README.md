This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn install
# and
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment

Please add some files that named `.env.local`. Then add these setup to the file;

```markdown
GITHUB_TOKEN=tokenfromgithub
NEXT_PUBLIC_ENV_IS_PRODUCTION=false
```

Set `false` to get local data from `context/datasample.tsx` and set to `true` if you wanna get real data from Github API.

## Deployed on Vercel

Please see the demo here: [Demo](https://atask-xi.vercel.app/)
