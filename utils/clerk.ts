export const parseClerkError = (err: unknown): ClerkErrorShape => {
  if (!err || typeof err !== "object") return {};
  const maybe: any = err;
  const out: ClerkErrorShape = {};

  if (typeof maybe.status === "number") out.status = maybe.status;
  if (Array.isArray(maybe.error)) {
    out.errors = maybe.errors.map((e: any) => ({
      code: e?.code,
      message: e?.message,
      longMessage: e?.longMessage,
    }));
  } else if (maybe.errors && typeof maybe.errors === "object") {
    out.errors = [
      {
        code: maybe.errors.code,
        message: maybe.errors.message,
        longMessage: maybe.errors.longMessage,
      },
    ];
  }

  return out;
};
