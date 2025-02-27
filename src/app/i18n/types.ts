import "i18next";
import { ReactElement } from "react";

export interface CustomTypeOptions {
  defaultNS: "common";
  returnNull: false;
  resources: {
    common: CommonResources;
  };
}

interface CommonResources {
  navigation: {
    home: string;
    about: string;
    projects: string;
    blog: string;
    contact: string;
  };
  footer: {
    brand: string;
    company: string;
    legal: string;
    privacyPolicy: string;
    termsOfService: string;
    copyright: string;
    slogan: string;
  };
  hero: {
    title: string;
    description: string;
  };
  features: {
    title: string;
    items: {
      innovation: {
        title: string;
        description: string;
      };
      customer: {
        title: string;
        description: string;
      };
      growth: {
        title: string;
        description: string;
      };
    };
  };
  about: {
    title: string;
    mission: {
      title: string;
      description: string;
    };
    vision: {
      title: string;
      description: string;
    };
    team: {
      title: string;
    };
  };
  about_page: {
    title: string;
    subtitle: string;
    history: {
      title: string;
      items: Array<{
        year: string;
        title: string;
        description: string;
      }>;
    };
    values: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
  };
  projects_page: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      web: string;
      mobile: string;
      ai: string;
    };
    items: Array<{
      title: string;
      description: string;
      category: string;
      image: string;
      tags: string[];
    }>;
  };
  blog_page: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      development: string;
      technology: string;
      design: string;
      culture: string;
    };
    posts: Array<{
      title: string;
      description: string;
      category: string;
      author: string;
      date: string;
      readTime: string;
      thumbnail: string;
      tags: string[];
    }>;
  };
  blog_detail: {
    back_to_blog: string;
    published_on: string;
    read_time: string;
    author: string;
    share: string;
    related_posts: string;
    tags: string;
  };
  contact_page: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      success: string;
      error: string;
    };
    contact_info: {
      title: string;
      address: {
        title: string;
        value: string;
      };
      email: {
        title: string;
        value: string;
      };
      phone: {
        title: string;
        value: string;
      };
    };
  };
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    returnNull: false;
    resources: {
      common: CommonResources;
    };
  }
}

export interface IconProps {
  icon: ReactElement;
  title: string;
  description: string;
}
