export type Post = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    category: string;
    coverImage: string;
    readingTime: string;
  };
  
  export const mockPosts: Post[] = [
    {
      title: "Why You Feel Guilty After Saying No (And What To Do About It)",
      slug: "why-you-feel-guilty-after-saying-no-and-what-to-do-about-it",
      excerpt: "That sinking feeling in your chest after declining a request? It has a name — and more importantly, a way through. Let's unpack where the guilt comes from and how to stop letting it run the show.",
      content: "There are moments when saying yes feels easier than explaining no. But every unnecessary yes slowly drains your energy.",
      publishedAt: "2026-03-04",
      category: "Mindset",
      coverImage:
        "/images/sunset.png",
      readingTime: "5 min read",
    },
    {
      title: "The day I should have said no",
      slug: "the-day-i-should-have-said-no",
      excerpt: "A letter I wish I had written earlier—before my yes became a burden.",
      content: "There are moments when saying yes feels easier than explaining no. But every unnecessary yes slowly drains your energy.",
      publishedAt: "2026-03-04",
      category: "Mindset",
      coverImage:
        "/images/sunset.png",
      readingTime: "5 min read",
    },
    {
      title: "Kindness without boundaries is self-abandonment",
      slug: "kindness-without-boundaries-is-self-abandonment",
      excerpt: "You can be kind and still say no. Your peace matters too. Learning to say no is not rejection.",
      content: "You can be kind and still say no. Your peace matters too. Learning to say no is not rejection.",
      publishedAt: "2026-03-03",
      category: "Mindset",
      coverImage:
        "/images/teacup.png",
      readingTime: "4 min read",
    },
    {
      title: "You don’t owe instant replies",
      slug: "you-dont-owe-instant-replies",
      excerpt: "Delay is not disrespect. Space is sometimes the kindest answer. It is choosing peace over pressure.",
      content: "Delay is not disrespect. Space is sometimes the kindest answer. It is choosing peace over pressure.",
      publishedAt: "2026-03-02",
      category: "Relationships",
      coverImage:
        "/images/girl.png",
      readingTime: "3 min read",
    },
    {
      title: "Embracing the discomfort of ‘No’",
      slug: "embracing-the-discomfort-of-no",
      excerpt: "The first few times feel sharp. Then it becomes peace.",
      content: "The first few times feel sharp. Then it becomes peace.",
      publishedAt: "2026-03-01",
      category: "Relationships",
      coverImage:
        "/images/window.png",
      readingTime: "4 min read",
    },
  ];