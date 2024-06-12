export interface HeaderData {
  courses: {
    en?: string
    bn?: string
  }
  certify: {
    en?: string
    bn?: string
  }
  about: {
    en?: string
    bn?: string
  }
  login: {
    en?: string
    bn?: string
  }
  category: {
    en?: string
    bn?: string
  }
  EN: {
    en?: string
    bn?: string
  }
  BN: {
    en?: string
    bn?: string
  }
}

export interface FooterData {
  copyright: {
    en?: string
    bn?: string
  }
  developer: {
    header: {
      en?: string
      bn?: string
    }
    description: {
      en?: string
      bn?: string
    }
  }
  connect: {
    contact: {
      en?: string
      bn?: string
    }
    or: {
      en?: string
      bn?: string
    }
    mail: {
      en?: string
      bn?: string
    }
  }
  link: {
    all_links: {
      en?: string
      bn?: string
    }
    home: {
      en?: string
      bn?: string
    }
    courses: {
      en?: string
      bn?: string
    }
    certify: {
      en?: string
      bn?: string
    }
    about: {
      en?: string
      bn?: string
    }
  }
}
export interface SignUp {
  header: {
    en?: string
    bn?: string
  }
  starter: {
    en?: string
    bn?: string
  }
  googleSignup: {
    en?: string
    bn?: string
  }
  signup: {
    en?: string
    bn?: string
  }
  forgotPass: {
    en?: string
    bn?: string
  }
  hasAccount: {
    en?: string
    bn?: string
  }
  login: {
    en?: string
    bn?: string
  }

}

export interface Login {
  header: {
    en?: string
    bn?: string
  }
  login: {
    en?: string
    bn?: string
  }
  loginButton: {
    en?: string
    bn?: string
  }
  forgetPassword: {
    en?: string
    bn?: string
  }
  noAccount: {
    en?: string
    bn?: string
  }
  signup: {
    en?: string
    bn?: string
  }

}

export interface Hero {
  welcome: {
    en?: string
    bn?: string
  }
  moto: {
    en?: string
    bn?: string
  }
  hours: {
    en?: string
    bn?: string
  }
  students: {
    en?: string
    bn?: string
  }

}

export interface Courses {
  featured: {
    en?: string
    bn?: string
  }
}
export interface CategoryHero {
  category: {
    en?: string
    bn?: string
  }
  description: {
    en?: string
    bn?: string
  }
}

export type SupportedLanguage = 'en' | 'bn'
