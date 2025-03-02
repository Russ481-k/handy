export interface FooterLink {
  name: string;
  url: string;
}

export interface FooterData {
  slogan: string;
  links: {
    social: FooterLink[];
    legal: FooterLink[];
  };
  copyright: string;
}
