interface ResultShape {
  code: number;
  end: boolean;
  value: string;
}

const yelidSomeValueFn = (params: unknown, cb: (data: ResultShape) => void) => {
  setTimeout(
    () =>
      cb({ code: 1, end: Math.random() > 0.5, value: "the value" + params }),
    500
  );
};

const getAllValue = (cb: (dataList: ResultShape[]) => void) => {
  yelidSomeValueFn(1, (r) => {
    if (r.end) {
      cb([r]);
    } else {
      getAllValue((c) => cb(c.concat(r)));
    }
  });
};

const yelidSomeValueFnWithPromise = (params: number) =>
  new Promise<ResultShape>((resolve) => {
    setTimeout(
      () =>
        resolve({
          code: 1,
          end: Math.random() > 0.5,
          value: "the value" + params,
        }),
      500
    );
  });

const getAllValueWithPromise: () => Promise<ResultShape[]> = () =>
  yelidSomeValueFnWithPromise(1).then((r) => {
    if (r.end) {
      return [r];
    } else {
      return getAllValueWithPromise().then((c) => c.concat(r));
    }
  });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const yelidSomeValueFnWithAsync = async (params: number) => {
  await sleep(500);
  return {
    code: 1,
    end: Math.random() > 0.5,
    value: "the value" + params,
  };
};

const getAllValueWithAsync: () => Promise<ResultShape[]> = async () => {
  const r = await yelidSomeValueFnWithAsync(1);
  if (r.end) {
    return [r];
  } else {
    return (await getAllValueWithAsync()).concat(r);
  }
};
