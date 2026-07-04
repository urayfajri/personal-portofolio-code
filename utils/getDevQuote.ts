export type DevQuote = {
  content: string;
  author: string;
};

const FALLBACK_QUOTES: DevQuote[] = [
  {
    content:
      "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    content:
      "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    content:
      "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    content:
      "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
];

function getRandomFallbackQuote(): DevQuote {
  return FALLBACK_QUOTES[
    Math.floor(Math.random() * FALLBACK_QUOTES.length)
  ] as DevQuote;
}

type QuotableResponse = {
  content: string;
  author: string;
};

export async function getDevQuote(): Promise<DevQuote> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(
      "https://api.quotable.io/random?tags=technology|wisdom|success",
      {
        signal: controller.signal,
        next: { revalidate: 86400 },
      },
    );

    if (!response.ok) {
      return getRandomFallbackQuote();
    }

    const data = (await response.json()) as QuotableResponse;

    if (!data.content?.trim() || !data.author?.trim()) {
      return getRandomFallbackQuote();
    }

    return {
      content: data.content.trim(),
      author: data.author.trim(),
    };
  } catch {
    return getRandomFallbackQuote();
  } finally {
    clearTimeout(timeoutId);
  }
}
