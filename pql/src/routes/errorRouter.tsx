export const errorRouter = [
    {
      path: '',
      element: <div>1</div>,
      children: [
        {
          path: "",
          element: <div>1</div>,
        },
      ],
    },
    {
      path: '/',
      element: <div>error</div>,
      children: [
        {
          path: "*",
          element: <div>Not found</div>,
        },
      ],
    },
  ];