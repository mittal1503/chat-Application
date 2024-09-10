const localStorageMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (action.type === "user/setUserId") {
      localStorage.setItem("userId", action.payload);
    }

    const result = next(action);

    const state = getState();
    const userId = state.user.userId;

    if (userId && !localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }

    return result;
  };
