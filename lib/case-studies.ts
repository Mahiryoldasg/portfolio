import type { CaseStudy } from "@/types/case-study";
import { meta as kredimCheckout } from "@/content/case-studies/kredim-checkout.mdx";
import { meta as kredimMemberPanel } from "@/content/case-studies/kredim-member-panel.mdx";
import { meta as kredimMerchant } from "@/content/case-studies/kredim-merchant.mdx";
import { meta as kredimBackstage } from "@/content/case-studies/kredim-backstage.mdx";

// Listing order is editorial, not chronological. The detail route reads its
// body straight from `content/case-studies/<slug>.mdx`, so this is metadata
// only.
export const caseStudies: CaseStudy[] = [
  kredimCheckout,
  kredimMemberPanel,
  kredimMerchant,
  kredimBackstage,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
