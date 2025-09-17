export type BannerCategoryKey =
  | "nature"
  | "abstract"
  | "city"
  | "minimal"
  | "colors";

export interface BannerPresetCategory {
  key: BannerCategoryKey;
  label: string;
  banners: string[];
}

export const bannerPresetCategories: BannerPresetCategory[] = [
  {
    key: "nature",
    label: "Nature",
    banners: [
      "/banners/banner5.jpg",
      "/banners/banner6.jpg",
      "/banners/banner7.jpg",
    ],
  },
  {
    key: "abstract",
    label: "Abstract",
    banners: [
      "/banners/banner1.jpg",
      "/banners/banner2.jpg",
      "/banners/banner3.jpg",
      "/banners/banner4.jpg",
    ],
  },
  {
    key: "city",
    label: "City",
    banners: [],
  },
  {
    key: "minimal",
    label: "Minimal",
    banners: [],
  },
  //   {
  //     key: "colors",
  //     label: "Colors",
  //     banners: [
  //       "linear-gradient(to right, #6366f1, #3b82f6)",
  //       "linear-gradient(to right, #06b6d4, #3b82f6)",
  //       "linear-gradient(to right, #10b981, #22c55e)",
  //       "linear-gradient(to right, #f59e0b, #ef4444)",
  //       "linear-gradient(to right, #a855f7, #ec4899)",
  //       "linear-gradient(to right, #8b5cf6, #6366f1)",
  //       "linear-gradient(to right, #6366f1, #3b82f6)",
  //     ],
  //   },
];

export const getAllBanners = (): string[] =>
  bannerPresetCategories.flatMap((c) => c.banners);
