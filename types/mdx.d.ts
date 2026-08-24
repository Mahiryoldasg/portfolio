// Project-owned in place of `@types/mdx`, which declares only the default
// export. Case study MDX files carry their frontmatter as a `meta` export, so
// it has to be part of the module shape to stay type-checked.
//
// Inline `import(...)` types keep this file a script, not a module - a
// top-level `import` would turn `declare module "*.mdx"` into an augmentation
// and the wildcard would stop matching.
declare module "*.mdx" {
  export const meta: import("@/types/case-study").CaseStudy;
  export default function MDXContent(
    props: import("mdx/types").MDXProps,
  ): React.JSX.Element;
}
