import { render, fireEvent, waitFor, getByText } from "@testing-library/react";
import Home from "../page";
import { usePosts } from "@/context/posts";
import "@testing-library/jest-dom";

jest.mock("@heroui/react", () => ({
  __esModule: true,
  // cada componente precisa ser uma função que retorna algo renderizável
  Card: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardBody: ({ children }: any) => <div>{children}</div>,
  CardFooter: ({ children }: any) => <div>{children}</div>,
  Button: ({ children, onPress, ...props }: any) => (
    <button onClick={onPress} {...props}>
      {children}
    </button>
  ),
  Spinner: () => <div>Spinner</div>,
  Skeleton: () => <div>Skeleton</div>,
  Divider: () => <hr />,
}));

jest.mock("@/context/posts", () => ({
  usePosts: jest.fn(),
}));

describe("Home Page", () => {
  it("deve renderizar skeletons enquanto está carregando", () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: true,
      loadMore: jest.fn(),
      hasMore: true,
    });

    const screen = render(<Home />);

    console.log(screen.debug());

    // const skeletons = screen.getAllByRole("progressbar");
    // expect(skeletons).toHaveLength(5);
  });

  it("deve renderizar os posts após carregar os dados", () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: [
        {
          id: 1,
          title: "Post 1",
          body: "Conteúdo do post 1",
          views: 100,
          reactions: { likes: 10 },
        },
        {
          id: 2,
          title: "Post 2",
          body: "Conteúdo do post 2",
          views: 200,
          reactions: { likes: 20 },
        },
      ],
      loading: false,
      loadMore: jest.fn(),
      hasMore: true,
    });

    const screen = render(<Home />);

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do post 1")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do post 2")).toBeInTheDocument();
  });

  it("deve renderizar o botão de 'Carregar mais' quando há mais posts", () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: false,
      loadMore: jest.fn(),
      hasMore: true,
    });

    const screen = render(<Home />);

    const loadMoreButton = screen.getByRole("button", {
      name: /Carregar mais/i,
    });
    expect(loadMoreButton).toBeInTheDocument();
  });

  it("deve exibir a mensagem de 'Todos os posts foram carregados' quando não há mais posts", () => {
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: false,
      loadMore: jest.fn(),
      hasMore: false,
    });

    const screen = render(<Home />);

    expect(
      screen.getByText("Todos os posts foram carregados.")
    ).toBeInTheDocument();
  });

  it("deve chamar a função loadMore quando o botão 'Carregar mais' é clicado", () => {
    const loadMoreMock = jest.fn();
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: false,
      loadMore: loadMoreMock,
      hasMore: true,
    });

    const screen = render(<Home />);

    const loadMoreButton = screen.getByText("Carregar mais");
    fireEvent.click(loadMoreButton);
    expect(loadMoreMock).toHaveBeenCalledTimes(1);
  });

  it("aa", async () => {
    const loadMoreMock = jest.fn();
    (usePosts as jest.Mock).mockReturnValue({
      posts: [],
      loading: false,
      loadMore: loadMoreMock,
      hasMore: true,
    });

    const screen = render(<Home />);

    const loadMoreButton = screen.getByText("Carregar mais");
    fireEvent.click(loadMoreButton);
    await waitFor(() => {
      expect(screen.getByText("Spinner")).toBeInTheDocument();
    });
  });
});
