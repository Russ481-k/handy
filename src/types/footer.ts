export interface FooterLink {
  name: string;
  url: string;
  icon?: string;
}

export interface FooterData {
  slogan: string;
  links: {
    social: FooterLink[];
    legal: FooterLink[];
  };
  copyright: string;
}
