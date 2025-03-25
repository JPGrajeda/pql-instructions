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
      element: <div className="d-flex d-flex justify-content-center">
                <img src="/404.svg" alt="" />
              </div>,
      children: [
        {
          path: "*",
          element: <div>Not found</div>,
        },
      ],
    },
  ];