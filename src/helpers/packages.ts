const packages = {
  dev: {
    // adapters
    "solid-start-vercel": "^0.2.5",
    // tailwind
    tailwindcss: "^3.2.4",
    postcss: "^8.4.19",
    autoprefixer: "^10.4.13",
    // prisma
    prisma: "^4.6.1",
    unocss: "^0.46.5",
  },
  normal: {
    // prisma
    "@prisma/client": "^4.6.1",
    // trpc
    "@tanstack/solid-query": "^4.15.1",
    "@trpc/client": "^10.1.0",
    "@trpc/server": "^10.1.0",
    "solid-start-trpc": "^0.0.13",
    "solid-trpc": "^0.0.11-rc.2",
    // solid auth
    "solidjs-auth": "^0.0.8",
  },
};

export type IPkgs = typeof packages;
export type KeyOrKeyArray<K extends keyof IPkgs> =
  | keyof IPkgs[K]
  | (keyof IPkgs[K])[];

export function withPackages(optIn: { [K in keyof IPkgs]?: KeyOrKeyArray<K> }) {
  const devs: { [K in keyof IPkgs["dev"]]?: string } = {};
  const normals: { [K in keyof IPkgs["normal"]]?: string } = {};
  for (const keyType in optIn) {
    type OptIn = keyof typeof optIn;
    const _curr = optIn[keyType as OptIn];
    const setInOpt = (curr: typeof _curr) => {
      if (!curr) return;
      if (keyType === "dev") {
        devs[curr as keyof typeof devs] =
          packages.dev[curr as keyof typeof packages.dev];
      } else {
        normals[curr as keyof typeof normals] =
          packages.normal[curr as keyof typeof packages.normal];
      }
    };
    if (Array.isArray(_curr)) {
      for (const ele in _curr) {
        setInOpt(_curr[ele]);
      }
    } else {
      setInOpt(_curr);
    }
  }
  return [normals, devs];
}

export type IExpectedPackages = ReturnType<typeof withPackages>;